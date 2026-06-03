import type { MonthlyRevenueRecord } from "@/types/domain";
import type { ForecastMethod, ForecastOverviewDto } from "@/types/forecast";

export class ForecastService {
  projectAnnualRevenue(records: MonthlyRevenueRecord[]) {
    const total = records.reduce((sum, item) => sum + item.revenue, 0);
    return Math.round(total * 1.035);
  }

  buildOverview(records: MonthlyRevenueRecord[]): ForecastOverviewDto {
    const movingAverage = this.calculateMovingAverage(records, 3);

    return {
      methods: this.getPreparedMethods(),
      monthlyForecast: records.map((record, index) => ({
        name: record.name,
        actual: record.revenue,
        forecast: movingAverage[index] ?? record.revenue,
      })),
    };
  }

  private calculateMovingAverage(records: MonthlyRevenueRecord[], windowSize: number) {
    return records.map((_, index) => {
      const start = Math.max(0, index - windowSize + 1);
      const window = records.slice(start, index + 1);
      const average = window.reduce((sum, item) => sum + item.revenue, 0) / window.length;
      return Math.round(average);
    });
  }

  private getPreparedMethods(): ForecastMethod[] {
    return [
      {
        name: "Regresión lineal",
        status: "Preparado",
        description: "Contrato inicial para estimar tendencia cuando exista más histórico consolidado.",
        note: "Pendiente de añadir features de estacionalidad y promociones.",
      },
      {
        name: "Media móvil",
        status: "Activo",
        description: "Cálculo simple de referencia para demo y validación de hipótesis.",
        note: "Usa una ventana móvil corta para mantener una señal interpretable.",
      },
      {
        name: "Forecast mensual",
        status: "Preparado",
        description: "DTO y visualización listos para conectar modelos más avanzados.",
        note: "Pensado para combinar datos de ventas, objetivos y calendario comercial.",
      },
    ];
  }
}
