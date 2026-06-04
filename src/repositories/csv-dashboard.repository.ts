import { CsvImportService } from "@/services/csv-import.service";
import type {
  DashboardSnapshot,
  ForecastScenario,
  GoalComparison,
  MetricPoint,
  MonthlyRevenueRecord,
  ProductMetric,
} from "@/types/domain";
import type { DashboardRepository } from "@/repositories/dashboard.repository";

interface SalesRow {
  year: number;
  month: number;
  country: string;
  channel: string;
  product: string;
  category: string;
  manager: string;
  units: number;
  revenue: number;
  cost: number;
  grossMargin: number;
}

interface GoalRow {
  year: number;
  month: number;
  country: string;
  salesTarget: number;
  marginTarget: number;
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export class CsvDashboardRepository implements DashboardRepository {
  constructor(private readonly csvImportService = new CsvImportService()) {}

  async getSnapshot(): Promise<DashboardSnapshot> {
    const [sales2025Rows, sales2026Rows, goalRows] = await Promise.all([
      this.csvImportService.loadDataset("Ventas2025.csv"),
      this.csvImportService.loadDataset("Ventas2026.csv"),
      this.csvImportService.loadDataset("Objetivos.csv"),
    ]);

    const sales2025 = sales2025Rows.map((row) => this.toSalesRow(row));
    const sales2026 = sales2026Rows.map((row) => this.toSalesRow(row));
    const goals = goalRows.map((row) => this.toGoalRow(row));
    const currentYear = Math.max(...sales2026.map((row) => row.year));
    const activeMonths = new Set(sales2026.map((row) => row.month));
    const comparablePreviousYearSales = sales2025.filter((row) => activeMonths.has(row.month));

    const monthlyRevenue = this.groupMonthlyRevenue(sales2026);
    const salesByCountry = this.groupMetric(sales2026, (row) => row.country, (row) => row.revenue);
    const salesByChannel = this.groupMetric(sales2026, (row) => row.channel, (row) => row.revenue);
    const topProducts = this.groupProductMetrics(sales2026, (row) => row.product).slice(0, 6);
    const categoryProfitability = this.groupProductMetrics(sales2026, (row) => row.category);
    const salesByManager = this.groupMetric(sales2026, (row) => row.manager, (row) => row.revenue);
    const goalsVsActual = this.buildGoalsVsActual(sales2026, goals, currentYear);
    const annualRevenueTarget = goals
      .filter((goal) => goal.year === currentYear)
      .reduce((sum, goal) => sum + goal.salesTarget, 0);
    const grossMarginTarget = this.average(
      goals.filter((goal) => goal.year === currentYear).map((goal) => goal.marginTarget)
    );

    return {
      previousYearRevenue: this.sum(comparablePreviousYearSales, (row) => row.revenue),
      annualRevenueTarget,
      grossMarginTarget,
      monthlyRevenue,
      salesByCountry,
      salesByChannel,
      topProducts,
      categoryProfitability,
      salesByManager,
      goalsVsActual,
      marginByProduct: topProducts,
      varianceByMonth: this.buildVarianceByMonth(monthlyRevenue, goals, currentYear),
      financialForecast: this.buildFinancialForecast(monthlyRevenue, annualRevenueTarget),
    };
  }

  private toSalesRow(row: Record<string, string>): SalesRow {
    return {
      year: this.toNumber(row["Año"]),
      month: this.toNumber(row.Mes),
      country: row["País"] ?? "Unknown",
      channel: row.Canal ?? "Unknown",
      product: row.Producto ?? row.SKU ?? "Unknown",
      category: row["Categoría"] ?? "Unknown",
      manager: row.Comercial ?? "Unknown",
      units: this.toNumber(row.Unidades),
      revenue: this.toNumber(row.ImporteVenta),
      cost: this.toNumber(row.CosteTotal),
      grossMargin: this.toNumber(row.MargenBruto),
    };
  }

  private toGoalRow(row: Record<string, string>): GoalRow {
    return {
      year: this.toNumber(row["Año"]),
      month: this.toNumber(row.Mes),
      country: row["País"] ?? "Unknown",
      salesTarget: this.toNumber(row.ObjetivoVentas),
      marginTarget: this.toNumber(row.ObjetivoMargenPct),
    };
  }

  private groupMonthlyRevenue(rows: SalesRow[]): MonthlyRevenueRecord[] {
    const records = new Map<number, { revenue: number; units: number; grossMargin: number }>();

    for (const row of rows) {
      const current = records.get(row.month) ?? { revenue: 0, units: 0, grossMargin: 0 };
      current.revenue += row.revenue;
      current.units += row.units;
      current.grossMargin += row.grossMargin;
      records.set(row.month, current);
    }

    return [...records.entries()]
      .sort(([leftMonth], [rightMonth]) => leftMonth - rightMonth)
      .map(([month, record]) => ({
        name: MONTH_LABELS[month - 1] ?? `M${month}`,
        revenue: Math.round(record.revenue),
        units: record.units,
        grossMargin: record.revenue > 0 ? (record.grossMargin / record.revenue) * 100 : 0,
      }));
  }

  private groupMetric(
    rows: SalesRow[],
    getName: (row: SalesRow) => string,
    getValue: (row: SalesRow) => number
  ): MetricPoint[] {
    const records = new Map<string, number>();

    for (const row of rows) {
      const name = getName(row);
      records.set(name, (records.get(name) ?? 0) + getValue(row));
    }

    return [...records.entries()]
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((left, right) => right.value - left.value);
  }

  private groupProductMetrics(rows: SalesRow[], getName: (row: SalesRow) => string): ProductMetric[] {
    const records = new Map<string, { revenue: number; grossMargin: number }>();

    for (const row of rows) {
      const name = getName(row);
      const current = records.get(name) ?? { revenue: 0, grossMargin: 0 };
      current.revenue += row.revenue;
      current.grossMargin += row.grossMargin;
      records.set(name, current);
    }

    return [...records.entries()]
      .map(([name, value]) => ({
        name,
        value: Math.round(value.revenue),
        margin: value.revenue > 0 ? Number(((value.grossMargin / value.revenue) * 100).toFixed(1)) : 0,
      }))
      .sort((left, right) => right.value - left.value);
  }

  private buildGoalsVsActual(sales: SalesRow[], goals: GoalRow[], year: number): GoalComparison[] {
    const actualByCountry = this.groupMetric(sales, (row) => row.country, (row) => row.revenue);
    const targetByCountry = new Map<string, number>();

    for (const goal of goals.filter((goal) => goal.year === year)) {
      targetByCountry.set(goal.country, (targetByCountry.get(goal.country) ?? 0) + goal.salesTarget);
    }

    return actualByCountry.map((country) => ({
      name: country.name,
      actual: country.value,
      target: Math.round(targetByCountry.get(country.name) ?? 0),
    }));
  }

  private buildVarianceByMonth(
    monthlyRevenue: MonthlyRevenueRecord[],
    goals: GoalRow[],
    year: number
  ): MetricPoint[] {
    return monthlyRevenue.map((monthRecord, index) => {
      const month = index + 1;
      const target = goals
        .filter((goal) => goal.year === year && goal.month === month)
        .reduce((sum, goal) => sum + goal.salesTarget, 0);

      return {
        name: monthRecord.name,
        value: Math.round(monthRecord.revenue - target),
      };
    });
  }

  private buildFinancialForecast(
    monthlyRevenue: MonthlyRevenueRecord[],
    annualRevenueTarget: number
  ): ForecastScenario[] {
    const currentRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
    const runRate = monthlyRevenue.length > 0 ? (currentRevenue / monthlyRevenue.length) * 12 : 0;

    return [
      {
        name: "Run-rate",
        value: Math.round(runRate),
        description: `${Math.round((runRate / annualRevenueTarget) * 100)}% del objetivo anual`,
      },
    ];
  }

  private sum(rows: SalesRow[], getValue: (row: SalesRow) => number) {
    return rows.reduce((total, row) => total + getValue(row), 0);
  }

  private average(values: number[]) {
    if (!values.length) return 0;
    return values.reduce((total, value) => total + value, 0) / values.length;
  }

  private toNumber(value: string | undefined) {
    return Number(value ?? 0) || 0;
  }
}
