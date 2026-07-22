package br.com.sistema.budgetcontrol.mapper;

import br.com.sistema.budgetcontrol.dto.ItemVendaResponseDTO;
import br.com.sistema.budgetcontrol.dto.VendaResponseDTO;
import br.com.sistema.budgetcontrol.entity.ItemVenda;
import br.com.sistema.budgetcontrol.entity.Venda;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VendaMapper {

    public VendaResponseDTO toResponseDTO(Venda venda) {

        List<ItemVendaResponseDTO> itens = venda.getItens()
                .stream()
                .map(this::toItemResponseDTO)
                .toList();

        return new VendaResponseDTO(
                venda.getId(),
                venda.getNomeCliente(),
                venda.getDataVenda(),
                venda.getValorTotal(),
                itens,
                venda.getTipoVenda(),
                venda.getStatusVenda()
        );
    }

    private ItemVendaResponseDTO toItemResponseDTO(ItemVenda item) {

        return new ItemVendaResponseDTO(
                item.getId(),
                item.getProduto().getId(),
                item.getProduto().getNome(),
                item.getQuantidade(),
                item.getPrecoUnitario(),
                item.getSubtotal()
        );
    }
}