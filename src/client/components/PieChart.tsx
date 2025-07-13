// ===============================
// File: src/components/PieChart.tsx
// ===============================

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { EtapaFunil } from "@/config/constants";

interface PieChartProps {
  data: { etapa: EtapaFunil; total: number }[];
  cores: Record<EtapaFunil, string>;
}

export function PieChart({ data, cores }: PieChartProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Distribuição por Etapa</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="etapa"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((item, index) => (
              <Cell key={index} fill={cores[item.etapa]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
