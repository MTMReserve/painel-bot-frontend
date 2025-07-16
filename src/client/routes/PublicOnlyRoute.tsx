// ===============================
// File: src/client/routes/PublicOnlyRoute.tsx
// ===============================

import { Navigate } from "react-router-dom";
import { useAuthStore } from "@client/store/useAuthStore";
import type { ReactNode } from "react";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
