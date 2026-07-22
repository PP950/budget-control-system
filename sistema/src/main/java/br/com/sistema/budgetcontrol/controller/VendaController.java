package br.com.sistema.budgetcontrol.controller;

import br.com.sistema.budgetcontrol.dto.AddItemComandaDTO;
import br.com.sistema.budgetcontrol.dto.CreateVendaDTO;
import br.com.sistema.budgetcontrol.dto.DashboardResponseDTO;
import br.com.sistema.budgetcontrol.dto.VendaResponseDTO;
import br.com.sistema.budgetcontrol.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    private final VendaService vendaService;

    public VendaController(VendaService vendaService) {
        this.vendaService = vendaService;
    }

    @PostMapping
    public ResponseEntity<VendaResponseDTO> realizarVenda(
            @Valid @RequestBody CreateVendaDTO dto) {

        return ResponseEntity.ok(vendaService.realizarVenda(dto));
    }

    @GetMapping
    public ResponseEntity<List<VendaResponseDTO>> listar() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }

    @GetMapping("/dashboard")
    public DashboardResponseDTO dashboard(){

        return vendaService.dashboard();

    }
    @GetMapping("/{id}")
    public ResponseEntity<VendaResponseDTO> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(vendaService.buscarPorId(id));
    }
    @PostMapping("/{id}/itens")
    public VendaResponseDTO adicionarItemComanda(
            @PathVariable Long id,
            @RequestBody AddItemComandaDTO dto
    ){

        return vendaService.adicionarItemComanda(id, dto);

    }
    @DeleteMapping("/{vendaId}/itens/{itemId}")
    public ResponseEntity<Void> removerItemComanda(
            @PathVariable Long vendaId,
            @PathVariable Long itemId
    ){

        vendaService.removerItemComanda(vendaId, itemId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/fechar")
    public VendaResponseDTO fecharComanda(@PathVariable Long id){

        return vendaService.fecharComanda(id);

    }
}