import { BarChartCard } from "@/components/charts/bar-chart-card";
import { DonutChartCard } from "@/components/charts/donut-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/dashboard/section-card";
import { createDashboardService } from "@/services/dashboard.service";

export default async function ExecutiveDashboardPage() {
  const dashboardService = createDashboardService();
  const executive = await dashboardService.getExecutiveDashboard();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CEO dashboard"
        title="Dashboard ejecutivo"
        description="Visión consolidada de crecimiento, rentabilidad y mix comercial para UrbanStep Footwear."
      />

      <KpiGrid items={executive.metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <LineChartCard
          title="Evolución mensual"
          description="Facturación y unidades vendidas en 2026."
          data={executive.monthlySales}
          lines={[
            { dataKey: "revenue", name: "Facturación", stroke: "#0f172a" },
            { dataKey: "units", name: "Unidades", stroke: "#0ea5e9" },
          ]}
        />
        <DonutChartCard
          title="Ventas por canal"
          description="Distribución de ingresos por canal."
          data={executive.salesByChannel}
          dataKey="value"
          nameKey="name"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Ventas por país"
          description="Contribución de cada mercado al negocio."
          data={executive.salesByCountry}
          dataKey="value"
          labelKey="name"
          color="#1d4ed8"
        />
        <BarChartCard
          title="Top productos"
          description="SKU con mejor desempeño en ingresos."
          data={executive.topProducts}
          dataKey="value"
          labelKey="name"
          color="#0f766e"
        />
      </div>

      <SectionCard
        title="Rentabilidad por categoría"
        description="Margen medio por familia de producto para priorizar el portfolio."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {executive.categoryProfitability.map((item) => (
            <div
              key={item.name}
              className="surface rounded-2xl p-5"
            >
              <p className="text-sm font-medium text-slate-500">{item.name}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">
                {item.margin.toFixed(1)}%
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Facturación {item.value.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
