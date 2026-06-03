export type TrendDirection = "up" | "down" | "stable";

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  changeLabel: string;
  description: string;
  trend: TrendDirection;
}

export interface ExecutiveDashboardDto {
  metrics: KpiMetric[];
  monthlySales: Array<{ name: string; revenue: number; units: number }>;
  salesByCountry: Array<{ name: string; value: number }>;
  salesByChannel: Array<{ name: string; value: number }>;
  topProducts: Array<{ name: string; value: number }>;
  categoryProfitability: Array<{ name: string; value: number; margin: number }>;
}

export interface CommercialDashboardDto {
  metrics: KpiMetric[];
  salesByManager: Array<{ name: string; value: number }>;
  salesByCountry: Array<{ name: string; value: number }>;
  goalsVsActual: Array<{ name: string; actual: number; target: number }>;
  monthlyTrend: Array<{ name: string; value: number }>;
}

export interface FinancialDashboardDto {
  metrics: KpiMetric[];
  marginByProduct: Array<{ name: string; margin: number }>;
  varianceByMonth: Array<{ name: string; value: number }>;
  financialForecast: Array<{ name: string; value: number; description: string }>;
}
