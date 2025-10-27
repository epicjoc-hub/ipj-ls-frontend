import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function SubmitTest() {
  const router = useRouter();
  const { type } = router.query;

  const [user, setUser] = useState(null);
  const [testerCode, setTesterCode] = useState("");
  const [result, setResult] = useState("ADMIS");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const res = await fetch(`${API_URL}/check-tester`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!data.authenticated) {
        window.location.href = "/";
        return;
      }

      if (!data.isTester && !data.isEditor) {
        alert("Acces restricționat!");
        window.location.href = "/dashboard";
        return;
      }

      setUser(data);
      setLoading(false);
    }
    bootstrap();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Se încarcă...
      </div>
    );

  async function submit() {
    const body = {
      testerCode,
      testType: type || "necunoscut",
      result,
      details
    };

    const res = await fetch(`${API_URL}/submit-test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data.ok) {
      alert("Test trimis cu succes!");
      router.push("/dashboard");
    } else {
      alert("Eroare: " + data.error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 select-none">

      <h1 className="text-4xl font-bold uppercase tracking-wide">
        Raport test
      </h1>

      <div className="bg-blue-600/50 border border-blue-400 px-6 py-4 rounded-md text-lg flex flex-col gap-4 w-96">

        {/* Cod tester candidat */}
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Cod candidat</label>
          <input
            type="text"
            className="bg-black border border-blue-400 px-3 py-2 rounded-md"
            value={testerCode}
            onChange={(e) => setTesterCode(e.target.value)}
            placeholder="Ex: 4F2A1B"
          />
        </div>

        {/* Verdict */}
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Verdict</label>
          <select
            className="bg-black border border-blue-400 px-3 py-2 rounded-md"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          >
            <option value="ADMIS">ADMIS</option>
            <option value="RESPINS">RESPINS</option>
          </select>
        </div>

        {/* Motiv */}
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Motiv (optional)</label>
          <textarea
            className="bg-black border border-blue-400 px-3 py-2 rounded-md"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Motiv respingere / detalii / note..."
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          onClick={submit}
          className="mt-3 bg-blue-600 hover:bg-blue-700 border border-blue-400 px-5 py-3 rounded-md font-bold"
        >
          Trimite Raport
        </button>

      </div>
    </div>
  );
}
