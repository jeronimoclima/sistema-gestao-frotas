import { useEffect, useState, useRef } from "react";
import { Layout } from "../../components/layout/Layout";
import { MovimentacoesService } from "../../services/movimentacoes.service";
import type { Movimentacao } from "../../types/Movimentacao";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./dashboard.css";

export function Dashboard() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const dashboardRef = useRef<HTMLDivElement>(null);

  const PRECO_COMBUSTIVEL = 6;
  const KM_POR_LITRO = 10;

  const CORES = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#ea580c",
    "#0891b2",
  ];

  useEffect(() => {
    MovimentacoesService.listar().then((res) => {
      setMovimentacoes(res.data.dados);
    });
  }, []);

  /* =========================
     FILTRO POR PERÍODO
  ========================== */
  const movimentacoesFiltradas = movimentacoes.filter((m) => {
    if (!m.dataHoraSaida) return false;

    const data = new Date(m.dataHoraSaida);

    if (dataInicio && data < new Date(dataInicio)) return false;
    if (dataFim && data > new Date(dataFim)) return false;

    return true;
  });

  /* =========================
     CÁLCULOS
  ========================== */
  function calcularIndicadores(movs: Movimentacao[]) {
    const kmPorVeiculo: Record<string, number> = {};
    const kmPorMotorista: Record<string, number> = {};
    const gastoPorVeiculo: Record<string, number> = {};

    movs.forEach((m) => {
      if (!m.kmRetorno) return;

      const km = m.kmRetorno - m.kmSaida;
      const gasto = (km / KM_POR_LITRO) * PRECO_COMBUSTIVEL;

      kmPorVeiculo[m.veiculo.modelo] =
        (kmPorVeiculo[m.veiculo.modelo] || 0) + km;

      gastoPorVeiculo[m.veiculo.modelo] =
        (gastoPorVeiculo[m.veiculo.modelo] || 0) + gasto;

      kmPorMotorista[m.motorista.nome] =
        (kmPorMotorista[m.motorista.nome] || 0) + km;
    });

    return { kmPorVeiculo, kmPorMotorista, gastoPorVeiculo };
  }

  const { kmPorVeiculo, kmPorMotorista, gastoPorVeiculo } = calcularIndicadores(
    movimentacoesFiltradas,
  );

  const veiculoTop = Object.entries(kmPorVeiculo).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const motoristaTop = Object.entries(kmPorMotorista).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const gastoTotal = Object.values(gastoPorVeiculo).reduce(
    (acc, v) => acc + v,
    0,
  );

  const dadosKmPorVeiculo = Object.entries(kmPorVeiculo).map(([nome, km]) => ({
    nome,
    km,
  }));

  const dadosGastoPorVeiculo = Object.entries(gastoPorVeiculo).map(
    ([nome, valor]) => ({ nome, valor }),
  );

  /* =========================
     EXPORTAR PDF
  ========================== */
  async function exportarPDF() {
    if (!dashboardRef.current) return;

    const canvas = await html2canvas(dashboardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "PNG", 10, 10, 280, 180);
    pdf.save("dashboard-frotas.pdf");
  }

  function renderLabelPie({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value,
  }: any) {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        style={{ pointerEvents: "none" }}
      >
        {`${name}\nR$ ${(value ?? 0).toFixed(2)}`}
      </text>
    );
  }

  return (
    <Layout>
      <div className={`dashboard ${darkMode ? "dark" : ""}`}>
        {/* TOPO */}
        <div className="dashboard-top">
          <h2>📊 Dashboard Operacional</h2>

          <div className="acoes">
            <input
              type="date"
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <input type="date" onChange={(e) => setDataFim(e.target.value)} />

            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button onClick={exportarPDF}>📄 Exportar PDF</button>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div ref={dashboardRef}>
          {/* KPIs */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <span>🚗 Veículo Top</span>
              <strong>{veiculoTop?.[0] || "-"}</strong>
              <small>{veiculoTop?.[1]?.toFixed(0) || 0} km</small>
            </div>

            <div className="kpi-card">
              <span>👤 Motorista Top</span>
              <strong>{motoristaTop?.[0] || "-"}</strong>
              <small>{motoristaTop?.[1]?.toFixed(0) || 0} km</small>
            </div>

            <div className="kpi-card destaque">
              <span>⛽ Gasto Total</span>
              <strong>R$ {gastoTotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* GRÁFICOS LADO A LADO */}
          <div className="graficos-lado">
            <div className="grafico-card">
              <h3>KM por Veículo</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={dadosKmPorVeiculo}>
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="km">
                    {dadosKmPorVeiculo.map((_, i) => (
                      <Cell key={i} fill={CORES[i % CORES.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grafico-card">
              <h3>Gasto por Veículo</h3>

              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={dadosGastoPorVeiculo}
                    dataKey="valor"
                    nameKey="nome"
                    outerRadius={100}
                    innerRadius={40}
                    label={renderLabelPie}
                    labelLine={false}
                  >
                    {dadosGastoPorVeiculo.map((_, i) => (
                      <Cell key={i} fill={CORES[i % CORES.length]} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      typeof value === "number"
                        ? `R$ ${value.toFixed(2)}`
                        : "R$ 0,00"
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
