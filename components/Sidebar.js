// components/Sidebar.js
import Link from "next/link";
import { useEffect } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaHistory,
  FaChartPie,
  FaIdCard,
  FaCrown,
  FaSignOutAlt,
  FaHeadset,
  FaUniversity,
  FaTabletAlt,
  FaBroadcastTower,
  FaListOl
} from "react-icons/fa";

const Item = ({ href, icon: Icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition
      ${active ? "bg-cyan-600 text-white" : "hover:bg-cyan-600/30"}
    `}
  >
    <Icon className="shrink-0" />
    <span className="truncate">{label}</span>
  </Link>
);

export default function Sidebar({ user, onLogout, collapsed, setCollapsed, pathname }) {
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setCollapsed((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCollapsed]);

  return (
    <aside
      className={`h-screen bg-black/70 border-r border-cyan-900/40 text-white
      backdrop-blur-sm fixed inset-y-0 left-0 z-40 transition-all
      ${collapsed ? "w-[70px]" : "w-72"}`}
    >
      <div className="flex items-center justify-between px-3 py-3 border-b border-cyan-900/40">
        <div className={`font-extrabold tracking-wide uppercase ${collapsed ? "hidden" : "block"}`}>
          IPJ Los Santos
        </div>
        <button onClick={() => setCollapsed((v) => !v)} className="p-2 rounded hover:bg-cyan-600/30" title="Ctrl+B">
          <FaBars />
        </button>
      </div>

      {!collapsed && (
        <div className="px-3 py-4 border-b border-cyan-900/40">
          <div className="text-sm opacity-70">Autentificat ca</div>
          <div className="font-semibold">{user?.discord_tag || "—"}</div>
          <div className="mt-2 flex gap-2 text-xs">
            <span className="badge">Polițist</span>
            {user?.isTester && <span className="badge">Tester</span>}
            {user?.isEditor && <span className="badge">Editor</span>}
            {user?.canRadio && <span className="badge">Instr. Radio</span>}
            {user?.canMDT && <span className="badge">Instr. MDT</span>}
          </div>
        </div>
      )}

      <nav className="px-2 py-3 flex flex-col gap-1">
        <Item href="/dashboard" icon={FaTachometerAlt} label="Dashboard" active={pathname === "/dashboard"} />

        {!collapsed && <div className="mt-3 mb-1 text-xs uppercase opacity-60 px-2">Teste</div>}
        <Item href="/start-test?type=academie" icon={FaUniversity} label="Academie" active={pathname.startsWith("/start-test")} />
        <Item href="/start-test?type=radio" icon={FaBroadcastTower} label="Radio" active={pathname.startsWith("/start-test")} />
        <Item href="/start-test?type=mdt" icon={FaTabletAlt} label="MDT" active={pathname.startsWith("/start-test")} />

        {!collapsed && <div className="mt-3 mb-1 text-xs uppercase opacity-60 px-2">Operațiuni</div>}
        <Item href="/call" icon={FaHeadset} label="Call Instructor" active={pathname === "/call"} />
        <Item href="/instructors" icon={FaIdCard} label="Instructori (Live)" active={pathname === "/instructors"} />
        <Item href="/history" icon={FaHistory} label="Istoric" active={pathname === "/history"} />
        <Item href="/stats" icon={FaChartPie} label="Statistici" active={pathname === "/stats"} />
        <Item href="/tester" icon={FaListOl} label="Cod Tester" active={pathname === "/tester"} />

        {user?.isEditor && (
          <Item href="/editor-tests" icon={FaCrown} label="Editare Teste" active={pathname === "/editor-tests"} />
        )}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-cyan-900/40">
        <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 rounded bg-red-600 hover:bg-red-700 px-3 py-2 font-semibold">
          <FaSignOutAlt />
          <span className={`${collapsed ? "hidden" : "inline"}`}>Deconectare</span>
        </button>
      </div>
    </aside>
  );
}
