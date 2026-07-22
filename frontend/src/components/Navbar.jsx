import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar(){

    return (

        <nav className="navbar">

             <div className="logo">
                💰 Budget Control
            </div>

            <div className="links">
            <Link to="/">
                Dashboard
            </Link>

            <Link to="/produtos">
                Produtos
            </Link>

            <Link to="/vendas">
                Nova Venda
            </Link>

            <Link to="/comandas">
                Comandas
            </Link>
            <Link to="/cadastro-produto">
            Novo Produto
            </Link>
            <Link to="/historico-vendas">
                Histórico de Vendas
            </Link>
            </div>

        </nav>

    );

}

export default Navbar;