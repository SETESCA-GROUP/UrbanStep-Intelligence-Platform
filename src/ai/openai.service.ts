import OpenAI from "openai";

export class OpenAIService {
  private readonly client = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

  get isConfigured() {
    return this.client !== null;
  }

  async respond(prompt: string) {
    if (!this.client) {
      return null;
    }

    const response = await this.client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: prompt,
    });

    return response.output_text;
  }
}
