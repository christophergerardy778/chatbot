import { MessageRole } from "./message-role.ts";

export class Message {
  constructor(
    public readonly chatId: string,
    public readonly role: MessageRole,
    public readonly content: string,
    public readonly sequence: number,
    public readonly created_at: Date
  ) {}

  public static create(
    chatId: string,
    role: MessageRole,
    content: string,
    sequence: number
  ): Message {
    return new Message(chatId, role, content, sequence, new Date());
  }

  public static createFromUser(
    chatId: string,
    content: string,
    sequence: number
  ): Message {
    return Message.create(chatId, MessageRole.USER, content, sequence);
  }

  public static createFromAssistant(
    chatId: string,
    content: string,
    sequence: number
  ): Message {
    return Message.create(chatId, MessageRole.ASSISTANT, content, sequence);
  }
}
