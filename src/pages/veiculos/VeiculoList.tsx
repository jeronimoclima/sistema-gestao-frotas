import { useState } from "react";
import type { Veiculo } from "../../types";
import { VeiculosService } from "../../services/veiculos.service";
import { useNavigate } from "react-router-dom";

type Props = {
  veiculos: Veiculo[];
  onDelete: () => void;
  onNovoVeiculo: () => void;
};

export function VeiculoList({ veiculos, onDelete, onNovoVeiculo }: Props) {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  function excluir(id: number) {
    if (!confirm("Deseja excluir este veículo?")) return;

    VeiculosService.excluir(id).then(() => {
      alert("Veículo excluído");
      onDelete();
    });
  }

  const veiculosFiltrados = veiculos.filter((v) =>
    `${v.modelo} ${v.placa}`.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="card form-veiculo">
      <div className="form-header">
        <h3>Veículos Cadastrados</h3>
      </div>

      <div
        className="list-header"
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
      >
        <button className="secondary" onClick={() => navigate("/")}>
          ← Voltar
        </button>

        <input
          className="search-input"
          placeholder="Buscar por placa ou modelo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ flex: 1 }}
        />

        <button className="primary" onClick={onNovoVeiculo}>
          + Novo Veículo
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Placa</th>
            <th>KM Atual</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculosFiltrados.length > 0 ? (
            veiculosFiltrados.map((v) => (
              <tr key={v.id}>
                <td>{v.modelo}</td>
                <td>{v.placa}</td>
                <td>{v.kmAtual}</td>
                <td>
                  <span
                    className={`badge ${v.emRota ? "badge-inativo" : "badge-ativo"}`}
                  >
                    {v.emRota ? "Em rota" : "Disponível"}
                  </span>
                </td>
                <td>
                  <button className="danger" onClick={() => excluir(v.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Nenhum veículo encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
