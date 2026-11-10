import type { ChatMessage } from "../../domain/chat-message.ts";

export interface ChatRepository {
  add(chatMessage: ChatMessage): Promise<void>;
}
