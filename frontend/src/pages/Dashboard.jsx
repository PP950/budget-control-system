import { useEffect, useState } from "react";
import { buscarDashboard } from "../services/vendaService";
import "../styles/Dashboard.css";


function Dashboard(){

    const [dados, setDados] = useState(null);


    useEffect(() => {

        carregarDashboard();

    }, []);



    async function carregarDashboard(){

        try{

            const resposta = await buscarDashboard();

            setDados(resposta.data);

        }catch(error){

            console.error("Erro dashboard", error);

        }

    }


    function moeda(valor){

        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style:"currency",
                currency:"BRL"
            }
        );

    }


    if(!dados){

        return <h2>Carregando dashboard...</h2>;

    }



    return (

        <div className="dashboard">


            <h1>
                Dashboard
            </h1>



            <div className="cards">


                <div className="card">

                    <h3>
                        💰 Faturamento Hoje
                    </h3>

                    <p>
                        {moeda(dados.faturamentoHoje)}
                    </p>

                </div>



                <div className="card">

                    <h3>
                        📅 Faturamento Mês
                    </h3>

                    <p>
                        {moeda(dados.faturamentoMes)}
                    </p>

                </div>



                <div className="card">

                    <h3>
                        🧾 Vendas Hoje
                    </h3>

                    <p>
                        {dados.vendasHoje}
                    </p>

                </div>



                <div className="card">

                    <h3>
                        📊 Vendas Mês
                    </h3>

                    <p>
                        {dados.vendasMes}
                    </p>

                </div>



                <div className="card">

                    <h3>
                        🍺 Comandas Abertas
                    </h3>

                    <p>
                        {dados.comandasAbertas}
                    </p>

                </div>



                <div className="card">

                    <h3>
                        ⏳ Valor Pendente
                    </h3>

                    <p>
                        {moeda(dados.valorComandasAbertas)}
                    </p>

                </div>


            </div>


        </div>

    );

}


export default Dashboard;