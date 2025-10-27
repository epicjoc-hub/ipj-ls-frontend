import { useEffect, useState } from "react";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // state config
  const [testName, setTestName] = useState("academie");
  const [time, setTime] = useState(300);
  const [questions, setQuestions] = useState(20);
  const [mistakes, setMistakes] = useState(3);

  useEffect(() => {
    async function bootstrap() {
      const res = await fetch(`${API_URL}/check-tester`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!data.authenticated || !data.isEditor) {
        alert("Acces restricționat!");
        window.location.href = "/dashboard";
        return;
      }

      setUser(data);
      setLoading(false);
    }
    bootstrap();
  }, []);

  async function saveConfig() {
    const body = {
      testName,
      timeLimitSeconds: Number(time),
      questionsCount: Number(questions),
      maxMistakes: Number(mistakes),
    };

    const res = await fetch(`${API_URL}/manage-tests/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.ok) alert("Configurare salvată!");
    else alert("Eroare: " + data.error);
  }

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Se încarcă...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 select-none">

      <h1 className="text-4xl font-bold uppercase tracking-wide">
        Panou Admin Teste
      </h1>

      {/* Form */}
      <div className="bg-blue-600/50 border border-blue-400 px-6 py-6 rounded-md text-lg flex flex-col gap-4 w-96">

        {/* Tip test */}
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Tip test</label>
          <select
            className="bg-black border border-blue-400 px-3 py-2 rounded-md"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          >
            <option value="academie">Academie</option>
            <option value="radio">Comunicații Radio</option>
            <option value="mdt">MDT</option>
          </select>
        </div>

        {/* Timp */}
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Timp (secunde)</label>
          <input
            type="number"
            className="bg-black border border-blue-400 px-3 py-2 rounded-md"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Intrebari */}
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Număr întrebări</label>
          <input
            type="number"
            className="bg-black border border-blue-400 px-3 py-2 rounded-md"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </div>

        {/* Greșeli */}
        <div className="flex flex-col">
          <label className="text-sm opacity-80">Greșeli permise</label>
          <input
            type="number"
            className="bg-black border border-blue-400 px-3 py-2 rounded-md"
            value={mistakes}
            onChange={(e) => setMistakes(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          onClick={saveConfig}
          className="mt-3 bg-blue-600 hover:bg-blue-700 border border-blue-400 px-5 py-3 rounded-md font-bold"
        >
          Salvează Configurare
        </button>

      </div>

    </div>
  );
}
