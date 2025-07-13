//==============================
//src/components/StatusChip.tsx
//==============================

import clsx from "classnames";

type StatusChipProps = {
  label: string;
  variant: "status" | "temperatura";
};

export function StatusChip({ label, variant }: StatusChipProps) {
  const cores = {
    status: {
      ativo: "bg-green-100 text-green-800",
      "em análise": "bg-yellow-100 text-yellow-800",
      fechado: "bg-blue-100 text-blue-800",
      perdido: "bg-red-100 text-red-800",
    },
    temperatura: {
      quente: "bg-red-100 text-red-800",
      morno: "bg-yellow-100 text-yellow-800",
      frio: "bg-blue-100 text-blue-800",
    },
  };

  const classe = cores[variant][label.toLowerCase() as keyof typeof cores[typeof variant]] || "bg-gray-100 text-gray-800";

  return (
    <span className={clsx("text-xs font-medium px-2 py-1 rounded", classe)}>
      {label}
    </span>
  );
}
