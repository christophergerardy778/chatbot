import type { ChatRole } from "./chat-role.ts";
import type { Chat } from "./chat.ts";

export class ChatMessage {
  constructor(
    private chatId: Chat["chatId"],
    private role: ChatRole,
    private content: string
  ) {}

  public static create(
    chatId: Chat["chatId"],
    role: ChatRole,
    content: string
  ): ChatMessage {
    return new ChatMessage(chatId, role, content);
  }

  public message() {
    return {
      chatId: this.chatId,
      role: this.role,
      content: this.content,
    };
  }
}
