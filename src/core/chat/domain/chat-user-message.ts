import type { Chat } from "./chat.ts";
import { ChatRole } from "./chat-role.ts";
import { ChatMessage } from "./chat-message.ts";

export class ChatUserMessage extends ChatMessage {
  constructor(chatId: Chat["chatId"], content: string) {
    super(chatId, ChatRole.USER, content);
  }

  public static create(chatId: Chat["chatId"], content: string) {
    return new ChatUserMessage(chatId, content);
  }
}
