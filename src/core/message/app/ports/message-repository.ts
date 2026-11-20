import type { Message } from "../../domain/message.ts";

export interface MessageRepository {
  add(message: Message): Promise<void>;
}
