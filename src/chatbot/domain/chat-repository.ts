import type { ChatMessage } from "./chat-message.ts";

export interface ChatRepository {
  add(chatMessage: ChatMessage): Promise<void>;
}
