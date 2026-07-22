package br.com.sistema.budgetcontrol.service;

import br.com.sistema.budgetcontrol.dto.AddItemComandaDTO;
import br.com.sistema.budgetcontrol.dto.CreateVendaDTO;
import br.com.sistema.budgetcontrol.dto.DashboardResponseDTO;
import br.com.sistema.budgetcontrol.dto.VendaResponseDTO;
import br.com.sistema.budgetcontrol.entity.*;
import br.com.sistema.budgetcontrol.exception.EstoqueInsuficienteException;
import br.com.sistema.budgetcontrol.exception.ProdutoNaoEncontradoException;
import br.com.sistema.budgetcontrol.exception.VendaNaoEncontradaException;
import br.com.sistema.budgetcontrol.mapper.VendaMapper;
import br.com.sistema.budgetcontrol.repository.ProdutoRepository;
import br.com.sistema.budgetcontrol.repository.VendaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VendaService {

    private final VendaRepository vendaRepository;
    private final ProdutoRepository produtoRepository;
    private final VendaMapper vendaMapper;

    public VendaService(VendaRepository vendaRepository,
                        ProdutoRepository produtoRepository,
                        VendaMapper vendaMapper) {

        this.vendaRepository = vendaRepository;
        this.produtoRepository = produtoRepository;
        this.vendaMapper = vendaMapper;
    }

    @Transactional
    public VendaResponseDTO realizarVenda(CreateVendaDTO dto) {

        Venda venda = new Venda();

        venda.setNomeCliente(dto.nomeCliente());
        venda.setDataVenda(LocalDateTime.now());
        venda.setTipoVenda(dto.tipoVenda());

        venda.setStatusVenda(
                dto.tipoVenda() == TipoVenda.COMANDA
                        ? StatusVenda.ABERTA
                        : StatusVenda.FECHADA
        );

        BigDecimal total = BigDecimal.ZERO;

        for (var itemDTO : dto.itens()) {

            Produto produto = produtoRepository.findById(itemDTO.produtoId())
                    .orElseThrow(() ->
                            new ProdutoNaoEncontradoException(itemDTO.produtoId()));

            if (produto.getQuantidadeEstoque() < itemDTO.quantidade()) {
                throw new EstoqueInsuficienteException(produto.getNome());
            }

            BigDecimal subtotal = produto.getPreco()
                    .multiply(BigDecimal.valueOf(itemDTO.quantidade()));

            ItemVenda item = new ItemVenda();

            item.setProduto(produto);
            item.setVenda(venda);
            item.setQuantidade(itemDTO.quantidade());
            item.setPrecoUnitario(produto.getPreco());
            item.setSubtotal(subtotal);

            venda.getItens().add(item);

            total = total.add(subtotal);

            produto.setQuantidadeEstoque(
                    produto.getQuantidadeEstoque() - itemDTO.quantidade()
            );

            produtoRepository.save(produto);
        }

        venda.setValorTotal(total);

        Venda vendaSalva = vendaRepository.save(venda);

        return vendaMapper.toResponseDTO(vendaSalva);
    }
    public List<VendaResponseDTO> listarTodas() {

        return vendaRepository.findAll(
                        Sort.by(Sort.Direction.DESC, "dataVenda")
                )
                .stream()
                .map(vendaMapper::toResponseDTO)
                .toList();
    }
    public VendaResponseDTO buscarPorId(Long id){

        Venda venda = vendaRepository.findById(id)
                .orElseThrow(() ->
                        new VendaNaoEncontradaException(id));

        return vendaMapper.toResponseDTO(venda);
    }

    @Transactional
    public VendaResponseDTO adicionarItemComanda(
            Long vendaId,
            AddItemComandaDTO dto
    ){

        Venda venda = vendaRepository.findById(vendaId)
                .orElseThrow(() ->
                        new VendaNaoEncontradaException(vendaId));


        if(venda.getStatusVenda() != StatusVenda.ABERTA){

            throw new RuntimeException(
                    "Apenas comandas abertas podem receber itens."
            );

        }


        Produto produto = produtoRepository.findById(dto.produtoId())
                .orElseThrow(() ->
                        new ProdutoNaoEncontradoException(dto.produtoId()));


        if(produto.getQuantidadeEstoque() < dto.quantidade()){

            throw new EstoqueInsuficienteException(
                    produto.getNome()
            );

        }


        ItemVenda itemExistente = venda.getItens()
                .stream()
                .filter(item ->
                        item.getProduto()
                                .getId()
                                .equals(produto.getId())
                )
                .findFirst()
                .orElse(null);


        if(itemExistente != null){

            int novaQuantidade =
                    itemExistente.getQuantidade()
                            + dto.quantidade();


            itemExistente.setQuantidade(novaQuantidade);

            itemExistente.setSubtotal(
                    itemExistente.getPrecoUnitario()
                            .multiply(
                                    BigDecimal.valueOf(novaQuantidade)
                            )
            );


        } else {


            ItemVenda item = new ItemVenda();

            item.setProduto(produto);
            item.setVenda(venda);
            item.setQuantidade(dto.quantidade());
            item.setPrecoUnitario(produto.getPreco());
            item.setSubtotal(
                    produto.getPreco()
                            .multiply(
                                    BigDecimal.valueOf(dto.quantidade())
                            )
            );


            venda.getItens().add(item);

        }


        produto.setQuantidadeEstoque(
                produto.getQuantidadeEstoque()
                        - dto.quantidade()
        );


        produtoRepository.save(produto);


        BigDecimal total = venda.getItens()
                .stream()
                .map(ItemVenda::getSubtotal)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add
                );


        venda.setValorTotal(total);


        Venda salva = vendaRepository.save(venda);


        return vendaMapper.toResponseDTO(salva);

    }


    @Transactional
    public void removerItemComanda(Long vendaId, Long itemId){

        Venda venda = vendaRepository.findById(vendaId)
                .orElseThrow(() ->
                        new VendaNaoEncontradaException(vendaId));


        if(venda.getStatusVenda() != StatusVenda.ABERTA){

            throw new RuntimeException(
                    "Apenas comandas abertas podem remover itens."
            );

        }


        ItemVenda item = venda.getItens()
                .stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Item não encontrado"));


        Produto produto = item.getProduto();


        produto.setQuantidadeEstoque(
                produto.getQuantidadeEstoque() + 1
        );


        produtoRepository.save(produto);


        if(item.getQuantidade() > 1){

            int novaQuantidade =
                    item.getQuantidade() - 1;


            item.setQuantidade(novaQuantidade);


            item.setSubtotal(
                    item.getPrecoUnitario()
                            .multiply(
                                    BigDecimal.valueOf(novaQuantidade)
                            )
            );


        } else {

            venda.getItens().remove(item);

        }


        BigDecimal novoTotal = venda.getItens()
                .stream()
                .map(ItemVenda::getSubtotal)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add
                );


        venda.setValorTotal(novoTotal);


        vendaRepository.save(venda);

    }
    @Transactional
    public VendaResponseDTO fecharComanda(Long vendaId){

        Venda venda = vendaRepository.findById(vendaId)
                .orElseThrow(() ->
                        new VendaNaoEncontradaException(vendaId));

        if(venda.getStatusVenda() == StatusVenda.FECHADA){
            throw new RuntimeException("Esta comanda já está fechada.");
        }

        venda.setStatusVenda(StatusVenda.FECHADA);

        Venda salva = vendaRepository.save(venda);

        return vendaMapper.toResponseDTO(salva);
    }
    public DashboardResponseDTO dashboard(){

        return new DashboardResponseDTO(

                vendaRepository.faturamentoHoje(),

                BigDecimal.ZERO,

                vendaRepository.faturamentoMes(),

                BigDecimal.ZERO,


                vendaRepository.vendasHoje(),

                0L,

                vendaRepository.vendasMes(),

                0L,


                vendaRepository.comandasAbertas(),

                vendaRepository.valorComandasAbertas()

        );

    }

}