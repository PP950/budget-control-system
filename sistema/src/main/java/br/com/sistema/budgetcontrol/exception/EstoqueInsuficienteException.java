package br.com.sistema.budgetcontrol.exception;

public class EstoqueInsuficienteException extends RuntimeException {

    public EstoqueInsuficienteException(String nomeProduto) {
        super("Estoque insuficiente para o produto " + nomeProduto);
    }

}