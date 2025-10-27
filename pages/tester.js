import { useEffect, useState } from "react";
import { API_URL, useUser } from "../components/Layout";
import TerminalText from "../components/TerminalText";

export default function Tester() {
  const { user } = useUser();
  const [code, setCode] = useState("—");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/tester-code`, { credentials: "include" });
      const data = await res.json();
      setCode(data.code || "N/A");
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Se încarcă...</div>;
  if (!user?.isTester && !user?.isEditor) return <div className="min-h-[60vh] flex items-center justify-center">Acces restricționat.</div>;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <TerminalText text="> CIA TERMINAL • TESTER CODE • SECURE" className="text-green-400" />
      <div className="bg-cyan-600 px-6 py-4 rounded text-2xl tracking-widest border border-cyan-400 select-all">{code}</div>
      <button onClick={() => navigator.clipboard.writeText(code)} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md border border-cyan-300">
        COPIAZĂ COD
      </button>
    </div>
  );
}
