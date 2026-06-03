import { LineChartCard } from "@/components/charts/line-chart-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/dashboard/section-card";
import { createDashboardService } from "@/services/dashboard.service";

export default async function ForecastPage() {
  const forecast = await createDashboardService().getForecastOverview();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Forecast module"
        title="Forecast mensual"
        description="Base preparada para modelos de regresión lineal, media móvil y forecast mensual."
      />

      <LineChartCard
        title="Serie forecast mensual"
        description="Estructura inicial de predicción sobre la evolución del negocio."
        data={forecast.monthlyForecast}
        lines={[
          { dataKey: "actual", name: "Actual", stroke: "#0f172a" },
          { dataKey: "forecast", name: "Forecast", stroke: "#0ea5e9" },
        ]}
      />

      <SectionCard
        title="Métodos preparados"
        description="Estado y propósito de los componentes de forecasting listos para evolucionar."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {forecast.methods.map((method) => (
            <div key={method.name} className="surface rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-slate-950">{method.name}</p>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  {method.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-500">{method.description}</p>
              <p className="mt-6 text-sm font-medium text-slate-700">{method.note}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
