package br.com.sistema.budgetcontrol.mapper;

import br.com.sistema.budgetcontrol.dto.CreateProdutoDTO;
import br.com.sistema.budgetcontrol.dto.ProdutoResponseDTO;
import br.com.sistema.budgetcontrol.dto.UpdateProdutoDTO;
import br.com.sistema.budgetcontrol.entity.Produto;
import org.springframework.stereotype.Component;

@Component
public class ProdutoMapper {

    public Produto toEntity(CreateProdutoDTO dto) {

        Produto produto = new Produto();

        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setQuantidadeEstoque(dto.quantidadeEstoque());
        produto.setAtivo(true);

        return produto;
    }

    public ProdutoResponseDTO toResponseDTO(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getQuantidadeEstoque(),
                produto.isAtivo()
        );
    }

    public void updateEntity(UpdateProdutoDTO dto, Produto produto) {

        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setQuantidadeEstoque(dto.quantidadeEstoque());
        produto.setAtivo(dto.ativo());
    }
}