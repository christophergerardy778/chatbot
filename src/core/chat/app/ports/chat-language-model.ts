import type { ChatMessage } from "../../domain/chat-message.ts";
export interface ChatLanguageModel {
  generate(chatMessage: ChatMessage): AsyncIterable<string>;
}
