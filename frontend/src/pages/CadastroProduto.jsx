import { useState } from "react";
import { cadastrarProduto } from "../services/produtoService";
import "../styles/CadastroProduto.css";

function CadastroProduto() {

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");

    async function salvar(e) {

        e.preventDefault();

        try {

            await cadastrarProduto({

                nome,
                preco: Number(preco),
                quantidadeEstoque: Number(estoque)

            });

            alert("Produto cadastrado!");

            setNome("");
            setPreco("");
            setEstoque("");

        } catch (error) {

            console.error(error);
            alert("Erro ao cadastrar produto");

        }

    }

    return (

        <div className="cadastro-container">

          <div className="cadastro-card">


            <h1>Novo Produto</h1>

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

                <button type="submit">
                    Salvar
                </button>

            </form>
            </div>

        </div>

    );

}

export default CadastroProduto;