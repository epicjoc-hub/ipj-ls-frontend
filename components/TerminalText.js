// components/TerminalText.js
import { useEffect, useState } from "react";

export default function TerminalText({ text = "", speed = 18, className = "" }) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <div className={`font-mono tracking-wide ${className}`}>
      <span>{out}</span>
      <span className="inline-block w-3 h-5 bg-cyan-400 ml-1 align-middle animate-pulse" />
    </div>
  );
}
