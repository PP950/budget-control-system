package br.com.sistema.budgetcontrol.service;

import br.com.sistema.budgetcontrol.dto.CreateProdutoDTO;
import br.com.sistema.budgetcontrol.dto.ProdutoResponseDTO;
import br.com.sistema.budgetcontrol.dto.UpdateProdutoDTO;
import br.com.sistema.budgetcontrol.entity.Produto;
import br.com.sistema.budgetcontrol.mapper.ProdutoMapper;
import br.com.sistema.budgetcontrol.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import br.com.sistema.budgetcontrol.exception.ProdutoNaoEncontradoException;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final ProdutoMapper produtoMapper;

    public ProdutoService(ProdutoRepository produtoRepository,
                          ProdutoMapper produtoMapper) {
        this.produtoRepository = produtoRepository;
        this.produtoMapper = produtoMapper;
    }

    public ProdutoResponseDTO salvar(CreateProdutoDTO dto) {

        Produto produto = produtoMapper.toEntity(dto);

        Produto produtoSalvo = produtoRepository.save(produto);

        return produtoMapper.toResponseDTO(produtoSalvo);
    }

    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository.findAll()
                .stream()
                .map(produtoMapper::toResponseDTO)
                .toList();
    }

    private Produto buscarEntidade(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() ->
                        new ProdutoNaoEncontradoException(id));
    }

    public ProdutoResponseDTO buscarPorId(Long id) {
        Produto produto = buscarEntidade(id);
        return produtoMapper.toResponseDTO(produto);
    }

    public ProdutoResponseDTO atualizar(Long id, UpdateProdutoDTO dto){

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(id));


        if(dto.nome() != null){
            produto.setNome(dto.nome());
        }

        if(dto.preco() != null){
            produto.setPreco(dto.preco());
        }

        if(dto.quantidadeEstoque() != null){
            produto.setQuantidadeEstoque(dto.quantidadeEstoque());
        }

        if(dto.ativo() != null){
            produto.setAtivo(dto.ativo());
        }


        return produtoMapper.toResponseDTO(
                produtoRepository.save(produto)
        );
    }

    public void deletar(Long id) {

        Produto produto = buscarEntidade(id);

        produtoRepository.delete(produto);
    }
}