import { useUser, API_URL } from "../components/Layout";
import { useEffect, useState } from "react";
import TerminalText from "../components/TerminalText";

export default function Duty() {
  const { user } = useUser();
  const [active, setActive] = useState(false);

  async function toggle() {
    if (!active) {
      await fetch(API_URL + "/duty/on", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roles: [] }),
      });
      setActive(true);
    } else {
      await fetch(API_URL + "/duty/off", { method: "POST", credentials: "include" });
      setActive(false);
    }
  }

  return (
    <div>
      <TerminalText text="> CIA TERMINAL • DUTY CONSOLE" className="text-green-400 mb-6" />
      <div className="card-grid p-6 rounded-xl">
        <div className="text-xl mb-3">
          Status: <span className={active ? "text-green-400" : "text-red-400"}>{active ? "PE TURĂ" : "OFF"}</span>
        </div>
        <button onClick={toggle} className="px-6 py-3 rounded bg-cyan-600 hover:bg-cyan-700 border border-cyan-400 font-bold">
          {active ? "Ieși din tură" : "Intră în tură"}
        </button>
      </div>
    </div>
  );
}
