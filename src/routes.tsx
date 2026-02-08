import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/dashboard/Dashboard";



import { VeiculosPage } from "./pages/veiculos/VeiculosPage";


import { MotoristaPage } from "./pages/motoristas/MotoristaPage";
import { MovimentacaoPage } from "./pages/movimentacoes/MovimentacaoPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/movimentacoes" element={<MovimentacaoPage />} />
       

        <Route path="/veiculos" element={<VeiculosPage />} />

        <Route path="/motoristas" element={<MotoristaPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}
