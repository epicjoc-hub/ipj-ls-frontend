import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_URL, useUser } from "../components/Layout";
import TerminalText from "../components/TerminalText";

export default function SubmitTest() {
  const router = useRouter();
  const { type } = router.query;
  const { user } = useUser();

  const [testerCode, setTesterCode] = useState("");
  const [result, setResult] = useState("ADMIS");
  const [details, setDetails] = useState("");

  async function submit() {
    if (!testerCode.trim()) {
      alert("Introdu un cod candidat!");
      return;
    }
    const res = await fetch(`${API_URL}/submit-test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ testerCode, testType: type || "necunoscut", result, details }),
    });
    const data = await res.json();
    if (data.ok) router.push("/dashboard");
    else alert("Eroare: " + (data.error || "necunoscută"));
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 select-none">
      <TerminalText text={`> CIA TERMINAL • SUBMIT REPORT • ${String(type || "").toUpperCase()}`} className="text-green-400" />
      <div className="card-grid px-6 py-4 rounded-md text-lg flex flex-col gap-4 w-96">
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Cod candidat</label>
          <input type="text" className="bg-black border border-cyan-400 px-3 py-2 rounded-md"
                 value={testerCode} onChange={(e) => setTesterCode(e.target.value.toUpperCase())} placeholder="Ex: 4F2A1B" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm opacity-80">Verdict</label>
          <select className="bg-black border border-cyan-400 px-3 py-2 rounded-md"
                  value={result} onChange={(e) => setResult(e.target.value)}>
            <option value="ADMIS">ADMIS</option>
            <option value="RESPINS">RESPINS</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm opacity-80">Motiv (opțional)</label>
          <textarea className="bg-black border border-cyan-400 px-3 py-2 rounded-md" rows={3}
                    value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Motiv respingere / detalii / note..." />
        </div>

        <button onClick={submit} className="mt-2 bg-cyan-600 hover:bg-cyan-700 border border-cyan-400 px-5 py-3 rounded-md font-bold">
          Trimite Raport
        </button>
      </div>
    </div>
  );
}
