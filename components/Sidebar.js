// components/Sidebar.js
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaListOl,
  FaHistory,
  FaChartPie,
  FaIdCard,
  FaCrown,
  FaSignOutAlt,
  FaHeadset,
  FaUniversity,
  FaTabletAlt,
} from "react-icons/fa";

const NAV_LINK = ({ href, icon: Icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition
      ${active ? "bg-blue-600 text-white" : "hover:bg-blue-600/30"}
    `}
  >
    <Icon className="shrink-0" />
    <span className="truncate">{label}</span>
  </Link>
);

export default function Sidebar({ user, onLogout, collapsed, setCollapsed, pathname }) {
  // persistă preferința de sidebar
  useEffect(() => {
    const saved = localStorage.getItem("ipjls.sidebar");
    if (saved !== null) setCollapsed(saved === "1");
  }, [setCollapsed]);

  useEffect(() => {
    localStorage.setItem("ipjls.sidebar", collapsed ? "1" : "0");
  }, [collapsed]);

  // toggle cu Ctrl+B
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
      className={`h-screen bg-black/70 border-r border-blue-900/40 text-white
      backdrop-blur-sm fixed inset-y-0 left-0 z-40 transition-all
      ${collapsed ? "w-[70px]" : "w-72"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-blue-900/40">
        <div className={`font-extrabold tracking-wide uppercase ${collapsed ? "hidden" : "block"}`}>
          IPJ Los Santos
        </div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((v) => !v)}
          className="p-2 rounded hover:bg-blue-600/30"
          title="Ctrl+B"
        >
          <FaBars />
        </button>
      </div>

      {/* User mini-card */}
      <div className={`px-3 py-4 border-b border-blue-900/40 ${collapsed ? "hidden" : "block"}`}>
        <div className="text-sm opacity-70">Autentificat ca</div>
        <div className="font-semibold">{user?.discord_tag || "—"}</div>
        <div className="mt-2 flex gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-blue-600/30 border border-blue-600/50">Polițist</span>
          {user?.isTester && (
            <span className="px-2 py-1 rounded bg-blue-600/30 border border-blue-600/50">Tester</span>
          )}
          {user?.isEditor && (
            <span className="px-2 py-1 rounded bg-yellow-600/30 border border-yellow-600/50">Editor</span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="px-2 py-3 flex flex-col gap-1">
        <NAV_LINK href="/call" icon={FaHeadset} label="Call Instructor" active={pathname === "/call"} />
<NAV_LINK href="/instructors" icon={FaIdCard} label="Instructori (Live)" active={pathname === "/instructors"} />
        <NAV_LINK href="/dashboard" icon={FaTachometerAlt} label="Dashboard" active={pathname === "/dashboard"} />

        {/* Grup Teste */}
        {!collapsed && <div className="mt-3 mb-1 text-xs uppercase opacity-60 px-2">Teste</div>}
        <NAV_LINK
          href="/start-test?type=academie"
          icon={FaUniversity}
          label="Academie"
          active={pathname.startsWith("/start-test")}
        />
        <NAV_LINK
          href="/start-test?type=radio"
          icon={FaHeadset}
          label="Comunicații Radio"
          active={pathname.startsWith("/start-test")}
        />
        <NAV_LINK
          href="/start-test?type=mdt"
          icon={FaTabletAlt}
          label="MDT"
          active={pathname.startsWith("/start-test")}
        />

        {!collapsed && <div className="mt-3 mb-1 text-xs uppercase opacity-60 px-2">Raportare</div>}
        <NAV_LINK href="/submit-test" icon={FaListOl} label="Trimite Raport" active={pathname === "/submit-test"} />
        <NAV_LINK href="/history" icon={FaHistory} label="Istoric" active={pathname === "/history"} />
        <NAV_LINK href="/stats" icon={FaChartPie} label="Statistici" active={pathname === "/stats"} />

        {/* Secțiuni rol-based */}
        {user?.isTester && (
          <NAV_LINK href="/tester" icon={FaIdCard} label="Cod Tester" active={pathname === "/tester"} />
        )}
        {user?.isEditor && (
          <NAV_LINK href="/admin" icon={FaCrown} label="Admin Teste" active={pathname === "/admin"} />
        )}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-blue-900/40">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 rounded bg-red-600 hover:bg-red-700 px-3 py-2 font-semibold"
        >
          <FaSignOutAlt />
          <span className={`${collapsed ? "hidden" : "inline"}`}>Deconectare</span>
        </button>
      </div>
    </aside>
  );
}
