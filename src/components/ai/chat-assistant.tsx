"use client";

import { useState } from "react";
import { Bot, LoaderCircle, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ChatAssistantProps {
  quickQuestions: string[];
  snapshot: string;
}

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

export function ChatAssistant({ quickQuestions, snapshot }: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hola, soy el asistente de UrbanStep. Tengo cargado este contexto inicial: ${snapshot}.`,
    },
  ]);
  const [input, setInput] = useState(quickQuestions[0] ?? "");
  const [loading, setLoading] = useState(false);

  const submitPrompt = async (prompt: string) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setMessages((current) => [...current, { role: "user", content: prompt }]);
    setInput("");

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer ?? "No he podido generar una respuesta en este momento.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "No he podido conectar con el servicio IA. Revisa la configuración de OpenAI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-slate-950">Chat UI</CardTitle>
          <p className="text-sm text-slate-500">
            Usa OpenAI cuando haya credenciales y modo mock cuando no existan variables de entorno.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[420px] space-y-4 overflow-y-auto rounded-2xl bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-3 rounded-2xl p-4 ${
                  message.role === "assistant" ? "bg-white" : "bg-sky-50"
                }`}
              >
                <div className="mt-1">
                  {message.role === "assistant" ? (
                    <Bot className="h-5 w-5 text-sky-600" />
                  ) : (
                    <User className="h-5 w-5 text-slate-600" />
                  )}
                </div>
                <p className="text-sm leading-6 text-slate-600">{message.content}</p>
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm text-slate-500">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Generando respuesta...
              </div>
            ) : null}
          </div>
          <div className="space-y-3">
            <Textarea
              placeholder="Pregunta por países, margen, rentabilidad o forecast..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={4}
            />
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => void submitPrompt(input)} disabled={loading}>
                Enviar consulta
              </Button>
              {quickQuestions.map((question) => (
                <Button
                  key={question}
                  variant="secondary"
                  onClick={() => void submitPrompt(question)}
                  disabled={loading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-slate-950">
            <Sparkles className="h-4 w-4 text-sky-600" />
            Prompt corporativo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
          <p>
            - Habla como asesor de negocio para CEO, Director Comercial y Director Financiero.
          </p>
          <p>- Explica causas, riesgos y siguientes acciones recomendadas.</p>
          <p>- Prioriza precisión, trazabilidad y lenguaje ejecutivo.</p>
          <p>- Usa el contexto de mock data como base hasta conectar CSV + Prisma.</p>
        </CardContent>
      </Card>
    </div>
  );
}
