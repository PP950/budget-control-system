import { useEffect, useState } from "react";
import { listarProdutos } from "../services/produtoService";
import { realizarVenda } from "../services/vendaService";
import "../styles/Venda.css";

function Venda() {

    const [cliente, setCliente] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [itens, setItens] = useState([]);
    const [tipoVenda, setTipoVenda] = useState("COMANDA");

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function carregarProdutos() {
        try {
            const resposta = await listarProdutos();
            setProdutos(resposta.data.filter(produto => produto.ativo));
        } catch (error) {
            console.error(error);
        }
    }

    function adicionarProduto(produto) {

        const existe = itens.find(
            item => item.produtoId === produto.id
        );

        if (existe) {

            if (existe.quantidade >= produto.quantidadeEstoque) {
                alert("Quantidade em estoque insuficiente.");
                return;
            }

            setItens(
                itens.map(item =>
                    item.produtoId === produto.id
                        ? {
                            ...item,
                            quantidade: item.quantidade + 1
                        }
                        : item
                )
            );

        } else {

            setItens([
                ...itens,
                {
                    produtoId: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    estoque: produto.quantidadeEstoque,
                    quantidade: 1
                }
            ]);

        }

    }

    function removerProduto(produtoId) {

        setItens(
            itens
                .map(item =>
                    item.produtoId === produtoId
                        ? {
                            ...item,
                            quantidade: item.quantidade - 1
                        }
                        : item
                )
                .filter(item => item.quantidade > 0)
        );

    }

    const total = itens.reduce(
        (soma, item) => soma + (item.preco * item.quantidade),
        0
    );

    async function finalizarVenda() {

        if (cliente.trim() === "") {
            alert("Informe o nome do cliente ou da mesa.");
            return;
        }

        if (itens.length === 0) {
            alert("Adicione pelo menos um produto.");
            return;
        }

        const dados = {
            nomeCliente: cliente,
            tipoVenda: tipoVenda,
            itens: itens.map(item => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade
            }))
        };

        try {

            await realizarVenda(dados);

            alert(
                tipoVenda === "COMANDA"
                    ? "Comanda aberta com sucesso!"
                    : "Venda realizada com sucesso!"
            );

            setCliente("");
            setItens([]);
            setTipoVenda("COMANDA");

            carregarProdutos();

        } catch (error) {

            console.error(error);

            if (error.response?.data?.mensagem) {
                alert(error.response.data.mensagem);
            } else {
                alert("Erro ao realizar operação.");
            }

        }

    }

    return (

         <div className="venda-container">

            <h1>Nova Venda</h1>

            <div>

                <label>Cliente / Mesa</label>

                <input
                    type="text"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    placeholder="Nome do cliente ou mesa"
                />

            </div>

            <br />

            <div>

                <label>Tipo da operação</label>

                <select
                    value={tipoVenda}
                    onChange={(e) => setTipoVenda(e.target.value)}
                >
                    <option value="COMANDA">
                        Comanda
                    </option>

                    <option value="VENDA_RAPIDA">
                        Venda
                    </option>

                </select>

            </div>

            <hr />
            <div className="area-produtos">
                <h2>Produtos</h2>

    <div className="produtos-grid">

    {
        produtos.map(produto => (

            <div className="produto-card" key={produto.id}>

                <h3>
                    {produto.nome}
                </h3>


                <p>
                    R$ {Number(produto.preco).toFixed(2)}
                </p>


                <span>
                    Estoque: {produto.quantidadeEstoque}
                </span>


                <button
                    onClick={() => adicionarProduto(produto)}
                >
                    Adicionar
                </button>

            </div>

        ))
    }

    </div>

</div>
            

            <hr />

            <div className="carrinho">
                <h2>Carrinho</h2>

            <table border="1">

                <thead>

                    <tr>
                        <th>Produto</th>
                        <th>Preço Unitário</th>
                        <th>Quantidade</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody>

                    {itens.map(item => (

                        <tr key={item.produtoId}>

                            <td>{item.nome}</td>

                            <td>
                                R$ {Number(item.preco).toFixed(2)}
                            </td>

                            <td>{item.quantidade}</td>

                            <td>
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                            </td>

                            <td>

                                <button
                                    onClick={() => removerProduto(item.produtoId)}
                                >
                                    Remover
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <h2>
                Total: R$ {total.toFixed(2)}
            </h2>

            <button onClick={finalizarVenda}>
                {tipoVenda === "COMANDA"
                    ? "Abrir Comanda"
                    : "Finalizar Venda"}
            </button>

            </div>

        </div>

    );

}

export default Venda;