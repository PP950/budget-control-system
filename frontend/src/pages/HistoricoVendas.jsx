import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarVendas } from "../services/vendaService";
import "../styles/HistoricoVendas.css";

function HistoricoVendas() {

    const [vendas, setVendas] = useState([]);

    const [pesquisa, setPesquisa] = useState("");
    const [tipoFiltro, setTipoFiltro] = useState("TODOS");
    const [statusFiltro, setStatusFiltro] = useState("TODOS");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");

    useEffect(() => {
        carregarVendas();
    }, []);

    async function carregarVendas() {

        try {

            const resposta = await listarVendas();
            setVendas(resposta.data);

        } catch (error) {

            console.error(error);

        }

    }

    const vendasFiltradas = vendas

        .filter(venda => {

            const dataVenda = new Date(venda.dataVenda);

            const nome =
                venda.nomeCliente
                    .toLowerCase()
                    .includes(pesquisa.toLowerCase());

            const tipo =
                tipoFiltro === "TODOS" ||
                venda.tipoVenda === tipoFiltro;

            const status =
                statusFiltro === "TODOS" ||
                venda.statusVenda === statusFiltro;

            const inicio =
                dataInicial === "" ||
                dataVenda >= new Date(dataInicial);

            const fim =
                dataFinal === "" ||
                dataVenda <= new Date(dataFinal + "T23:59:59");

            return nome && tipo && status && inicio && fim;

        })

        .sort(
            (a, b) =>
                new Date(b.dataVenda) - new Date(a.dataVenda)
        );

    const quantidade = vendasFiltradas.length;

    const faturamento = vendasFiltradas.reduce(
        (soma, venda) =>
            soma + Number(venda.valorTotal),
        0
    );

    const comandas = vendasFiltradas.filter(
        venda =>
            venda.tipoVenda === "COMANDA"
    ).length;

    const ticketMedio =
        quantidade === 0
            ? 0
            : faturamento / quantidade;

    return (

        <div className="historico-container">

            <h1>Histórico de Vendas</h1>

            <div className="cards-resumo">

                <div className="card">

                    <h3>Total de Vendas</h3>

                    <span>{quantidade}</span>

                </div>

                <div className="card">

                    <h3>Faturamento</h3>

                    <span>

                        {faturamento.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}

                    </span>

                </div>

                <div className="card">

                    <h3>Comandas</h3>

                    <span>{comandas}</span>

                </div>

                <div className="card">

                    <h3>Ticket Médio</h3>

                    <span>

                        {ticketMedio.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}

                    </span>

                </div>

            </div>

            <div className="filtros">

                <div className="filtro-item">

                    <label>Cliente</label>

                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={pesquisa}
                        onChange={(e) =>
                            setPesquisa(e.target.value)
                        }
                    />

                </div>

                <div className="filtro-item">

                    <label>Data Inicial</label>

                    <input
                        type="date"
                        value={dataInicial}
                        onChange={(e) =>
                            setDataInicial(e.target.value)
                        }
                    />

                </div>

                <div className="filtro-item">

                    <label>Data Final</label>

                    <input
                        type="date"
                        value={dataFinal}
                        onChange={(e) =>
                            setDataFinal(e.target.value)
                        }
                    />

                </div>

                <div className="filtro-item">

                    <label>Tipo</label>

                    <select
                        value={tipoFiltro}
                        onChange={(e) =>
                            setTipoFiltro(e.target.value)
                        }
                    >

                        <option value="TODOS">Todos</option>
                        <option value="VENDA_RAPIDA">Venda Rápida</option>
                        <option value="COMANDA">Comanda</option>

                    </select>

                </div>

                <div className="filtro-item">

                    <label>Status</label>

                    <select
                        value={statusFiltro}
                        onChange={(e) =>
                            setStatusFiltro(e.target.value)
                        }
                    >

                        <option value="TODOS">Todos</option>
                        <option value="ABERTA">Aberta</option>
                        <option value="FECHADA">Fechada</option>

                    </select>

                </div>

                <div className="filtro-item">

                    <button
                        className="botao-limpar"
                        onClick={() => {

                            setPesquisa("");
                            setTipoFiltro("TODOS");
                            setStatusFiltro("TODOS");
                            setDataInicial("");
                            setDataFinal("");

                        }}
                    >

                        Limpar Filtros

                    </button>

                </div>

            </div>

            <table className="tabela-vendas">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Total</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {vendasFiltradas.map(venda => (

                        <tr key={venda.id}>

                            <td>{venda.id}</td>

                            <td>{venda.nomeCliente}</td>

                            <td>{venda.tipoVenda}</td>

                            <td>{venda.statusVenda}</td>

                            <td>

                                {new Date(
                                    venda.dataVenda
                                ).toLocaleString("pt-BR")}

                            </td>

                            <td>

                                {Number(venda.valorTotal).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                )}

                            </td>

                            <td>

                                {venda.tipoVenda === "COMANDA" &&
                                venda.statusVenda === "ABERTA" ? (

                                    <Link
                                        className="botao-detalhes"
                                        to={`/comandas/${venda.id}`}
                                    >
                                        Abrir Comanda
                                    </Link>

                                ) : (

                                    <Link
                                        className="botao-detalhes"
                                        to={`/vendas/${venda.id}`}
                                    >
                                        Ver Venda
                                    </Link>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default HistoricoVendas;