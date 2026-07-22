package br.com.sistema.budgetcontrol.dto;

import br.com.sistema.budgetcontrol.entity.StatusVenda;
import br.com.sistema.budgetcontrol.entity.TipoVenda;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record VendaResponseDTO(

        Long id,
        String nomeCliente,
        LocalDateTime dataVenda,
        BigDecimal valorTotal,
        List<ItemVendaResponseDTO> itens,
        TipoVenda tipoVenda,
        StatusVenda statusVenda
) {
}