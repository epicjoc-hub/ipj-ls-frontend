import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserShield, FaIdCard, FaCrown } from "react-icons/fa";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verify() {
      const res = await fetch(`${API_URL}/check-tester`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.authenticated) {
        window.location.href = "/";
        return;
      }
      setUser(data);
    }
    verify();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Se verifică acreditările...
      </div>
    );

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/dashboard-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-center pt-20 gap-8">

        <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-center">
          PANOU TESTE IPJ LOS SANTOS
        </h1>

        <div className="mt-10 text-center text-lg tracking-wide opacity-90">
          POLIȚIST: <span className="text-blue-300 font-bold">{user.discord_tag}</span>
        </div>

        {/* CARDS */}
        <div className="flex flex-col md:flex-row gap-6">
          <Link href="/start-test?type=academie" className="relative group w-64 h-64 rounded-xl overflow-hidden border border-blue-400">
            <img src="/academie.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">Academie</span>
          </Link>

          <Link href="/start-test?type=radio" className="relative group w-64 h-64 rounded-xl overflow-hidden border border-blue-400">
            <img src="/radio.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">Comunicații Radio</span>
          </Link>

          <Link href="/start-test?type=mdt" className="relative group w-64 h-64 rounded-xl overflow-hidden border border-blue-400">
            <img src="/mdt.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">MDT</span>
          </Link>
        </div>

        {/* Statistici */}
        {user.isTester && (
          <Link href="/stats" className="w-64 h-20 bg-blue-600/60 hover:bg-blue-600 transition-all rounded-lg border border-blue-400 flex items-center justify-center text-xl font-bold">
            Statistici
          </Link>
        )}

        <Link href="/history" className="w-64 h-20 bg-blue-600/60 hover:bg-blue-600 transition-all rounded-lg border border-blue-400 flex items-center justify-center text-xl font-bold">
          Istoric Teste
        </Link>

        <button
          onClick={() => (window.location.href = `${API_URL}/logout`)}
          className="mt-12 px-6 py-3 bg-red-600 hover:bg-red-700 border border-red-500 rounded-md"
        >
          DECONECTARE
        </button>
      </div>
    </div>
  );
}
