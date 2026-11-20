import type { Chat } from "../../domain/chat.ts";

export interface ChatRepository {
  add(chat: Chat): Promise<void>;
}
