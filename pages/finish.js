// pages/finish.js
import { useRouter } from "next/router";

export default function Finish() {
  const router = useRouter();
  const passed = router.query.passed === "true";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-slate-200 p-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">
          {passed ? "✅ ADMIS" : "❌ RESPINS"}
        </h1>
        <a href="/dashboard" className="text-blue-400 underline">
          Înapoi la Dashboard
        </a>
      </div>
    </div>
  );
}
