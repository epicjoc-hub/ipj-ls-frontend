// pages/call.js
import { useEffect, useRef, useState } from "react";
import { API_URL, useUser } from "../components/Layout";
import TerminalText from "../components/TerminalText";

export default function Call() {
  const { user } = useUser();
  const [testType, setTestType] = useState("radio");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);

  async function call() {
    setSending(true);
    const res = await fetch(`${API_URL}/call-instructor`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testType, note }),
    });
    const data = await res.json();
    setSending(false);
    if (data.ok) setSent(data.id);
    else alert(data.error || "Eroare");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <TerminalText
        text="> CIA TERMINAL • REQUEST INSTRUCTOR • LIVE LINK ESTABLISHED"
        className="text-green-400 mb-6"
      />

      <div className="bg-blue-600/20 border border-blue-500 rounded p-5 space-y-4">
        <div className="text-sm opacity-75">Solicitant: {user?.discord_tag}</div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm opacity-70">Tip test</label>
            <select
              className="w-full bg-black border border-blue-500 rounded px-3 py-2"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
            >
              <option value="radio">Radio</option>
              <option value="mdt">MDT</option>
            </select>
          </div>

          <div>
            <label className="text-sm opacity-70">Notă (opțional)</label>
            <input
              className="w-full bg-black border border-blue-500 rounded px-3 py-2"
              placeholder="Ex: Camera 2, motiv urgent..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={call}
          disabled={sending}
          className="bg-blue-600 hover:bg-blue-700 border border-blue-400 px-5 py-2 rounded font-bold"
        >
          {sending ? "Se transmite..." : "Solicită Instructor"}
        </button>

        {sent && (
          <div className="text-green-400 mt-3">
            Ping trimis. ID: <span className="font-mono">{sent}</span>
          </div>
        )}
      </div>
    </div>
  );
}
