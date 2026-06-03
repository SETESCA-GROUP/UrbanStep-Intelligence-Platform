import { NextResponse } from "next/server";
import { AiAssistantService } from "@/ai/assistant.service";
import { chatRequestSchema } from "@/ai/assistant.schema";
import { createDashboardService } from "@/services/dashboard.service";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = chatRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid chat payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const executive = await createDashboardService().getExecutiveDashboard();
  const service = new AiAssistantService();
  const response = await service.answerQuestion({
    question: parsed.data.message,
    executiveDashboard: executive,
  });

  return NextResponse.json(response);
}
