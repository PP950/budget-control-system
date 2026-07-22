package br.com.sistema.budgetcontrol.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ItemVendaDTO(

        @NotNull
        Long produtoId,

        @NotNull
        @Min(1)
        Integer quantidade
) {
}