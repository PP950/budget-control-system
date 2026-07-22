import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarVenda } from "../services/vendaService";
import { useNavigate } from "react-router-dom";


function DetalhesVenda() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [venda, setVenda] = useState(null);

    useEffect(() => {
        carregarVenda();
    }, []);

    async function carregarVenda() {

        try {

            const resposta = await buscarVenda(id);

            setVenda(resposta.data);

        } catch (error) {

            console.error(error);

        }

    }

    if (!venda) {

        return <h2>Carregando...</h2>;

    }

    return (

        <div>
        

            <h1>Detalhes da Venda</h1>

            <h3>

                Cliente: {venda.nomeCliente}

            </h3>

            <h3>

                Tipo: {venda.tipoVenda}

            </h3>

            <h3>

                Status: {venda.statusVenda}

            </h3>

            <h3>

                Data: {new Date(venda.dataVenda).toLocaleString("pt-BR")}

            </h3>

            <table>

                <thead>

                    <tr>

                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Subtotal</th>

                    </tr>

                </thead>

                <tbody>

                    {venda.itens.map(item => (

                        <tr key={item.id}>

                            <td>{item.nomeProduto}</td>

                            <td>{item.quantidade}</td>

                            <td>

                                R$ {Number(item.precoUnitario).toFixed(2)}

                            </td>

                            <td>

                                R$ {Number(item.subtotal).toFixed(2)}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <h2>

                Total: R$ {Number(venda.valorTotal).toFixed(2)}

            </h2>

            <button 
    onClick={() => navigate("/historico-vendas")}
>
    Voltar ao Histórico
</button>

        </div>

    );

}

export default DetalhesVenda;