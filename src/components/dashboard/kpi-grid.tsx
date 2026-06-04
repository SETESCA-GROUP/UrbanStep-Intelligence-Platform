import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KpiMetric } from "@/types/dashboard";

interface KpiGridProps {
  items: KpiMetric[];
}

const trendStyles = {
  up: {
    icon: ArrowUpRight,
    className: "text-emerald-600",
  },
  down: {
    icon: ArrowDownRight,
    className: "text-rose-600",
  },
  stable: {
    icon: ArrowRight,
    className: "text-slate-500",
  },
} as const;

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const trend = trendStyles[item.trend];
        const TrendIcon = trend.icon;

        return (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-slate-950">
                {item.value}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className={trend.className}>
                  <TrendIcon className="inline h-4 w-4" /> {item.changeLabel}
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">{item.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}



