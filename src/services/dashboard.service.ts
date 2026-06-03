import { calculateAverageMargin, calculateGrossMarginRevenue } from "@/analytics/insights";
import { ForecastService } from "@/forecasting/forecast.service";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import type { DashboardRepository } from "@/repositories/dashboard.repository";
import { MockDashboardRepository } from "@/repositories/mock-dashboard.repository";
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
    const yoyGrowth = ((totalRevenue - snapshot.previousYearRevenue) / snapshot.previousYearRevenue) * 100;
    const annualForecast = this.forecastService.projectAnnualRevenue(snapshot.monthlyRevenue);

    return {
      metrics: [
        this.createMetric("revenue", "Facturación Total", formatCurrency(totalRevenue), `+${yoyGrowth.toFixed(1)}%`, "Crecimiento acumulado frente a 2025.", "up"),
        this.createMetric("margin", "Margen Bruto", formatCurrency(grossMarginRevenue), `${calculateAverageMargin(snapshot.monthlyRevenue).toFixed(1)}%`, "Margen medio ponderado del ejercicio.", "up"),
        this.createMetric("growth", "Crecimiento YoY", `${yoyGrowth.toFixed(1)}%`, "+6 p.p.", "Aceleración interanual del negocio.", "up"),
        this.createMetric("forecast", "Forecast Anual", formatCurrency(annualForecast), `${Math.round((annualForecast / snapshot.annualRevenueTarget) * 100)}% objetivo`, "Proyección simple sobre ritmo actual.", annualForecast >= snapshot.annualRevenueTarget ? "up" : "stable"),
        this.createMetric("units", "Unidades Vendidas", formatCompactNumber(totalUnits), "+4.8%", "Volumen consolidado en todos los canales.", "up"),
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
  return new DashboardService(new MockDashboardRepository());
}
