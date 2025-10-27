import { useRouter } from "next/router";

export default function Finish() {
  const router = useRouter();
  const passed = router.query.passed === "true";

  return (
    <div className="p-10 text-slate-200">
      <h1 className="text-3xl font-bold mb-3">
        {passed ? "✅ ADMIS" : "❌ RESPINS"}
      </h1>

      <a href="/dashboard" className="text-blue-400 underline">
        Înapoi la Dashboard
      </a>
    </div>
  );
}
