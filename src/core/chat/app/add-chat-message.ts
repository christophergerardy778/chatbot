import { MessageRole } from "../../message/domain/message-role.ts";
import { Message } from "../../message/domain/message.ts";
import type { MessageRepository } from "../../message/app/ports/message-repository.ts";

export class AddChatMessage {
  constructor(private readonly messageRepository: MessageRepository) {}

  public async execute() {
    await this.messageRepository.add(
      Message.create("", MessageRole.USER, "Hello, how are you?", 0)
    );
  }
}
