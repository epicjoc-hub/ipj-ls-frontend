import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserShield, FaIdCard, FaCrown } from "react-icons/fa";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    verify();
  }, []);

  if (loading)
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
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 gap-8">

        {/* TITLU */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-center">
          PANOU TESTE IPJ LOS SANTOS
        </h1>

        {/* 3 CARDURI ORIZONTALE */}
        {/* Academie */}
        <Link
        href="/start-test?type=academie"
        className="relative group w-64 h-64 rounded-xl overflow-hidden border border-blue-400"
         >
        <img
         src="/academie.jpg"
         alt="Academie"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
         />
         <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          Academie
        </span>
        </Link>

{/* Radio */}
<Link
  href="/start-test?type=radio"
  className="relative group w-64 h-64 rounded-xl overflow-hidden border border-blue-400"
>
  <img
    src="/radio.jpg"
    alt="Radio"
    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
  />
  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
  <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
    Comunicații Radio
  </span>
</Link>

{/* MDT */}
<Link
  href="/start-test?type=mdt"
  className="relative group w-64 h-64 rounded-xl overflow-hidden border border-blue-400"
>
  <img
    src="/mdt.jpg"
    alt="MDT"
    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
  />
  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
  <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
    MOBILE TERMINAL DATA (MDT)
  </span>
</Link>

        {/* HUD DE IDENTITATE */}
        <div className="mt-10 text-center text-lg tracking-wide opacity-90">
          POLIȚIST: <span className="text-blue-300 font-bold">{user.discord_tag}</span>
        </div>

        {/* BARĂ DE ROLURI (DREAPTA) */}
        <div className="fixed right-6 top-6 flex flex-col gap-4 z-20">

          {/* Badge Polițist (toți o au) */}
          <div className="group relative">
            <FaUserShield size={30} className="text-blue-400" />
            <span className="absolute right-10 top-1 opacity-0 group-hover:opacity-100 transition bg-black/80 px-2 py-1 rounded">
              Polițist
            </span>
          </div>

          {/* Tester */}
          {user.isTester && (
            <div className="group relative">
              <FaIdCard size={30} className="text-blue-300" />
              <span className="absolute right-10 top-1 opacity-0 group-hover:opacity-100 transition bg-black/80 px-2 py-1 rounded">
                Tester
              </span>
            </div>
          )}

          {/* Editor */}
          {user.isEditor && (
            <div className="group relative">
              <FaCrown size={30} className="text-yellow-400" />
              <span className="absolute right-10 top-1 opacity-0 group-hover:opacity-100 transition bg-black/80 px-2 py-1 rounded text-yellow-300">
                Editor
              </span>
            </div>
          )}
        </div>
        
        {user.isTester && (
  <Link href="/stats" className="w-64 h-64 bg-blue-600/60 hover:bg-blue-600 transition-all rounded-lg border border-blue-400 flex flex-col items-center justify-center text-xl font-bold">
    Statistici
  </Link>
)}

        
        <Link
  href="/history"
  className="w-64 h-64 bg-blue-600/60 hover:bg-blue-600 transition-all rounded-lg border border-blue-400 flex flex-col items-center justify-center text-xl font-bold"
>
  Istoric Teste
</Link>


        {/* LOGOUT */}
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