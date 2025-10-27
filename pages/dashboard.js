import Link from "next/link";
import { useUser } from "../components/Layout";
import TerminalText from "../components/TerminalText";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div
      className="min-h-[calc(100vh-4rem)] relative overflow-hidden rounded-xl card-grid"
      style={{ backgroundImage: "url('/dashboard-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      <div className="relative z-10 p-8 flex flex-col items-center gap-10">
        <TerminalText text="> CIA TERMINAL • DASHBOARD • ACCESS GRANTED" className="text-green-400" />
        <div className="text-lg opacity-90">
          Polițist: <span className="text-cyan-300 font-bold">{user?.discord_tag}</span>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card href="/start-test?type=academie" title="Academie" img="/academie.jpg" />
          <Card href="/start-test?type=radio" title="Comunicații Radio" img="/radio.jpg" />
          <Card href="/start-test?type=mdt" title="MDT" img="/mdt.jpg" />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Quick href="/call" label="Call Instructor" />
          <Quick href="/instructors" label="Instructori (Live)" />
          <Quick href="/history" label="Istoric Teste" />
        </div>
      </div>
    </div>
  );
}

function Card({ href, title, img }) {
  return (
    <Link href={href} className="relative group w-72 h-72 rounded-xl overflow-hidden border border-cyan-600/40 shadow-lg">
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">{title}</span>
    </Link>
  );
}
function Quick({ href, label }) {
  return (
    <Link href={href} className="h-20 rounded-lg border border-cyan-400 bg-cyan-600/40 hover:bg-cyan-600 flex items-center justify-center text-lg font-bold transition">
      {label}
    </Link>
  );
}
