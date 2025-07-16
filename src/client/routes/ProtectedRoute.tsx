// ===============================
// File: src/client/routes/ProtectedRoute.tsx
// ===============================

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@client/store/useAuthStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const tenant_id = useAuthStore((state) => state.tenant_id);

  const isAuthenticated = !!token && !!tenant_id && !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
