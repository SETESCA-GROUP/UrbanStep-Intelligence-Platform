"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SectionCard } from "@/components/dashboard/section-card";

const COLORS = ["#0f172a", "#0ea5e9", "#22c55e", "#f59e0b", "#7c3aed"];
const LEGEND_DOT_CLASSES = [
  "bg-slate-900",
  "bg-sky-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-violet-600",
];

type ChartPoint = Record<string, number | string | undefined>;

interface DonutChartCardProps {
  title: string;
  description: string;
  data: ChartPoint[];
  dataKey: string;
  nameKey: string;
}

export function DonutChartCard({
  title,
  description,
  data,
  dataKey,
  nameKey,
}: DonutChartCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SectionCard title={title} description={description}>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_180px]">
        <div className="h-80 min-w-0">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={nameKey}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {data.map((entry, index) => (
                    <Cell key={`${entry[nameKey]}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full animate-pulse rounded-lg bg-slate-100" />
          )}
        </div>
        <div className="space-y-4">
          {data.map((entry, index) => (
            <div key={`${entry[nameKey]}-${index}`} className="flex items-center gap-3 text-sm">
              <span className={`h-3 w-3 rounded-full ${LEGEND_DOT_CLASSES[index % LEGEND_DOT_CLASSES.length]}`} />
              <div>
                <p className="font-medium text-slate-700">{String(entry[nameKey])}</p>
                <p className="text-slate-500">{Number(entry[dataKey]).toLocaleString("es-ES")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
