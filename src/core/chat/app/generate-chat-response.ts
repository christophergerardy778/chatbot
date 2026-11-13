import { inject, injectable } from "tsyringe";
import { ChatLanguageModelToken } from "../infrastructure/di/tokens.ts";
import type { ChatLanguageModel } from "./ports/chat-language-model.ts";
import type { ChatUserMessage } from "../domain/chat-user-message.ts";
import { ChatMessage } from "../domain/chat-message.ts";
import { ChatRole } from "../domain/chat-role.ts";

@injectable()
export class GenerateChatResponse {
  constructor(
    @inject(ChatLanguageModelToken)
    private readonly chatLanguageModel: ChatLanguageModel
  ) {}

  public async *execute(
    chatUserMessage: ChatUserMessage
  ): AsyncGenerator<string> {
    let finalMessage = "";

    const chunks = this.chatLanguageModel.generate(chatUserMessage);

    for await (const chunk of chunks) {
      yield chunk;
      finalMessage += chunk;
    }

    // instala Drizzle y conecta la BD
    console.log(
      ChatMessage.create(
        chatUserMessage.chatId,
        ChatRole.ASSISTANT,
        finalMessage
      )
    );
  }
}
