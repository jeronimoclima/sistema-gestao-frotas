export type ApiResponse<T> = {
  sucesso: boolean;
  mensagem: string;
  dados: T;
};
