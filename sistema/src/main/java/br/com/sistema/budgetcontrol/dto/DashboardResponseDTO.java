package br.com.sistema.budgetcontrol.dto;

import java.math.BigDecimal;

public record DashboardResponseDTO(

        BigDecimal faturamentoHoje,
        BigDecimal faturamentoSemana,
        BigDecimal faturamentoMes,
        BigDecimal faturamentoAno,


        Long vendasHoje,
        Long vendasSemana,
        Long vendasMes,
        Long vendasAno,


        Long comandasAbertas,
        BigDecimal valorComandasAbertas

) {}