// ==============================================
// File: src/components/StatusCard.tsx
// ==============================================

import type { ReactNode } from "react";

interface StatusCardProps {
  label: string;
  quantidade: number;
  icon: ReactNode;
  bgColor: string;
}

export function StatusCard({ label, quantidade, icon, bgColor }: StatusCardProps) {
  return (
    <div className={`rounded-2xl p-4 text-white shadow-md ${bgColor}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-semibold">{label}</span>
        <div className="text-white opacity-80">{icon}</div>
      </div>
      <p className="text-3xl font-bold">{quantidade}</p>
    </div>
  );
}
