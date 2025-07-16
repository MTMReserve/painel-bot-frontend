// ===============================
// File: src/components/BarChart.tsx
// ===============================

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { EtapaFunil } from "@client/config/constants";

interface BarChartProps {
  data: { etapa: EtapaFunil; total: number }[];
  cores: Record<EtapaFunil, string>;
}

export function BarChart({ data, cores }: BarChartProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Volume por Etapa</h2>
      <ResponsiveContainer width="100%" height={250}>
        <RechartsBarChart data={data}>
          <XAxis dataKey="etapa" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total">
            {data.map((item, index) => (
              <Cell key={index} fill={cores[item.etapa]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
