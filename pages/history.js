import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../components/Layout";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import TerminalText from "../components/TerminalText";

export default function History() {
  const [tests, setTests] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/tests/history`);
      const data = await res.json();
      setTests(data.tests || []);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return tests.filter(
      (t) =>
        t.testType.toLowerCase().includes(q) ||
        (t.details || "").toLowerCase().includes(q) ||
        String(t.result).toLowerCase().includes(q)
    );
  }, [tests, query]);

  return (
    <div>
      <TerminalText text="> CIA TERMINAL • HISTORY LOGS • FILTERED" className="text-green-400 mb-6" />

      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 bg-cyan-600/30 border border-cyan-400 rounded-md px-3 py-2 w-full max-w-xl">
          <FaSearch />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută după tip, rezultat, motiv..."
            className="bg-transparent outline-none w-full text-white"
          />
        </div>
      </div>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {filtered.map((t) => (
          <div key={t.id} className="bg-cyan-600/20 border border-cyan-400 rounded-md p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{t.testType.toUpperCase()}</span>
              <span className="text-sm opacity-80">{new Date(t.createdAt).toLocaleString()}</span>
              <span className="text-sm opacity-70">{t.details || "Fără detalii"}</span>
            </div>
            <div>
              {t.result === "true" || t.result === "ADMIS" ? (
                <FaCheckCircle className="text-green-400" size={28} />
              ) : (
                <FaTimesCircle className="text-red-400" size={28} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
