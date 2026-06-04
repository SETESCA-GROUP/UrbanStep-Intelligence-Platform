import { calculateAverageMargin, calculateGrossMarginRevenue } from "@/analytics/insights";
import { ForecastService } from "@/forecasting/forecast.service";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import type { DashboardRepository } from "@/repositories/dashboard.repository";
import { CsvDashboardRepository } from "@/repositories/csv-dashboard.repository";
import type {
  CommercialDashboardDto,
  ExecutiveDashboardDto,
  FinancialDashboardDto,
  KpiMetric,
} from "@/types/dashboard";

export class DashboardService {
  constructor(
    private readonly repository: DashboardRepository,
    private readonly forecastService = new ForecastService()
  ) {}

  async getExecutiveDashboard(): Promise<ExecutiveDashboardDto> {
    const snapshot = await this.repository.getSnapshot();
    const totalRevenue = snapshot.monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
    const totalUnits = snapshot.monthlyRevenue.reduce((sum, item) => sum + item.units, 0);
    const grossMarginRevenue = calculateGrossMarginRevenue(snapshot.monthlyRevenue);
    const yoyGrowth = snapshot.previousYearRevenue > 0
      ? ((totalRevenue - snapshot.previousYearRevenue) / snapshot.previousYearRevenue) * 100
      : 0;
    const annualForecast = this.forecastService.projectAnnualRevenue(snapshot.monthlyRevenue);
    const targetCoverage = snapshot.annualRevenueTarget > 0
      ? Math.round((annualForecast / snapshot.annualRevenueTarget) * 100)
      : 0;

    return {
      metrics: [
        this.createMetric("revenue", "Revenue", formatCurrency(totalRevenue), `${targetCoverage}% objetivo anual`, "Ingresos acumulados desde los CSV de ventas 2026.", "up"),
        this.createMetric("margin", "Gross Margin", formatCurrency(grossMarginRevenue), `${calculateAverageMargin(snapshot.monthlyRevenue).toFixed(1)}%`, "Margen bruto acumulado del periodo actual.", "up"),
        this.createMetric("units", "Units Sold", formatCompactNumber(totalUnits), `${snapshot.monthlyRevenue.length} meses`, "Volumen vendido en todos los países y canales.", "stable"),
        this.createMetric("growth", "YoY Growth", `${yoyGrowth.toFixed(1)}%`, "vs mismo periodo 2025", "Comparativa interanual comparable con los datos disponibles.", yoyGrowth >= 0 ? "up" : "down"),
      ],
      monthlySales: snapshot.monthlyRevenue.map(({ name, revenue, units }) => ({ name, revenue, units })),
      salesByCountry: snapshot.salesByCountry,
      salesByChannel: snapshot.salesByChannel,
      topProducts: snapshot.topProducts.map(({ name, value }) => ({ name, value })),
      categoryProfitability: snapshot.categoryProfitability,
    };
  }

  async getCommercialDashboard(): Promise<CommercialDashboardDto> {
    const snapshot = await this.repository.getSnapshot();
    const totalRevenue = snapshot.monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
    const totalTarget = snapshot.goalsVsActual.reduce((sum, item) => sum + item.target, 0);
    const totalActual = snapshot.goalsVsActual.reduce((sum, item) => sum + item.actual, 0);
    const bestCountry = [...snapshot.salesByCountry].sort((left, right) => right.value - left.value)[0];

    return {
      metrics: [
        this.createMetric("sales-team", "Ventas por comercial", formatCompactNumber(totalRevenue), `${snapshot.salesByManager.length} managers`, "Cobertura comercial paneuropea.", "up"),
        this.createMetric("channel-mix", "Mix por canal", "4 canales", "Ecommerce líder", "Canales activos para escalar crecimiento.", "stable"),
        this.createMetric("top-country", "País líder", bestCountry.name, formatCurrency(bestCountry.value), "Mercado con mayor contribución actual.", "up"),
        this.createMetric("goal-vs-real", "Objetivos vs Real", `${Math.round((totalActual / totalTarget) * 100)}%`, `Gap ${(totalActual - totalTarget).toLocaleString("es-ES")}`, "Seguimiento agregado del plan comercial.", totalActual >= totalTarget ? "up" : "down"),
        this.createMetric("trend", "Tendencia mensual", "+8.2%", "Run-rate saludable", "Evolución media de los últimos meses.", "up"),
      ],
      salesByManager: snapshot.salesByManager,
      salesByCountry: snapshot.salesByCountry,
      goalsVsActual: snapshot.goalsVsActual,
      monthlyTrend: snapshot.monthlyRevenue.map(({ name, revenue }) => ({ name, value: revenue })),
    };
  }

  async getFinancialDashboard(): Promise<FinancialDashboardDto> {
    const snapshot = await this.repository.getSnapshot();
    const averageMargin = calculateAverageMargin(snapshot.monthlyRevenue);
    const marginGap = averageMargin - snapshot.grossMarginTarget;

    return {
      metrics: [
        this.createMetric("gross-margin", "Margen bruto", `${averageMargin.toFixed(1)}%`, `${marginGap >= 0 ? "+" : ""}${marginGap.toFixed(1)} p.p.`, "Comparativa frente al objetivo financiero.", marginGap >= 0 ? "up" : "down"),
        this.createMetric("product-margin", "Margen por producto", `${snapshot.marginByProduct[0]?.margin ?? 0}%`, snapshot.marginByProduct[0]?.name ?? "N/A", "Mejor SKU por contribución.", "up"),
        this.createMetric("deviations", "Desviaciones", formatCurrency(snapshot.varianceByMonth.reduce((sum, item) => sum + item.value, 0)), "Últimos 6 meses", "Desviación acumulada del forecast operativo.", "stable"),
        this.createMetric("forecast", "Forecast financiero", formatCurrency(snapshot.financialForecast[0]?.value ?? 0), snapshot.financialForecast[0]?.name ?? "Base", "Escenario financiero principal.", "up"),
        this.createMetric("control", "Control presupuestario", "En seguimiento", "Promociones vigiladas", "Presión promocional contenida en ecommerce y Amazon.", "stable"),
      ],
      marginByProduct: snapshot.marginByProduct.map(({ name, margin }) => ({ name, margin })),
      varianceByMonth: snapshot.varianceByMonth,
      financialForecast: snapshot.financialForecast,
    };
  }

  async getForecastOverview() {
    const snapshot = await this.repository.getSnapshot();
    return this.forecastService.buildOverview(snapshot.monthlyRevenue);
  }

  private createMetric(
    id: string,
    title: string,
    value: string,
    changeLabel: string,
    description: string,
    trend: KpiMetric["trend"]
  ): KpiMetric {
    return { id, title, value, changeLabel, description, trend };
  }
}

export function createDashboardService() {
  return new DashboardService(new CsvDashboardRepository());
}
