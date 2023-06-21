import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Home from "../pages/home";


export default function Route1() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />
                
            </Routes>
              
        </BrowserRouter>
    )
}

