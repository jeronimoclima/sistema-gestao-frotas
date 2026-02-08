import { useState } from "react";
import type { Movimentacao } from "../../types";
import { useNavigate } from "react-router-dom";

type Props = {
  movimentacoes: Movimentacao[];
  onDelete: (id: number) => void;
  onEncerrar: (id: number, km: number, data: string) => void;
  onNovaMovimentacao: () => void;
  onEditar: (m: Movimentacao) => void;
};

export function MovimentacaoList({
  movimentacoes,
  onDelete,
  onEncerrar,
  onNovaMovimentacao,
  onEditar,
}: Props) {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  function encerrar(m: Movimentacao) {
    const kmRetorno = Number(prompt("Informe o KM de retorno"));

    if (Number.isNaN(kmRetorno) || kmRetorno <= 0 || kmRetorno < m.kmSaida) {
      alert("KM de retorno inválido");
      return;
    }

    onEncerrar(m.id, kmRetorno, new Date().toISOString());
  }

  const filtradas = movimentacoes.filter((m) =>
    `${m.motorista?.nome ?? ""} ${m.veiculo?.modelo ?? ""}`
      .toLowerCase()
      .includes(busca.toLowerCase()),
  );

  return (
    <div className="card form-movimentacao">
      <div className="form-header">
        <h3>Movimentações</h3>
      </div>

      {/* HEADER PADRÃO (IGUAL VEÍCULO) */}
      <div className="list-header">
        <button className="secondary" onClick={() => navigate("/")}>
          ← Voltar
        </button>

        <input
          className="search-input"
          placeholder="Buscar por motorista ou veículo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <button className="primary" onClick={onNovaMovimentacao}>
          + Nova Movimentação
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Motorista</th>
            <th>Veículo</th>
            <th>Rota</th>
            <th>Saída</th>
            <th>KM</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
  {filtradas.length > 0 ? (
    filtradas.map((m) => {
      const encerrada =
        typeof m.kmRetorno === "number" &&
        m.kmRetorno > m.kmSaida &&
        !!m.dataHoraRetorno;

      const kmExibido = encerrada ? m.kmRetorno : m.kmSaida;

      return (
        <tr key={m.id}>
          <td>{m.motorista?.nome ?? "-"}</td>
          <td>{m.veiculo?.modelo ?? "-"}</td>

          {/* 🚗 ROTA */}
          <td>
            <strong>{m.origem}</strong> → <strong>{m.destino}</strong>
          </td>

          <td>{new Date(m.dataHoraSaida).toLocaleString()}</td>
          <td>{kmExibido}</td>

          <td>
            <span
              className={`badge ${
                encerrada ? "badge-inativo" : "badge-ativo"
              }`}
            >
              {encerrada ? "Encerrada" : "Em rota"}
            </span>
          </td>

          <td>
            {!encerrada && (
              <button className="secondary" onClick={() => encerrar(m)}>
                Encerrar
              </button>
            )}

            <button className="primary" onClick={() => onEditar(m)}>
              Editar
            </button>

            <button className="danger" onClick={() => onDelete(m.id)}>
              Excluir
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={7} style={{ textAlign: "center" }}>
        Nenhuma movimentação encontrada
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}
