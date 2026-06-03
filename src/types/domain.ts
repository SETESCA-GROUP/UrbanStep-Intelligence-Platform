export interface MetricPoint {
  name: string;
  value: number;
}

export interface MonthlyRevenueRecord {
  name: string;
  revenue: number;
  units: number;
  grossMargin: number;
}

export interface ProductMetric extends MetricPoint {
  margin: number;
}

export interface GoalComparison {
  name: string;
  actual: number;
  target: number;
}

export interface ForecastScenario extends MetricPoint {
  description: string;
}

export interface DashboardSnapshot {
  previousYearRevenue: number;
  annualRevenueTarget: number;
  grossMarginTarget: number;
  monthlyRevenue: MonthlyRevenueRecord[];
  salesByCountry: MetricPoint[];
  salesByChannel: MetricPoint[];
  topProducts: ProductMetric[];
  categoryProfitability: ProductMetric[];
  salesByManager: MetricPoint[];
  goalsVsActual: GoalComparison[];
  marginByProduct: ProductMetric[];
  varianceByMonth: MetricPoint[];
  financialForecast: ForecastScenario[];
}
