import { useEffect, useState } from "react";
import { listarVendas } from "../services/vendaService";
import { useNavigate } from "react-router-dom";

function Comandas() {

    const [comandas, setComandas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarComandas();
    }, []);

    async function carregarComandas() {

        try {

            const resposta = await listarVendas();

            const comandasAbertas = resposta.data.filter(venda =>
                venda.tipoVenda === "COMANDA" &&
                venda.statusVenda === "ABERTA"
            );

            setComandas(comandasAbertas);

        } catch (error) {

            console.error(error);

        }

    }

    function formatarData(data) {

        return new Date(data).toLocaleString("pt-BR");

    }

    return (

        <div>

            <h1>Comandas Abertas</h1>

            <table>

                <thead>

                    <tr>

                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        comandas.map(comanda => (

                            <tr key={comanda.id}>

                                <td>{comanda.nomeCliente}</td>

                                <td>{formatarData(comanda.dataVenda)}</td>

                                <td>

                                    R$ {Number(comanda.valorTotal).toFixed(2)}

                                </td>

                                <td>{comanda.statusVenda}</td>

                                <td>

                                    <button
                                    onClick={() => navigate(`/comandas/${comanda.id}`)}>
                                        Abrir
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

export default Comandas;