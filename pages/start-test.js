import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function StartTest() {
  const router = useRouter();
  const { type } = router.query;

  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type) return;

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

      const cfg = await fetch(`${API_URL}/config/${type}`);
      const cfgData = await cfg.json();
      setConfig(cfgData);

      setLoading(false);
    }
    bootstrap();
  }, [type]);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Se încarcă testul...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 select-none">

      <h1 className="text-4xl font-bold uppercase tracking-wide">
        Test: {type.toUpperCase()}
      </h1>

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
