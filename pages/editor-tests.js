import { useEffect, useState } from "react";
import { API_URL, useUser } from "../components/Layout";
import TerminalText from "../components/TerminalText";

export default function EditorTests() {
  const { user } = useUser();
  const [tests, setTests] = useState({});
  const [editing, setEditing] = useState(null);
  const [fields, setFields] = useState({});

  if (!user?.isEditor) return <div className="p-10">Acces restricționat (editori).</div>;

  useEffect(() => { load(); }, []);
  async function load() {
    const res = await fetch(`${API_URL}/config`);
    const data = await res.json();
    setTests(data);
  }

  function startEdit(name) { setEditing(name); setFields(tests[name]); }

  async function saveTest() {
    const res = await fetch(`${API_URL}/manage-tests/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    if (data.ok) { setEditing(null); load(); } else alert("Eroare!");
  }

  async function deleteTest(name) {
    if (!confirm("Ștergi acest test?")) return;
    const res = await fetch(`${API_URL}/manage-tests/config/${name}`, { method: "DELETE", credentials: "include" });
    const data = await res.json();
    if (data.ok) load();
  }

  return (
    <div>
      <TerminalText text="> CIA TERMINAL • EDITOR PANEL • TEST CONFIG" className="text-green-400 mb-6" />

      <div className="space-y-4 mb-10">
        {Object.keys(tests).map((name) => (
          <div key={name} className="card-grid p-4 rounded flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">{name}</div>
              <div className="text-sm opacity-80">Întrebări: {tests[name].questionsCount} • Timp: {tests[name].timeLimitSeconds}s • Greșeli max: {tests[name].maxMistakes}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => startEdit(name)} className="bg-cyan-600 px-3 py-1 rounded border border-cyan-400">Editează</button>
              <button onClick={() => deleteTest(name)} className="bg-red-600 px-3 py-1 rounded border border-red-400">Șterge</button>
            </div>
          </div>
        ))}
        {!Object.keys(tests).length && <div className="opacity-70">Nu există teste configurate.</div>}
      </div>

      {editing && (
        <div className="card-grid p-6 rounded space-y-4 max-w-md">
          <div className="text-xl font-bold mb-2">Editezi: {editing}</div>

          <input placeholder="Nume (readonly)" disabled className="bg-black border border-cyan-400 px-3 py-2 rounded w-full opacity-70"
                 value={fields.testName} onChange={() => {}} />
          <input placeholder="Timp (secunde)" className="bg-black border border-cyan-400 px-3 py-2 rounded w-full"
                 value={fields.timeLimitSeconds} onChange={(e) => setFields({ ...fields, timeLimitSeconds: e.target.value })} />
          <input placeholder="Număr întrebări" className="bg-black border border-cyan-400 px-3 py-2 rounded w-full"
                 value={fields.questionsCount} onChange={(e) => setFields({ ...fields, questionsCount: e.target.value })} />
          <input placeholder="Greșeli maxime" className="bg-black border border-cyan-400 px-3 py-2 rounded w-full"
                 value={fields.maxMistakes} onChange={(e) => setFields({ ...fields, maxMistakes: e.target.value })} />

          <div className="flex gap-3">
            <button onClick={saveTest} className="bg-green-600 px-4 py-2 rounded border border-green-400">Salvează</button>
            <button onClick={() => setEditing(null)} className="bg-gray-600 px-4 py-2 rounded border border-gray-400">Renunță</button>
          </div>
        </div>
      )}
    </div>
  );
}
