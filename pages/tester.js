import { useEffect, useState } from "react";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function Tester() {
  const [user, setUser] = useState(null);
  const [testerCode, setTesterCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/check-tester`, {
        credentials: "include"
      });
      const data = await res.json();
      if (!data.authenticated) {
        window.location.href = "/";
        return;
      }

      setUser(data);

      const codeRes = await fetch(`${API_URL}/tester-code`, {
        credentials: "include"
      });
      const codeData = await codeRes.json();
      setTesterCode(codeData.code || "N/A");

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Se încarcă...
      </div>
    );

  if (!user.isTester)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Acces restricționat.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">COD TESTER</h1>

      <div className="bg-blue-600 px-6 py-4 rounded text-2xl tracking-widest border border-blue-400">
        {testerCode}
      </div>

      <button
        onClick={() => navigator.clipboard.writeText(testerCode)}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md border border-blue-300"
      >
        COPIAZĂ COD
      </button>
    </div>
  );
}
