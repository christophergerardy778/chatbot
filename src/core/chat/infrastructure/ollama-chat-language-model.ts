import { Ollama } from "ollama";
import { injectable } from "tsyringe";
import type { ChatMessage } from "../domain/chat-message.ts";
import type { ChatLanguageModel } from "../app/ports/chat-language-model.ts";

@injectable()
export class OllamaChatLanguageModel implements ChatLanguageModel {
  private readonly ollama: Ollama;

  constructor() {
    this.ollama = new Ollama();
  }

  async *generate(chatMessage: ChatMessage): AsyncIterable<string> {
    const response = await this.ollama.chat({
      stream: true,
      messages: [
        {
          role: "system",
          content: "Eres un asistente IA en un chat",
        },
        {
          role: chatMessage.role,
          content: chatMessage.content,
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
