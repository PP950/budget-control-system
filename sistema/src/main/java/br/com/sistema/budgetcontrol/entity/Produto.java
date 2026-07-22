package br.com.sistema.budgetcontrol.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
@Data
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private BigDecimal preco;

    @Column(name = "quantidade_estoque")
    private Integer quantidadeEstoque;

    private boolean ativo;
}