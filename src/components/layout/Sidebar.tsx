import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  Users,
  Shuffle
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">ERP Frotas</h2>

      <nav>
        <NavLink to="/" className="menu-item">
          <LayoutDashboard size={18} />
          Dashboard 
        </NavLink>

        <NavLink to="/veiculos" className="menu-item">
          <Truck size={18} />
          Veículos
        </NavLink>

        <NavLink to="/motoristas" className="menu-item">
          <Users size={18} />
          Motoristas
        </NavLink>

        <NavLink to="/movimentacoes" className="menu-item">
          <Shuffle size={18} />
          Movimentações
        </NavLink>
      </nav>
    </aside>
  );
}
