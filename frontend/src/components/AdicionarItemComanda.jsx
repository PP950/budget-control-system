import { useEffect, useState } from "react";
import { listarProdutos } from "../services/produtoService";
import { adicionarItemComanda } from "../services/vendaService";

function AdicionarItemComanda({ vendaId, atualizar }) {

    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState("");
    const [quantidade, setQuantidade] = useState(1);


    useEffect(() => {

        carregarProdutos();

    }, []);


    async function carregarProdutos(){

        try{

            const resposta = await listarProdutos();

            setProdutos(resposta.data);

        }catch(error){

            console.error(error);

        }

    }


    async function adicionar(){

        try{

            await adicionarItemComanda(
                vendaId,
                {
                    produtoId: Number(produtoId),
                    quantidade: Number(quantidade)
                }
            );


            alert("Produto adicionado!");

            atualizar();


        }catch(error){

            console.error(error);

            alert("Erro ao adicionar produto");

        }

    }


    return (

        <div>

            <h3>
                Adicionar produto
            </h3>


            <select
                value={produtoId}
                onChange={(e)=>setProdutoId(e.target.value)}
            >

                <option value="">
                    Selecione um produto
                </option>


                {
                    produtos.map(produto => (

                        <option 
                            key={produto.id}
                            value={produto.id}
                        >

                            {produto.nome} - R$ {produto.preco}

                        </option>

                    ))
                }

            </select>


            <input

                type="number"

                min="1"

                value={quantidade}

                onChange={(e)=>setQuantidade(e.target.value)}

            />


            <button onClick={adicionar}>

                Adicionar

            </button>


        </div>

    );

}


export default AdicionarItemComanda;