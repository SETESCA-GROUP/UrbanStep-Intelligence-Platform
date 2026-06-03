import { BarChartCard } from "@/components/charts/bar-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { PageHeader } from "@/components/dashboard/page-header";
import { createDashboardService } from "@/services/dashboard.service";

export default async function CommercialDashboardPage() {
  const commercial = await createDashboardService().getCommercialDashboard();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dirección comercial"
        title="Dashboard comercial"
        description="Seguimiento del rendimiento de equipo, mercados, objetivos y tendencia mensual."
      />

      <KpiGrid items={commercial.metrics} />

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Ventas por comercial"
          description="Facturación consolidada por responsable comercial."
          data={commercial.salesByManager}
          dataKey="value"
          labelKey="name"
          color="#7c3aed"
        />
        <BarChartCard
          title="Objetivos vs real"
          description="Cumplimiento acumulado frente al objetivo comercial."
          data={commercial.goalsVsActual}
          dataKey="actual"
          labelKey="name"
          color="#2563eb"
          comparisonKey="target"
          comparisonLabel="Objetivo"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Ventas por país"
          description="Países que impulsan el crecimiento comercial."
          data={commercial.salesByCountry}
          dataKey="value"
          labelKey="name"
          color="#0f766e"
        />
        <LineChartCard
          title="Tendencia mensual"
          description="Evolución del ingreso comercial con base mensual."
          data={commercial.monthlyTrend}
          lines={[{ dataKey: "value", name: "Facturación", stroke: "#0f172a" }]}
        />
      </div>
    </div>
  );
}
