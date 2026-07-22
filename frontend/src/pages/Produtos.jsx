import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    listarProdutos,
    alterarStatusProduto
} from "../services/produtoService";
import "./Produtos.css";


function Produtos(){

    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("TODOS");

    async function carregarProdutos() {
        try {
            const resposta = await listarProdutos();
            setProdutos(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    }

    async function alterarStatus(produto) {
        try {
            await alterarStatusProduto(
                produto.id,
                !produto.ativo
            );
            carregarProdutos();
        } catch (error) {
            console.error(error);
            alert("Erro ao alterar status.");
        }
    }

    function formatarPreco(valor){
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
    
    useEffect(() => {
    const carregar = async () => {
        await carregarProdutos();
    };

    carregar();
}, []);
const produtosFiltrados = produtos.filter(produto => {

    const nome =
        produto.nome
        .toLowerCase()
        .includes(
            pesquisa.toLowerCase()
        );


    const status =
        filtroStatus === "TODOS"
        ||
        (filtroStatus === "ATIVOS" && produto.ativo)
        ||
        (filtroStatus === "INATIVOS" && !produto.ativo);


    return nome && status;

});

    return (

        <div className="container">
            <h1>Produtos</h1>


<div>

    <input

        type="text"

        placeholder="Pesquisar produto..."

        value={pesquisa}

        onChange={
            e => setPesquisa(e.target.value)
        }

    />


    <select

        value={filtroStatus}

        onChange={
            e => setFiltroStatus(e.target.value)
        }

    >

        <option value="TODOS">
            Todos
        </option>


        <option value="ATIVOS">
            Ativos
        </option>


        <option value="INATIVOS">
            Inativos
        </option>


    </select>


</div>


<br />


            <table>

                <thead>

                    <tr>

                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Status</th>
                        <th>Ações</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        produtosFiltrados.map(produto => (

                            <tr key={produto.id}>

                                <td>{produto.nome}</td>

                                <td>
                                     {formatarPreco(produto.preco)}
                                 </td>

                                <td>
                                    {produto.quantidadeEstoque}
                                </td>

                                <td>
                                    {
                                        produto.ativo 
                                        ? "Ativo" 
                                        : "Inativo"
                                    }
                                </td>

                                <td>
                                    <button className="editar-button"
                                    onClick={() => navigate(`/produtos/editar/${produto.id}`)}>
                                        Editar
                                    </button>
                                    {" "}
                                    <button onClick={() => alterarStatus(produto)}>
                                        {produto.ativo ? "Desativar" : "Ativar"}
                                    </button>
                                </td>

                            </tr>

                        ))
                    }


                </tbody>


            </table>


        </div>

    );



}
export default Produtos;