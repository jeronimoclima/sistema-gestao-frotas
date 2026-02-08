import { api } from "../api/api";
import type { ApiResponse } from "../api/ApiResponse";
import type { Motorista } from "../types";

export const MotoristasService = {
  async listar(): Promise<Motorista[]> {
    const res = await api.get<ApiResponse<Motorista[]>>(
      "/Motorista/BuscarTodosMotoristas"
    );

    return res.data.dados;
  },

  async criar(data: Partial<Motorista>) {
    const res = await api.post<ApiResponse<Motorista>>(
      "/Motorista/AdicionarMotorista",
      data
    );

    return res.data.dados;
  },

  async excluir(id: number) {
  return api.delete<ApiResponse<null>>(
    "/Motorista/DeleteMotorista",
    {
      params: { id }
    }
  );
}
};
