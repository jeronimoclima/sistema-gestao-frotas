import { useEffect, useState } from "react";
import type { Movimentacao } from "../../types";
import { MovimentacoesService } from "../../services/movimentacoes.service";
import { MovimentacaoList } from "./MovimentacaoList";
import { MovimentacaoForm } from "./MovimentacaoForm";
import "./movimentacao.css";

export function MovimentacaoPage() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Movimentacao | null>(null);

  async function carregarMovimentacoes() {
    try {
      setLoading(true);
      const res = await MovimentacoesService.listar();
      setMovimentacoes(res.data.dados);
    } catch (error) {
      console.error("Erro ao carregar movimentações", error);
      setMovimentacoes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarMovimentacoes();
  }, []);

  if (loading) return <p>Carregando movimentações...</p>;

  return (
    <>
      {mostrarForm ? (
        <MovimentacaoForm
          editando={editando}
          onSuccess={() => {
            carregarMovimentacoes();
            setMostrarForm(false);
            setEditando(null);
          }}
          onCancel={() => {
            setMostrarForm(false);
            setEditando(null);
          }}
        />
      ) : (
        <MovimentacaoList
          movimentacoes={movimentacoes}
          onNovaMovimentacao={() => {
            setEditando(null);
            setMostrarForm(true);
          }}
          onEditar={(m) => {
            setEditando(m);
            setMostrarForm(true);
          }}
          onEncerrar={async (id, km, data) => {
            await MovimentacoesService.encerrar(id, {
              kmRetorno: km,
              dataHoraRetorno: data,
            });
            carregarMovimentacoes();
          }}
          onDelete={async (id) => {
            await MovimentacoesService.excluir(id);
            carregarMovimentacoes();
          }}
        />
      )}
    </>
  );
}
