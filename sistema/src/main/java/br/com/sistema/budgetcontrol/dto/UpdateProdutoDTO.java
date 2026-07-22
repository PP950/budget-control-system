package br.com.sistema.budgetcontrol.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record UpdateProdutoDTO(


        String nome,

        BigDecimal preco,

        Integer quantidadeEstoque,

        Boolean ativo
) {
}