package br.com.sistema.budgetcontrol.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record CreateProdutoDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @Positive(message = "Preço deve ser maior que zero")
        BigDecimal preco,

        @PositiveOrZero(message = "Quantidade não pode ser negativa")
        Integer quantidadeEstoque

) {
}