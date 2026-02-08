import { useEffect, useState } from "react";
import type { Movimentacao, Motorista, Veiculo } from "../../types";
import { MotoristasService } from "../../services/motoristas.service";
import { VeiculosService } from "../../services/veiculos.service";
import { MovimentacoesService } from "../../services/movimentacoes.service";
import { cnhValida } from "../../utils/validarCNH";

type Props = {
  editando: Movimentacao | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export function MovimentacaoForm({ editando, onSuccess, onCancel }: Props) {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const [motoristaId, setMotoristaId] = useState<number | "">(
    editando?.motorista?.id ?? ""
  );
  const [veiculoId, setVeiculoId] = useState<number | "">(
    editando?.veiculo?.id ?? ""
  );

  const [dataHoraSaida, setDataHoraSaida] = useState(
    editando?.dataHoraSaida
      ? editando.dataHoraSaida.slice(0, 16)
      : ""
  );

  const [kmSaida, setKmSaida] = useState<number | "">(
    editando?.kmSaida ?? ""
  );

  const [origem, setOrigem] = useState(editando?.origem ?? "");
  const [destino, setDestino] = useState(editando?.destino ?? "");

  useEffect(() => {
    MotoristasService.listar().then(setMotoristas);
    VeiculosService.listar().then(setVeiculos);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!motoristaId || !veiculoId) {
      alert("Selecione motorista e veículo");
      return;
    }

    const motorista = motoristas.find(m => m.id === motoristaId);
    const veiculo = veiculos.find(v => v.id === veiculoId);

    if (!motorista || !veiculo) {
      alert("Dados inválidos");
      return;
    }

    if (!motorista.ativo) {
      alert("Motorista inativo");
      return;
    }

    if (!cnhValida(motorista.validadeDaCNH)) {
      alert("CNH vencida");
      return;
    }

    if (!editando && veiculo.emRota) {
      alert("Veículo já está em rota");
      return;
    }

    if (
  Number(kmSaida) < veiculo.kmAtual &&
  Number(kmSaida) !== editando?.kmSaida
) {
  alert(
    `KM inválido. O veículo possui ${veiculo.kmAtual} km atualmente.`
  );
  return;
}


    if (editando) {
  const payloadEdicao = {
    Origem: origem,
    Destino: destino,
    DataHoraSaida: dataHoraSaida,
    KmSaida: Number(kmSaida),
  };

  await MovimentacoesService.atualizar(editando.id, payloadEdicao);
} else {
  const payloadCriacao = {
    MotoristaId: motorista.id,
    VeiculoId: veiculo.id,
    CodigoDoVeiculo: veiculo.codigoDoVeiculo,
    Origem: origem,
    Destino: destino,
    DataHoraSaida: dataHoraSaida,
    KmSaida: Number(kmSaida),
  };

  await MovimentacoesService.criar(payloadCriacao);
}


    onSuccess();
  }

  return (
    <form className="card form-movimentacao" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>{editando ? "Editar Movimentação" : "Nova Movimentação"}</h3>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Motorista</label>
          <select
            value={motoristaId}
            onChange={(e) => setMotoristaId(Number(e.target.value))}
            disabled={!!editando}
          >
            <option value="">Selecione</option>
            {motoristas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Veículo</label>
          <select
            value={veiculoId}
            disabled={!!editando}
            onChange={(e) => {
              const id = Number(e.target.value);
              setVeiculoId(id);

              // ✅ AQUI É O LUGAR CORRETO
              if (!editando) {
                const veiculo = veiculos.find(v => v.id === id);
                if (veiculo) {
                  setKmSaida(veiculo.kmAtual);
                }
              }
            }}
          >
            <option value="">Selecione</option>
            {veiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.modelo} ({v.placa})
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Origem</label>
          <input value={origem} onChange={(e) => setOrigem(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Destino</label>
          <input value={destino} onChange={(e) => setDestino(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Data/Hora Saída</label>
          <input
            type="datetime-local"
            value={dataHoraSaida}
            onChange={(e) => setDataHoraSaida(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>KM Saída</label>
          <input
            type="number"
            value={kmSaida}
            onChange={(e) => setKmSaida(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="form-footer">
        <button type="button" className="secondary" onClick={onCancel}>
          Voltar
        </button>
        <button type="submit" className="primary">
          Salvar
        </button>
      </div>
    </form>
  );
}
