import { ChatAssistant } from "@/components/ai/chat-assistant";
import { PageHeader } from "@/components/dashboard/page-header";
import { createDashboardService } from "@/services/dashboard.service";

export default async function AiAssistantPage() {
  const executive = await createDashboardService().getExecutiveDashboard();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI assistant"
        title="Asistente IA"
        description="Chat preparado para OpenAI con contexto corporativo y métricas mock del negocio."
      />
      <ChatAssistant
        quickQuestions={[
          "¿Por qué cae el margen?",
          "¿Qué países impulsan el crecimiento?",
          "¿Qué productos tienen mejor rentabilidad?",
          "¿Cuál es la previsión para final de año?",
        ]}
        snapshot={executive.metrics.map((metric) => `${metric.title}: ${metric.value}`).join(" · ")}
      />
    </div>
  );
}
