package br.com.sistema.budgetcontrol.dto;

import br.com.sistema.budgetcontrol.entity.TipoVenda;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateVendaDTO(

        @NotBlank
        String nomeCliente,

        TipoVenda tipoVenda,

        @NotEmpty
        @Valid
        List<ItemVendaDTO> itens
) {
}