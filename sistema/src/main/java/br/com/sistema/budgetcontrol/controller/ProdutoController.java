package br.com.sistema.budgetcontrol.controller;

import br.com.sistema.budgetcontrol.dto.CreateProdutoDTO;
import br.com.sistema.budgetcontrol.dto.ProdutoResponseDTO;
import br.com.sistema.budgetcontrol.dto.UpdateProdutoDTO;
import br.com.sistema.budgetcontrol.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> salvar(@Valid @RequestBody CreateProdutoDTO dto) {

        ProdutoResponseDTO produto = produtoService.salvar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(produto);
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listar() {

        return ResponseEntity.ok(produtoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProdutoDTO dto) {

        return ResponseEntity.ok(produtoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}