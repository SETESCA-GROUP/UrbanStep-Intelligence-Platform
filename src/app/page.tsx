import { BarChartCard } from "@/components/charts/bar-chart-card";
import { DonutChartCard } from "@/components/charts/donut-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { PageHeader } from "@/components/dashboard/page-header";
import { createDashboardService } from "@/services/dashboard.service";

export default async function ExecutiveDashboardPage() {
  const dashboardService = createDashboardService();
  const executive = await dashboardService.getExecutiveDashboard();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CEO dashboard"
        title="UrbanStep Footwear Executive Dashboard"
        description="Visión ejecutiva de revenue, margen, unidades y crecimiento YoY con datos leídos directamente desde CSV."
      />

      <KpiGrid items={executive.metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <LineChartCard
          title="Revenue by Month"
          description="Facturación y unidades vendidas en 2026."
          data={executive.monthlySales}
          lines={[
            { dataKey: "revenue", name: "Revenue", stroke: "#0f172a" },
            { dataKey: "units", name: "Units", stroke: "#0ea5e9" },
          ]}
        />
        <DonutChartCard
          title="Revenue by Channel"
          description="Distribución de ingresos por canal."
          data={executive.salesByChannel}
          dataKey="value"
          nameKey="name"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Revenue by Country"
          description="Contribución de cada mercado al negocio."
          data={executive.salesByCountry}
          dataKey="value"
          labelKey="name"
          color="#1d4ed8"
        />
        <BarChartCard
          title="Top Products"
          description="Productos con mejor desempeño por revenue."
          data={executive.topProducts}
          dataKey="value"
          labelKey="name"
          color="#0f766e"
        />
      </div>
    </div>
  );
}
