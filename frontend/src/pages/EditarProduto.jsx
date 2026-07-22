import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    buscarProduto,
    atualizarProduto
} from "../services/produtoService";

import "../styles/CadastroProduto.css";

function EditarProduto() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");
    const [ativo, setAtivo] = useState(true);

    useEffect(() => {

        async function carregarProduto() {

            try {

                const resposta = await buscarProduto(id);

                const produto = resposta.data;

                setNome(produto.nome);
                setPreco(produto.preco);
                setEstoque(produto.quantidadeEstoque);
                setAtivo(produto.ativo);

            } catch (error) {

                console.error(error);
                alert("Erro ao carregar produto");

            }

        }

        carregarProduto();

    }, [id]);

    async function salvar(e) {

        e.preventDefault();

        try {

            await atualizarProduto(id, {

                nome,
                preco: Number(preco),
                quantidadeEstoque: Number(estoque),
                ativo

            });

            alert("Produto atualizado!");

            navigate("/produtos");

        } catch (error) {

            console.error(error);

            alert("Erro ao atualizar");

        }

    }

   return (

    <div className="cadastro-container">

        <div className="cadastro-card">

            <h1>Editar Produto</h1>

            <form onSubmit={salvar}>

                <div>

                    <label>Nome</label><br/>

                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                </div>

                <br/>

                <div>

                    <label>Preço</label><br/>

                    <input
                        type="number"
                        step="0.01"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />

                </div>

                <br/>

                <div>

                    <label>Estoque</label><br/>

                    <input
                        type="number"
                        value={estoque}
                        onChange={(e) => setEstoque(e.target.value)}
                    />

                </div>

                <br/>

                <div className="checkbox-container">

    <input
        id="ativo"
        type="checkbox"
        checked={ativo}
        onChange={(e) => setAtivo(e.target.checked)}
    />

    <label htmlFor="ativo">
        Produto ativo
    </label>

</div>

                <br/>

                <button
                    className="botao-azul"
                    type="submit"
                >
                    Salvar Alterações
                </button>

            </form>

        </div>

    </div>

);

}

export default EditarProduto;