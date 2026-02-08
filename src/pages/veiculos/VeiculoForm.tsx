import { useState } from "react";
import type { Veiculo } from "../../types";
import { VeiculosService } from "../../services/veiculos.service";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function VeiculoForm({ onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Veiculo, "id">>({
    placa: "",
    codigoDoVeiculo: "",
    modelo: "",
    ano: new Date().getFullYear(),
    kmAtual: 0,
    emRota: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await VeiculosService.criar(form);
      alert("Veículo cadastrado com sucesso!");
      onSuccess();
      setForm({
        placa: "",
        codigoDoVeiculo: "",
        modelo: "",
        ano: new Date().getFullYear(),
        kmAtual: 0,
        emRota: false,
      });
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      alert("Erro ao salvar veículo. Veja o console.");
    }
  }

  return (
    <form className="card form-veiculo" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Novo Veículo</h3>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Placa</label>
          <input
            name="placa"
            placeholder="Ex: ABC-1234"
            maxLength={20}
            required
            value={form.placa}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Código do Veículo</label>
          <input
            name="codigoDoVeiculo"
            placeholder="Código interno"
            maxLength={20}
            required
            value={form.codigoDoVeiculo}
            onChange={handleChange}
          />
        </div>

        <div className="form-field form-field-full">
          <label>Modelo</label>
          <input
            name="modelo"
            placeholder="Modelo do veículo"
            maxLength={100}
            required
            value={form.modelo}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Ano</label>
          <input
            name="ano"
            type="number"
            value={form.ano}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>KM Atual</label>
          <input
            name="kmAtual"
            type="number"
            value={form.kmAtual}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="emRota"
              checked={form.emRota}
              onChange={handleChange}
            />
            Veículo em rota
          </label>
        </div>
      </div>

      <div className="form-footer">
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" className="secondary" onClick={onCancel}>
            Voltar
          </button>

          <button type="submit" className="primary">
            Salvar Veículo
          </button>
        </div>
      </div>
    </form>
  );
}
