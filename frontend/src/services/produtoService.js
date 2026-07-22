import api from "./api";

export function listarProdutos() {
    return api.get("/produtos");
}
export function cadastrarProduto(produto) {
    return api.post("/produtos", produto);
}
export function buscarProduto(id) {
    return api.get(`/produtos/${id}`);
}
export function atualizarProduto(id, produto){
    return api.patch(`/produtos/${id}`, produto);
}
export function alterarStatusProduto(id, ativo) {
    return api.patch(`/produtos/${id}`, {
        ativo
    });
}
export function deletarProduto(id){
    return api.delete(`/produtos/${id}`);
}