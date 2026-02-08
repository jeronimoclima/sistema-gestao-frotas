import { useEffect, useState } from "react";
import type { Veiculo } from "../../types";
import { VeiculosService } from "../../services/veiculos.service";
import { VeiculoList } from "./VeiculoList";
import { VeiculoForm } from "./VeiculoForm";
import "./veiculos.css";

export function VeiculosPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);

  async function carregarVeiculos() {
    try {
      setLoading(true);
      const lista = await VeiculosService.listar();
      setVeiculos(lista);
    } catch (error) {
      console.error("Erro ao carregar veículos", error);
      setVeiculos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarVeiculos();
  }, []);

  if (loading) return <p>Carregando veículos...</p>;

  return (
    <>
      {mostrarForm ? (
        <VeiculoForm
          onSuccess={() => {
            carregarVeiculos();
            setMostrarForm(false);
          }}
          onCancel={() => setMostrarForm(false)}
        />
      ) : (
        <VeiculoList
          veiculos={veiculos}
          onDelete={carregarVeiculos}
          onNovoVeiculo={() => setMostrarForm(true)}
        />
      )}
    </>
  );
}
