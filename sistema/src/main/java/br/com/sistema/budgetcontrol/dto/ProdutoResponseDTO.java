package br.com.sistema.budgetcontrol.dto;
import java.math.BigDecimal;

public record ProdutoResponseDTO(
        Long id,
        String nome,
        BigDecimal preco,
        Integer quantidadeEstoque,
        boolean ativo
) {
}