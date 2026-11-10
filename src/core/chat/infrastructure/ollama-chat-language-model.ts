import { Ollama } from "ollama";
import { injectable } from "tsyringe";
import type { ChatLanguageModel } from "../app/ports/chat-language-model.ts";

@injectable()
export class OllamaChatLanguageModel implements ChatLanguageModel {
  private readonly ollama: Ollama;

  constructor() {
    this.ollama = new Ollama();
  }

  async *generate(): AsyncIterable<string> {
    const response = await this.ollama.chat({
      stream: true,
      messages: [
        {
          role: "system",
          content: "Cuentame un cuento corto",
        },
      ],
      model: process.env.OLLAMA_MODEL || "llama3.1:8b",
      think: process.env.OLLAMA_THINK === "true" || false,
    });

    for await (const part of response) {
      yield part.message.content;
    }
  }
}
