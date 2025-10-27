import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center select-none">

      {/* TITLE */}
      <h1 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-wide mb-4">
        Inspectoratul de Politie Judetean
        <br />
        Los Santos
      </h1>

      {/* SUBTITLE */}
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-8 opacity-90">
        Site Oficial Teste
      </h2>

      {/* BUTTON */}
      <Link
        href="https://present-alberta-ipjls-757d03fe.koyeb.app/auth/discord"
        className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-md text-xl font-bold flex flex-col items-center justify-center border border-blue-400 transition-all"
      >
        Autentificare prin Discord
        <FaDiscord size={42} className="mt-2" />
      </Link>

      {/* FOOTER */}
      <p className="mt-6 text-sm opacity-80">
        Creat de Victor Popescu / 6067
      </p>
    </div>
  );
}
