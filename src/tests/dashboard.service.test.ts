import { describe, expect, it } from "vitest";
import { createDashboardService } from "@/services/dashboard.service";

describe("DashboardService", () => {
  it("builds executive KPIs and charts from the mock repository", async () => {
    const service = createDashboardService();
    const executive = await service.getExecutiveDashboard();

    expect(executive.metrics).toHaveLength(5);
    expect(executive.metrics[0]?.title).toBe("Facturación Total");
    expect(executive.salesByCountry[0]).toEqual({ name: "España", value: 1890000 });
    expect(executive.monthlySales).toHaveLength(12);
  });

  it("builds forecast structures for future modelling", async () => {
    const service = createDashboardService();
    const overview = await service.getForecastOverview();

    expect(overview.methods.map((method) => method.name)).toEqual([
      "Regresión lineal",
      "Media móvil",
      "Forecast mensual",
    ]);
    expect(overview.monthlyForecast[0]?.forecast).toBeGreaterThan(0);
  });
});
