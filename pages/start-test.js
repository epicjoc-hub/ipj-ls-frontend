// pages/start-test.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../components/Layout";

export default function StartTest() {
  const router = useRouter();
  const { type } = router.query;

  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!type) return;
    (async () => {
      const res = await fetch(`${API_URL}/config/${type}`);
      const cfg = await res.json();
      setConfig(cfg);
    })();
  }, [type]);

  if (!type || !config)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Se încarcă testul...
      </div>
    );

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 select-none">
      <h1 className="text-4xl font-bold uppercase tracking-wide">Test: {String(type).toUpperCase()}</h1>

      <div className="bg-blue-600/60 border border-blue-400 px-6 py-4 rounded-md text-lg">
        <p>Timp limită: <span className="font-bold">{config.timeLimitSeconds}s</span></p>
        <p>Întrebări: <span className="font-bold">{config.questionsCount}</span></p>
        <p>Greșeli permise: <span className="font-bold">{config.maxMistakes}</span></p>
      </div>

      <button
        onClick={() => router.push(`/submit-test?type=${type}`)}
        className="bg-blue-600 hover:bg-blue-700 border border-blue-400 px-6 py-3 rounded-md text-xl font-bold"
      >
        Începe Testul
      </button>
    </div>
  );
}
