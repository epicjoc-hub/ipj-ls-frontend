import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { API_URL } from "../components/Layout";
import TerminalText from "../components/TerminalText";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/tests/stats`);
      const data = await res.json();
      setStats(data);
    })();
  }, []);

  if (!stats) return <div className="min-h-[60vh] flex items-center justify-center">Se încarcă graficele...</div>;

  return (
    <div>
      <TerminalText text="> CIA TERMINAL • ANALYTICS PIPELINE • LIVE" className="text-green-400 mb-6" />

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="card-grid rounded p-4">
          <Bar data={{ labels: Object.keys(stats.byType), datasets: [{ label: "Teste pe Tip", data: Object.values(stats.byType), backgroundColor: "#06b6d4" }] }} />
        </div>
        <div className="card-grid rounded p-4">
          <Pie data={{ labels: ["Admis", "Respins"], datasets: [{ data: [stats.byResult.ADMIS, stats.byResult.RESPINS], backgroundColor: ["#22c55e", "#dc2626"] }] }} />
        </div>
      </div>

      <div className="mt-10 card-grid rounded p-4 max-w-4xl mx-auto">
        <Line data={{ labels: Object.keys(stats.byDay), datasets: [{ label: "Teste/zi", data: Object.values(stats.byDay), borderColor: "#06b6d4", backgroundColor: "rgba(6,182,212,.25)", fill: true }] }} />
      </div>
    </div>
  );
}
