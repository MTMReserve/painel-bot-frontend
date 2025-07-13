// ==============================================
// File: src/pages/Dashboard.tsx
// ==============================================

import { useFunnelStats } from "@/hooks/useFunnelStats";
import { StatusCard } from "@/components/StatusCard";
import {
  MessageCircle,
  UserPlus,
  Search,
  FileText,
  AlertTriangle,
  Handshake,
  CheckCircle,
  ThumbsUp,
  RefreshCcw,
  Slash
} from "lucide-react";
import type { EtapaFunil } from "@/config/constants";
import type { ReactNode } from "react";
import { BarChart } from "@/components/BarChart";
import { PieChart } from "@/components/PieChart";

// Mapeamento visual das etapas
const ETAPAS_LABELS: Record<EtapaFunil, string> = {
  entrada: "Entrada",
  abordagem: "Abordagem",
  levantamento: "Levantamento",
  proposta: "Proposta",
  objecoes: "Objeções",
  negociacao: "Negociação",
  fechamento: "Fechamento",
  pos_venda: "Pós-venda",
  reativacao: "Reativação",
  encerramento: "Encerrado",
};

const ETAPAS_CORES: Record<EtapaFunil, string> = {
  entrada: "bg-blue-500",
  abordagem: "bg-blue-600",
  levantamento: "bg-yellow-500",
  proposta: "bg-orange-500",
  objecoes: "bg-red-400",
  negociacao: "bg-orange-600",
  fechamento: "bg-green-600",
  pos_venda: "bg-green-400",
  reativacao: "bg-purple-500",
  encerramento: "bg-gray-600",
};

const ETAPAS_ICONS: Record<EtapaFunil, ReactNode> = {
  entrada: <UserPlus size={28} />,
  abordagem: <MessageCircle size={28} />,
  levantamento: <Search size={28} />,
  proposta: <FileText size={28} />,
  objecoes: <AlertTriangle size={28} />,
  negociacao: <Handshake size={28} />,
  fechamento: <CheckCircle size={28} />,
  pos_venda: <ThumbsUp size={28} />,
  reativacao: <RefreshCcw size={28} />,
  encerramento: <Slash size={28} />,
};

export default function Dashboard() {
  const { data, isLoading, error } = useFunnelStats();

  if (isLoading) return <p>Carregando dados do funil...</p>;
  if (error) return <p>Erro ao carregar o dashboard</p>;
  if (!data || data.length === 0)
    return <p>Nenhum dado encontrado para este tenant.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((etapa: { etapa: EtapaFunil; total: number }) => (
          <StatusCard
            key={etapa.etapa}
            label={ETAPAS_LABELS[etapa.etapa]}
            quantidade={etapa.total}
            bgColor={ETAPAS_CORES[etapa.etapa]}
            icon={ETAPAS_ICONS[etapa.etapa]}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChart data={data} cores={ETAPAS_CORES} />
        <PieChart data={data} cores={ETAPAS_CORES} />
      </div>
    </div>
  );
}
