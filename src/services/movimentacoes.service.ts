import { api } from "../api/api";

export const MovimentacoesService = {
  listar() {
    return api.get("/Movimentacoes/BuscarTodasMovimentacoes");
  },

  criar(data: any) {
    return api.post("/Movimentacoes/CadastrarNovaMovimentacaoDeFrota", data);
  },

  encerrar(id: number, data: { kmRetorno: number; dataHoraRetorno: string }) {
    return api.put(
      `/Movimentacoes/EncerrarMovimentacao?id=${id}`, ///api/Movimentacoes/EncerrarMovimentacao
      data,
    );
  },

  atualizar(id: number, data: any) {
  return api.put(
    `/Movimentacoes/AtualizarMovimentacao?id=${id}`,///api/Movimentacoes/AtualizarMovimentacao
    data
  );
},


  excluir(id: number) {
    return api.delete(`/Movimentacoes/DeletarMovimentacao?id=${id}`);
  },

  
};
