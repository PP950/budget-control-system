package br.com.sistema.budgetcontrol.repository;

import org.springframework.data.domain.Sort;
import br.com.sistema.budgetcontrol.entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface VendaRepository extends JpaRepository<Venda, Long> {


    @Query("""
SELECT COALESCE(SUM(v.valorTotal),0)
FROM Venda v
WHERE DATE(v.dataVenda) = CURRENT_DATE
AND v.statusVenda = 'FECHADA'
""")
    BigDecimal faturamentoHoje();


    @Query("""
SELECT COALESCE(SUM(v.valorTotal),0)
FROM Venda v
WHERE MONTH(v.dataVenda) = MONTH(CURRENT_DATE)
AND YEAR(v.dataVenda) = YEAR(CURRENT_DATE)
AND v.statusVenda = 'FECHADA'
""")
    BigDecimal faturamentoMes();


    @Query("""
        SELECT COUNT(v)
        FROM Venda v
        WHERE DATE(v.dataVenda) = CURRENT_DATE
    """)
    Long vendasHoje();


    @Query("""
SELECT COUNT(v)
FROM Venda v
WHERE MONTH(v.dataVenda) = MONTH(CURRENT_DATE)
AND YEAR(v.dataVenda) = YEAR(CURRENT_DATE)
AND v.statusVenda = 'FECHADA'
""")
    Long vendasMes();


    @Query("""
SELECT COUNT(v)
FROM Venda v
WHERE v.statusVenda = 'ABERTA'
""")
    Long comandasAbertas();

    @Query("""
SELECT COALESCE(SUM(v.valorTotal),0)
FROM Venda v
WHERE v.statusVenda = 'ABERTA'
""")
    BigDecimal valorComandasAbertas();

}