export type Movimentacao = {
  id: number;
  dataHoraSaida: string;
  kmSaida: number;
  origem: string;
  destino: string;
  observacao?: string;

  kmRetorno?: number | null;
  dataHoraRetorno?: string | null;

  veiculo: {
    codigoDoVeiculo: string;
    emRota: boolean;
    modelo: string;
  };

  motorista: {
    nome: string;
  };
};
