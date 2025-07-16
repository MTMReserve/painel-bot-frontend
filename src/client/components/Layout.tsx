// ==========================
// File: src/client/components/Layout.tsx
// ==========================

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useTenantStore } from "../store/useTenantStore";

export default function Layout() {
  const { tenant } = useTenantStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const precisaAceitarTermo =
      tenant &&
      !tenant.aceitou_termos_em &&
      location.pathname !== "/contrato";

    if (precisaAceitarTermo) {
      navigate("/contrato");
    }
  }, [tenant, location.pathname, navigate]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
