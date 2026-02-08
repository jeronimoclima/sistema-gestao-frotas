import type { Motorista } from "../../types";
import { MotoristasService } from "../../services/motoristas.service";
import { useNavigate } from "react-router-dom";



type Props = {
  motoristas: Motorista[];
  onDelete: () => void;
  onNovoMotorista: () => void;
};


export function MotoristaList({
  motoristas,
  onDelete,
  onNovoMotorista,
}: Props) {
    const navigate = useNavigate();

    function excluir(id: number) {
    if (!confirm("Deseja excluir este motorista?")) return;

    MotoristasService.excluir(id).then(() => {
      alert("Motorista excluído com sucesso");
      onDelete();
    });
  }


  return (
    <div className="card form-veiculo">
      <div className="form-header">
        <h3>Motoristas Cadastrados</h3>
      </div>

<div
  className="list-header"
  style={{ display: "flex", alignItems: "center", gap: "12px" }}
>
  <button
    className="secondary"
    onClick={() => navigate("/")}
  >
    ← Voltar
  </button>

  <div style={{ flex: 1 }} />

  <button
    className="primary"
    onClick={onNovoMotorista}
  >
    + Novo Motorista
  </button>
</div>

      

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNH</th>
            <th>Validade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {motoristas.length > 0 ? (
            motoristas.map(m => (
              <tr key={m.id}>
                <td>{m.nome}</td>
                <td>{m.cnh}</td>
                <td>
                  {new Date(m.validadeDaCNH).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  <span className={`badge ${m.ativo ? "badge-ativo" : "badge-inativo"}`}>
                    {m.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <button className="danger" onClick={() => excluir(m.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Nenhum motorista encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
