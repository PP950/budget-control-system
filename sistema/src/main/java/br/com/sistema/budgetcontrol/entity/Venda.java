package br.com.sistema.budgetcontrol.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vendas")
@Data
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;

    private LocalDateTime dataVenda;

    private BigDecimal valorTotal;

    @Enumerated(EnumType.STRING)
    private TipoVenda tipoVenda;

    @Enumerated(EnumType.STRING)
    private StatusVenda statusVenda;

    @OneToMany(mappedBy = "venda",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<ItemVenda> itens = new ArrayList<>();

}