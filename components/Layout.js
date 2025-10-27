// components/Layout.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

export const API_URL = "https://present-alberta-ipjls-757d03fe.koyeb.app";

const UserCtx = createContext({ user: null, loading: true });
export const useUser = () => useContext(UserCtx);

export default function Layout({ children, protectedRoute = false }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(protectedRoute); // doar rutele protejate așteaptă
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      if (!protectedRoute) return; // nu verificăm pe homepage/finish
      try {
        const res = await fetch(`${API_URL}/check-tester`, { credentials: "include" });
        const data = await res.json();
        if (ignore) return;

        if (!data.authenticated) {
          router.replace("/");
          return;
        }
        setUser(data);
      } catch (e) {
        // fallback în caz de eroare
        router.replace("/");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchUser();
    return () => (ignore = true);
  }, [protectedRoute, router]);

  const logout = () => {
    window.location.href = `${API_URL}/logout`;
  };

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  // Layout pentru homepage sau pentru pagina fără sidebar
  const noSidebarRoutes = ["/", "/finish"];
  const showSidebar = !noSidebarRoutes.includes(router.pathname);

  return (
    <UserCtx.Provider value={value}>
      <div className="min-h-screen bg-[rgb(4,7,15)] text-white">
        {showSidebar && (
          <Sidebar
            user={user}
            onLogout={logout}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            pathname={router.pathname}
          />
        )}

        {/* CONȚINUT */}
        <div className={`${showSidebar ? (collapsed ? "pl-[70px]" : "pl-72") : ""}`}>
          {/* topbar/breadcrumb */}
          {showSidebar && (
            <header className="sticky top-0 z-30 bg-black/50 backdrop-blur border-b border-blue-900/40 px-4 py-3 flex items-center justify-between">
              <div className="text-sm opacity-70">
                {router.pathname === "/dashboard" ? "Acasă" : "Acasă / "}{router.pathname.replace("/", "") || "—"}
              </div>
              {user && (
                <div className="text-sm opacity-80">
                  {user.discord_tag}
                  {user.isTester && " • Tester"}
                  {user.isEditor && " • Editor"}
                </div>
              )}
            </header>
          )}

          {/* skeleton loading pentru rute protejate */}
          {protectedRoute && loading ? (
            <div className="min-h-[70vh] flex items-center justify-center">
              <div className="animate-pulse text-center">
                <div className="h-6 w-48 bg-blue-600/30 rounded mb-4" />
                <div className="h-24 w-80 bg-blue-600/20 rounded" />
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
