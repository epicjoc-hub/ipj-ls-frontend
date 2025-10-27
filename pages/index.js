import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 select-none px-4">

      {/* TITLU (MĂRIT) */}
      <h1 className="text-center font-bold text-5xl md:text-7xl tracking-wide leading-tight">
        INSPECTORATUL DE POLITIE JUDETEAN
        <br />
        LOS SANTOS
      </h1>

      {/* SUBTITLU (MĂRIT) */}
      <h2 className="text-center opacity-90 text-xl md:text-3xl tracking-wide">
        SITE OFICIAL TESTE
      </h2>

      {/* BUTON DISCORD (MĂRIT) */}
      <Link
      id="discordButton"
       href="https://present-alberta-ipjls-757d03fe.koyeb.app/auth/discord"
       className="w-80 h-36 rounded-md flex flex-col items-center justify-center gap-3 font-bold text-2xl border shadow-md"
      >
  AUTENTIFICARE PRIN DISCORD
  <FaDiscord size={42} />
</Link>


      {/* CREDIT */}
      <p className="text-lg opacity-80 mt-4">
        CREAT DE VICTOR POPESCU / 6067
      </p>
    </main>
  );
}
