import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Produtos from "../pages/Produtos";
import Vendas from "../pages/Vendas";
import Comandas from "../pages/Comandas";
import CadastroProduto from "../pages/CadastroProduto";
import EditarProduto from "../pages/EditarProduto";
import DetalhesComanda from "../pages/DetalhesComanda";
import DetalhesVenda from "../pages/DetalhesVenda";
import HistoricoVendas from "../pages/HistoricoVendas";

import Navbar from "../components/Navbar";

function AppRoutes(){

    return (

        <BrowserRouter>
            <Navbar />
            <Routes>
              
                <Route 
                    path="/" 
                    element={<Dashboard />} 
                />

                <Route 
                    path="/produtos" 
                    element={<Produtos />} 
                />

                <Route 
                    path="/vendas" 
                    element={<Vendas />} 
                />

                <Route 
                    path="/comandas" 
                    element={<Comandas />} 
                />
                <Route 
                path="/comandas/:id"
                element={<DetalhesComanda />}
                />

                <Route path="/cadastro-produto" element={<CadastroProduto />} />

                <Route path="/produtos/editar/:id" element={<EditarProduto />} />

<Route 
    path="/vendas/:id" 
    element={<DetalhesVenda />}
/>

<Route 
    path="/comandas/:id"
    element={<DetalhesComanda />}
/>

<Route 
    path="/historico-vendas" 
    element={<HistoricoVendas />}
/>
            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;