import { api } from "../api/api";
import type { Veiculo } from "../types";
import type { ApiResponse } from "../api/ApiResponse";

export const VeiculosService = {
  async listar(): Promise<Veiculo[]> {
    const res = await api.get<ApiResponse<Veiculo[]>>(
      "/Veiculo/BuscarTodosOsVeiculos"
    );

    return res.data.dados;
  },

  async criar(data: Partial<Veiculo>) {
    const res = await api.post<ApiResponse<Veiculo>>(
      "/Veiculo/AdcionarVeiculo",
      data
    );

    return res.data.dados;
  },

  async excluir(id: number) {
    return api.delete<ApiResponse<null>>(
      `/Veiculo/DeletarVeiculo/${id}`
    );
  }
};
