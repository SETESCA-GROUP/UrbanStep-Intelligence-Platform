import type { ExecutiveDashboardDto } from "@/types/dashboard";

export function buildCorporatePrompt(executiveDashboard: ExecutiveDashboardDto) {
  const metrics = executiveDashboard.metrics
    .map((metric) => `- ${metric.title}: ${metric.value} (${metric.changeLabel})`)
    .join("\n");

  return `Eres el asistente corporativo de UrbanStep Footwear.
Hablas para CEO, Director Comercial y Director Financiero.
Prioriza precision, trazabilidad, lenguaje ejecutivo y recomendaciones accionables.
Usa exclusivamente el contexto disponible y reconoce cuando algo es mock/demo.

Contexto actual:
${metrics}`;
}
