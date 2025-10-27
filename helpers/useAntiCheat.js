import { useEffect } from "react";

const API = "https://present-alberta-ipjls-757d03fe.koyeb.app";

export default function useAntiCheat(examId) {
  useEffect(() => {
    if (!examId) return;

    const log = (type, meta) => {
      fetch(API + "/tests/anti-cheat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId, type, meta })
      });
    };

    const blur = () => log("window-blur");
    const visibility = () => {
      if (document.hidden) log("tab-hidden");
    };
    const mouseOut = () => log("pointer-out");

    window.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("mouseout", mouseOut);

    return () => {
      window.removeEventListener("blur", blur);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("mouseout", mouseOut);
    };
  }, [examId]);
}
