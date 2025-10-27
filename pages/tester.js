// pages/tester.js
import { useEffect, useState } from "react";
import { API_URL, useUser } from "../components/Layout";

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

  if (!user?.isTester && !user?.isEditor)
    return <div className="min-h-[60vh] flex items-center justify-center">Acces restricționat.</div>;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">COD TESTER</h1>
      <div className="bg-blue-600 px-6 py-4 rounded text-2xl tracking-widest border border-blue-400 select-all">
        {code}
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md border border-blue-300"
      >
        COPIAZĂ COD
      </button>
    </div>
  );
}
