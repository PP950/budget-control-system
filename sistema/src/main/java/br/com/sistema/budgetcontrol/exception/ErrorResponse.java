package br.com.sistema.budgetcontrol.exception;

import java.time.LocalDateTime;

public record ErrorResponse(

        LocalDateTime timestamp,
        int status,
        String erro,
        String mensagem

) {
}