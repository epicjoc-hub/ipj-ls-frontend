// components/Layout.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

export const API_URL = "https://<koyeb-app>.koyeb.app"; // ← pune domeniul Koyeb aici

const UserCtx = createContext({ user: null, loading: true });
export const useUser = () => useContext(UserCtx);

export default function Layout({ children, protectedRoute = false }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(protectedRoute);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!protectedRoute) return;
      try {
        const r = await fetch(`${API_URL}/check-tester`, { credentials: "include" });
        const data = await r.json();
        if (!ignore) {
          if (!data.authenticated) {
            router.replace("/");
            return;
          }
          setUser(data);
        }
      } catch (_) {
        router.replace("/");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => (ignore = true);
  }, [protectedRoute, router]);

  // restore sidebar pref
  useEffect(() => {
    const saved = localStorage.getItem("ipjls.sidebar");
    if (saved !== null) setCollapsed(saved === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("ipjls.sidebar", collapsed ? "1" : "0");
  }, [collapsed]);

  const logout = () => (window.location.href = `${API_URL}/logout`);
  const value = useMemo(() => ({ user, loading }), [user, loading]);

  const noSidebarRoutes = ["/", "/finish"];
  const showSidebar = !noSidebarRoutes.includes(router.pathname);

  return (
    <UserCtx.Provider value={value}>
      <div className="scanline min-h-screen">
        {showSidebar && (
          <Sidebar
            user={user}
            onLogout={logout}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            pathname={router.pathname}
          />
        )}
        <div className={`${showSidebar ? (collapsed ? "pl-[70px]" : "pl-72") : ""}`}>
          {protectedRoute && loading ? (
            <div className="min-h-[70vh] flex items-center justify-center">
              <div className="animate-pulse text-center">
                <div className="h-6 w-48 bg-cyan-500/20 rounded mb-4" />
                <div className="h-24 w-80 bg-cyan-500/10 rounded" />
              </div>
            </div>
          ) : (
            <main className="p-6">{children}</main>
          )}
        </div>
      </div>
    </UserCtx.Provider>
  );
}
