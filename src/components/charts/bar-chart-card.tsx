"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionCard } from "@/components/dashboard/section-card";

type ChartPoint = Record<string, number | string | undefined>;

interface BarChartCardProps {
  title: string;
  description: string;
  data: ChartPoint[];
  dataKey: string;
  labelKey: string;
  color: string;
  comparisonKey?: string;
  comparisonLabel?: string;
}

export function BarChartCard({
  title,
  description,
  data,
  dataKey,
  labelKey,
  color,
  comparisonKey,
  comparisonLabel,
}: BarChartCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SectionCard title={title} description={description}>
      <div className="h-80 min-w-0">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey={labelKey} stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataKey} fill={color} radius={[10, 10, 0, 0]} name="Actual" />
              {comparisonKey ? (
                <Bar
                  dataKey={comparisonKey}
                  fill="#94a3b8"
                  radius={[10, 10, 0, 0]}
                  name={comparisonLabel ?? "Comparativa"}
                />
              ) : null}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full animate-pulse rounded-2xl bg-slate-100" />
        )}
      </div>
    </SectionCard>
  );
}
