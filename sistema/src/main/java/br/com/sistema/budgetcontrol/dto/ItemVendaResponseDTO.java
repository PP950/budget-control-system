package br.com.sistema.budgetcontrol.dto;

import java.math.BigDecimal;

public record ItemVendaResponseDTO(

        Long id,
        Long produtoId,
        String nomeProduto,
        Integer quantidade,
        BigDecimal precoUnitario,
        BigDecimal subtotal
) {
}