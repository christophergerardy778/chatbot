import type { ChatRole } from "./chat-role.ts";
import type { Chat } from "./chat.ts";

export class ChatMessage {
  constructor(
    public readonly chatId: Chat["chatId"],
    public readonly role: ChatRole,
    public readonly content: string
  ) {}

  public static create(
    chatId: Chat["chatId"],
    role: ChatRole,
    content: string
  ): ChatMessage {
    return new ChatMessage(chatId, role, content);
  }
}
