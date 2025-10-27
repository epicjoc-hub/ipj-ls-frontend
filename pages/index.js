import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white text-center select-none px-4">

      <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wide leading-tight mb-6">
        Inspectoratul de Politie Judetean
        <br />
        Los Santos
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold opacity-90 mb-10">
        Site Oficial Teste
      </h2>

      <Link
        href="https://present-alberta-ipjls-757d03fe.koyeb.app/auth/discord"
        className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-lg text-2xl font-bold flex flex-col items-center justify-center border border-blue-400 shadow-xl transition-all hover:scale-105"
      >
        Autentificare prin Discord
        <FaDiscord size={42} className="mt-2" />
      </Link>

      <p className="mt-8 text-lg opacity-70 font-medium">
        Creat de Victor Popescu / 6067
      </p>

    </main>
  );
}
