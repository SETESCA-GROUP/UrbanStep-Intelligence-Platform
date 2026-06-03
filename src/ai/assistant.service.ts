import { buildCorporatePrompt } from "@/ai/corporate-prompt";
import { OpenAIService } from "@/ai/openai.service";
import type { ExecutiveDashboardDto } from "@/types/dashboard";

interface AnswerQuestionInput {
  question: string;
  executiveDashboard: ExecutiveDashboardDto;
}

export class AiAssistantService {
  constructor(private readonly openAiService = new OpenAIService()) {}

  async answerQuestion({ question, executiveDashboard }: AnswerQuestionInput) {
    const prompt = `${buildCorporatePrompt(executiveDashboard)}

Pregunta: ${question}`;

    if (this.openAiService.isConfigured) {
      const answer = await this.openAiService.respond(prompt);

      if (answer) {
        return {
          answer,
          mode: "openai",
        };
      }
    }

    return {
      answer: this.buildFallbackAnswer(question, executiveDashboard),
      mode: "mock",
    };
  }

  private buildFallbackAnswer(question: string, executiveDashboard: ExecutiveDashboardDto) {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("margen")) {
      return "El margen mejora gracias al mix de running y ecommerce, pero Amazon y promociones de verano presionan la rentabilidad. La recomendación es revisar descuentos en canales con menor contribución y reforzar categorías con margen superior al 46%.";
    }

    if (lowerQuestion.includes("país")) {
      const topCountry = executiveDashboard.salesByCountry[0];
      return `${topCountry?.name ?? "España"} lidera el crecimiento por volumen y estabilidad de margen. Conviene replicar su mix de canal en Francia y Alemania para escalar sin deteriorar rentabilidad.`;
    }

    if (lowerQuestion.includes("producto") || lowerQuestion.includes("rentabilidad")) {
      const topProduct = executiveDashboard.topProducts[0];
      return `${topProduct?.name ?? "US-RUN-01"} encabeza la rentabilidad por su ticket medio alto y menor presión promocional. Prioriza stock, campañas y bundles sobre esta familia para proteger margen.`;
    }

    if (lowerQuestion.includes("previsi") || lowerQuestion.includes("forecast")) {
      const forecastMetric = executiveDashboard.metrics.find(
        (metric) => metric.title === "Forecast Anual"
      );
      return `La previsión actual apunta a ${forecastMetric?.value ?? "un cierre positivo"}. Para llegar con mayor certidumbre, monitoriza el cierre de Q4 y el cumplimiento por canal en retail partners.`;
    }

    return "Con el contexto actual de demo, la prioridad es consolidar datos CSV en Prisma para profundizar el análisis. Aun así, el negocio muestra crecimiento, buen mix internacional y una base razonable para forecast simple.";
  }
}
