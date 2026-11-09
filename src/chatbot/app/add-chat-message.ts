import { ChatRole } from "../domain/chat-role.ts";
import { ChatMessage } from "../domain/chat-message.ts";
import type { ChatRepository } from "../domain/chat-repository.ts";

export class AddChatMessage {
  constructor(private readonly chatRepository: ChatRepository) {}

  public async execute() {
    this.chatRepository.add(
      ChatMessage.create("", ChatRole.USER, "Hello, how are you?")
    );
  }
}
