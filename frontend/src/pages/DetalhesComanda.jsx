import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    buscarVenda,
    removerItemComanda,
    fecharComandaService
} from "../services/vendaService";
import AdicionarItemComanda from "../components/AdicionarItemComanda";

function DetalhesComanda() {

    const { id } = useParams();
    const [comanda, setComanda] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        carregarComanda();
    }, []);

    async function carregarComanda() {

        try {

            const resposta = await buscarVenda(id);

            setComanda(resposta.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function removerProduto(itemId) {

        try {

            await removerItemComanda(comanda.id, itemId);

            carregarComanda();

        } catch (error) {

            console.error(error);

        }

    }

    async function fecharComanda() {

        try {

            await fecharComandaService(comanda.id);

            alert("Comanda fechada!");

            carregarComanda();

        } catch (error) {

            console.error(error);

            alert("Erro ao fechar comanda");

        }

    }

    if (!comanda) {

        return <h2>Carregando...</h2>;

    }

    return (

        <div>

            <h1>
                Comanda de {comanda.nomeCliente}
            </h1>

            <h3>
                Data:{" "}
                {new Date(comanda.dataVenda).toLocaleString("pt-BR")}
            </h3>

            <table>

                <thead>

                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th>Subtotal</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        comanda.itens.map((item, index) => (

                            <tr key={`${comanda.id}-${index}`}>

                                <td>{item.nomeProduto}</td>

                                <td>{item.quantidade}</td>

                                <td>
                                    R$ {Number(item.precoUnitario).toFixed(2)}
                                </td>

                                <td>
                                    R$ {Number(item.subtotal).toFixed(2)}
                                </td>

                                <td>

                                    <button
                                        onClick={() => removerProduto(item.id)}
                                    >
                                        Remover
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

            <h2>
                Total: R$ {Number(comanda.valorTotal).toFixed(2)}
            </h2>

            <AdicionarItemComanda
                vendaId={comanda.id}
                atualizar={carregarComanda}
            />

            <br />
            <br />

            <button onClick={fecharComanda}>
                Fechar Comanda
            </button>
            <button 
                onClick={() => navigate("/")}
            >
                Voltar
            </button>

        </div>

    );

}

export default DetalhesComanda;
