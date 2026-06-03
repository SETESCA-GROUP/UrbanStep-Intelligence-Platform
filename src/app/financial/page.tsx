import { BarChartCard } from "@/components/charts/bar-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/dashboard/section-card";
import { createDashboardService } from "@/services/dashboard.service";

export default async function FinancialDashboardPage() {
  const financial = await createDashboardService().getFinancialDashboard();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dirección financiera"
        title="Dashboard financiero"
        description="Seguimiento del margen, desviaciones y previsión financiera anual."
      />

      <KpiGrid items={financial.metrics} />

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Margen por producto"
          description="SKU con mejor contribución al beneficio bruto."
          data={financial.marginByProduct}
          dataKey="margin"
          labelKey="name"
          color="#ea580c"
        />
        <LineChartCard
          title="Desviaciones mensuales"
          description="Gap entre forecast operativo y realidad financiera."
          data={financial.varianceByMonth}
          lines={[{ dataKey: "value", name: "Desviación", stroke: "#dc2626" }]}
        />
      </div>

      <SectionCard
        title="Forecast financiero"
        description="Escenarios simples preparados para iterar sobre modelos más avanzados."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {financial.financialForecast.map((scenario) => (
            <div key={scenario.name} className="surface rounded-2xl p-5">
              <p className="text-sm font-medium text-slate-500">{scenario.name}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">
                {scenario.value.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-2 text-sm text-slate-500">{scenario.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
