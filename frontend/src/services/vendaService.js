import api from "./api";

export function realizarVenda(dados) {
    return api.post("/vendas", dados);
}
export async function listarVendas() {
    return api.get("/vendas");
}
export function buscarVenda(id){

    return api.get(`/vendas/${id}`);
}
export function adicionarItemComanda(id, dados){
    return api.post(`/vendas/${id}/itens`, dados);
}
export function removerItemComanda(vendaId, itemId){

    return api.delete(`/vendas/${vendaId}/itens/${itemId}`);

}
export function fecharComandaService(id){
    return api.patch(`/vendas/${id}/fechar`);
}
export function buscarDashboard(){

    return api.get("/vendas/dashboard");

}