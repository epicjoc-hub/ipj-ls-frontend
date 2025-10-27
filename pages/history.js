import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function History() {
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

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

      setUser(data);

      const h = await fetch(`${API_URL}/tests/history`);
      const t = await h.json();
      setTests(t.tests);
      setFiltered(t.tests);
    }
    bootstrap();
  }, []);

  function filterNow(text) {
    setSearch(text);
    setFiltered(
      tests.filter((t) =>
        t.testType.toLowerCase().includes(text.toLowerCase()) ||
        (t.details || "").toLowerCase().includes(text.toLowerCase()) ||
        t.result.toLowerCase().includes(text.toLowerCase())
      )
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12 select-none">

      <h1 className="text-4xl font-bold uppercase tracking-wide text-center">
        Istoric Teste
      </h1>

      {/* Căutare */}
      <div className="flex justify-center mt-6 mb-6">
        <div className="flex items-center gap-2 bg-blue-600/30 border border-blue-400 rounded-md px-3 py-2 w-full max-w-xl">
          <FaSearch />
          <input
            type="text"
            value={search}
            onChange={(e) => filterNow(e.target.value)}
            placeholder="Caută după tip, rezultat, motiv..."
            className="bg-transparent outline-none w-full text-white"
          />
        </div>
      </div>

      {/* LISTĂ */}
      <div className="grid gap-4 max-w-3xl mx-auto">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-blue-600/30 border border-blue-400 rounded-md p-4 flex justify-between items-center hover:bg-blue-600/40 transition"
          >
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{t.testType.toUpperCase()}</span>
              <span className="text-sm opacity-80">
                {new Date(t.createdAt).toLocaleString()}
              </span>
              <span className="text-sm opacity-70">
                {t.details || "Fără detalii"}
              </span>
            </div>

            <div>
              {t.result === "true" || t.result === "ADMIS" ? (
                <FaCheckCircle className="text-green-400" size={32} />
              ) : (
                <FaTimesCircle className="text-red-400" size={32} />
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
