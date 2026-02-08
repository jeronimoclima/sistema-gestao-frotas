export interface Veiculo {
id: number;
placa: string;
codigoDoVeiculo: string;
modelo: string;
ano: number;
kmAtual: number;
emRota: boolean;
}
export interface Motorista {
id: number;
nome: string;
cnh: string;
validadeDaCNH: string;
ativo: boolean;
}

export interface Movimentacao {
  id: number;
  dataHoraSaida: string;
  dataHoraRetorno?: string;

  kmSaida: number;
  kmRetorno?: number;

  origem: string;
  destino: string;

  motorista?: {
    id: number;
    nome: string;
  };

  veiculo?: {
    id: number;
    modelo: string;
    placa: string;
  };
}
