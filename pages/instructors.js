// pages/instructors.js
import { useEffect, useRef, useState } from "react";
import { API_URL, useUser } from "../components/Layout";
import TerminalText from "../components/TerminalText";

export default function Instructors() {
  const { user } = useUser();
  const [list, setList] = useState([]);
  const [pings, setPings] = useState([]);
  const esRef = useRef(null);

  // încărcare duty
  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + "/duty/list");
      const data = await res.json();
      setList(Object.values(data));
    })();
  }, []);

  // subscribe la evenimente
  useEffect(() => {
    // doar user autentificat
    if (!user) return;

    const es = new EventSource(API_URL + "/events", { withCredentials: true });
    esRef.current = es;

    es.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === "duty-update") {
          setList(Object.values(msg.payload));
        }
        if (msg.type === "ping") {
          // filtrează pe rol
          const p = msg.payload;
          if (p.testType === "radio" && !user.canRadio) return;
          if (p.testType === "mdt" && !user.canMDT) return;
          setPings((old) => [p, ...old].slice(0, 50));
          // beep mic
          try {
            const a = new Audio(
              "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQgAAAAA"
            );
            a.play().catch(() => {});
          } catch {}
        }
        if (msg.type === "ack") {
          setPings((old) => old.map((x) => (x.id === msg.payload.id ? msg.payload : x)));
        }
      } catch {}
    };

    es.onerror = () => {
      // se va reconecta automat
    };

    return () => {
      es.close();
    };
  }, [user]);

  async function accept(id) {
    const res = await fetch(API_URL + "/ack-ping", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!data.ok) alert(data.error || "Eroare");
  }

  return (
    <div className="space-y-8">
      <TerminalText
        text="> CIA TERMINAL • INSTRUCTOR LIVE CONSOLE • MONITORING PINGS"
        className="text-green-400"
      />

      <section>
        <h2 className="text-xl mb-3 opacity-80">Instructori ON DUTY</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {list.map((u) => (
            <div key={u.id} className="border border-blue-500 bg-blue-900/30 rounded p-3">
              <div className="font-bold">{u.tag}</div>
              <div className="text-sm opacity-75">
                Roluri: {u.roles.join(", ") || "—"} • Din: {new Date(u.since).toLocaleString()}
              </div>
            </div>
          ))}
          {!list.length && <div className="opacity-70">Nimeni în tură.</div>}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3 opacity-80">Pings Live</h2>
        <div className="grid gap-3">
          {pings.map((p) => (
            <div key={p.id} className="border border-green-600 bg-green-900/20 rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-bold uppercase">{p.testType} • {p.id}</div>
                <div className="text-sm opacity-80">De la: {p.requester.tag} • {new Date(p.time).toLocaleString()}</div>
                {p.note && <div className="text-sm opacity-80">Notă: {p.note}</div>}
                {p.status === "accepted" && (
                  <div className="text-sm text-green-400 mt-1">
                    Acceptat de {p.acceptedBy?.tag}
                  </div>
                )}
              </div>
              <div>
                {p.status === "open" ? (
                  <button
                    onClick={() => accept(p.id)}
                    className="bg-green-600 hover:bg-green-700 border border-green-400 px-4 py-2 rounded font-bold"
                  >
                    Acceptă
                  </button>
                ) : (
                  <span className="text-green-400 font-semibold">ACCEPTAT</span>
                )}
              </div>
            </div>
          ))}
          {!pings.length && <div className="opacity-70">Fără semnale momentan.</div>}
        </div>
      </section>
    </div>
  );
}
