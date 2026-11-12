import { inject, injectable } from "tsyringe";
import type { Context } from "hono";
import { streamSSE } from "hono/streaming";

import { ChatUserMessage } from "../../core/chat/domain/chat-user-message.ts";
import { ChatLanguageModelToken } from "../../core/chat/infrastructure/di/tokens.ts";
import type { ChatLanguageModel } from "../../core/chat/app/ports/chat-language-model.ts";

@injectable()
export class GenerateChatResponseController {
  constructor(
    @inject(ChatLanguageModelToken)
    private readonly chatLanguageModel: ChatLanguageModel
  ) {}

  async send(context: Context) {
    let finalMessage = "";
    const body = await context.req.json();
    const chatMessage = ChatUserMessage.create(body.chatId, body.content);

    return streamSSE(context, async (stream) => {
      const chunks = this.chatLanguageModel.generate(chatMessage);

      for await (const chunk of chunks) {
        finalMessage += chunk;

        stream.writeSSE({
          data: chunk,
          event: "chunk",
        });
      }

      console.log(finalMessage);
    });
  }
}
