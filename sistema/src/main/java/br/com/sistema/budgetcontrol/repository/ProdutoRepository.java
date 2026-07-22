package br.com.sistema.budgetcontrol.repository;

import br.com.sistema.budgetcontrol.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}