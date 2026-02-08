import { useState } from "react";
import { MotoristasService } from "../../services/motoristas.service";

type Props = {
  onSave: () => void;
  onCancel: () => void;
};

export function MotoristaForm({ onSave, onCancel }: Props) {
  const [nome, setNome] = useState("");
  const [cnh, setCnh] = useState("");
  const [validadeDaCNH, setValidadeDaCNH] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    MotoristasService.criar({
      nome,
      cnh,
      validadeDaCNH,
    }).then(() => {
      alert("Motorista cadastrado com sucesso");
      setNome("");
      setCnh("");
      setValidadeDaCNH("");
      onSave();
    });
  }

  return (
    <div className="card form-veiculo">
      <div className="form-header">
        <h3>Novo Motorista</h3>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nome</label>
          <input value={nome} onChange={e => setNome(e.target.value)} required />
        </div>

        <div className="form-field">
          <label>CNH</label>
          <input value={cnh} onChange={e => setCnh(e.target.value)} required />
        </div>

        <div className="form-field">
          <label>Validade da CNH</label>
          <input
            type="date"
            value={validadeDaCNH}
            onChange={e => setValidadeDaCNH(e.target.value)}
            required
          />
        </div>

        <div className="form-footer">
  <button type="button" className="secondary" onClick={onCancel}>
    Cancelar
  </button>

  <button className="primary" type="submit">
    Salvar
  </button>
</div>

      </form>
    </div>
  );
}
