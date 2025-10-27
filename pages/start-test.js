import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../components/Layout";
import TerminalText from "../components/TerminalText";

export default function StartTest() {
  const router = useRouter();
  const { type } = router.query;
  const [config, setConfig] = useState(null);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    if (!type) return;
    (async () => {
      const r1 = await fetch(`${API_URL}/config/${type}`);
      const cfg = await r1.json();
      setConfig(cfg);
      const r2 = await fetch(`${API_URL}/duty/allow/${type}`);
      const d2 = await r2.json();
      setAllowed(!!d2.allowed);
    })();
  }, [type]);

  if (!type || allowed === null)
    return <div className="min-h-[60vh] flex items-center justify-center">Se inițializează...</div>;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 select-none">
      <TerminalText text={`> CIA TERMINAL • TEST ${String(type).toUpperCase()} • CONFIG LOAD`} className="text-green-400" />
      <h1 className="text-4xl font-bold uppercase tracking-wide">Test: {String(type).toUpperCase()}</h1>

      {config?.questionsCount ? (
        <div className="bg-cyan-600/30 border border-cyan-400 px-6 py-4 rounded-md text-lg">
          <p>Timp limită: <span className="font-bold">{config.timeLimitSeconds}s</span></p>
          <p>Întrebări: <span className="font-bold">{config.questionsCount}</span></p>
          <p>Greșeli permise: <span className="font-bold">{config.maxMistakes}</span></p>
        </div>
      ) : (
        <div className="opacity-80">Nu există configurație pentru acest test.</div>
      )}

      {allowed ? (
        <a href={`/submit-test?type=${type}`} className="bg-cyan-600 hover:bg-cyan-700 border border-cyan-400 px-6 py-3 rounded-md text-xl font-bold">
          Începe Testul
        </a>
      ) : (
        <div className="text-center">
          <div className="mb-3 opacity-90">Nu există examinator ON DUTY pentru acest test.</div>
          <a href="/call" className="inline-block bg-green-600 hover:bg-green-700 border border-green-400 px-6 py-3 rounded-md text-xl font-bold">
            Call Instructor
          </a>
        </div>
      )}
    </div>
  );
}
