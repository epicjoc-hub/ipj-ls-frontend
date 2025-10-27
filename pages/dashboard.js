// pages/dashboard.js
import Link from "next/link";
import { useUser } from "../components/Layout";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div
      className="min-h-[calc(100vh-4rem)] relative overflow-hidden rounded-xl border border-blue-900/40"
      style={{
        backgroundImage: "url('/dashboard-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

      <div className="relative z-10 p-8 flex flex-col items-center gap-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-center">
          Panou Teste IPJ Los Santos
        </h1>

        <div className="text-lg opacity-90">
          Polițist: <span className="text-blue-300 font-bold">{user?.discord_tag}</span>
        </div>

        {/* grilă carduri */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card href="/start-test?type=academie" title="Academie" img="/academie.jpg" />
          <Card href="/start-test?type=radio" title="Comunicații Radio" img="/radio.jpg" />
          <Card href="/start-test?type=mdt" title="MDT" img="/mdt.jpg" />
        </div>

        {/* acțiuni rapide */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {user?.isTester && (
            <Quick href="/stats" label="Statistici" />
          )}
          <Quick href="/history" label="Istoric Teste" />
          <Quick href="/submit-test" label="Trimite Raport" />
        </div>
      </div>
    </div>
  );
}

function Card({ href, title, img }) {
  return (
    <Link
      href={href}
      className="relative group w-72 h-72 rounded-xl overflow-hidden border border-blue-600/40 shadow-lg"
    >
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">{title}</span>
    </Link>
  );
}

function Quick({ href, label }) {
  return (
    <Link
      href={href}
      className="h-20 rounded-lg border border-blue-400 bg-blue-600/40 hover:bg-blue-600 flex items-center justify-center text-lg font-bold transition"
    >
      {label}
    </Link>
  );
}
