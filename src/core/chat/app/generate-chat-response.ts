import { inject, injectable } from "tsyringe";
import { ChatLanguageModelToken } from "../infrastructure/di/tokens.ts";
import type { ChatLanguageModel } from "./ports/chat-language-model.ts";
import { Message } from "../../message/domain/message.ts";

@injectable()
export class GenerateChatResponse {
  constructor(
    @inject(ChatLanguageModelToken)
    private readonly chatLanguageModel: ChatLanguageModel
  ) {}

  public async *execute(chatUserMessage: Message): AsyncGenerator<string> {
    let finalMessage = "";

    const chunks = this.chatLanguageModel.generate(chatUserMessage);

    for await (const chunk of chunks) {
      yield chunk;
      finalMessage += chunk;
    }

    // instala Drizzle y conecta la BD
    console.log(
      Message.createFromAssistant(chatUserMessage.chatId, finalMessage, 0)
    );
  }
}
