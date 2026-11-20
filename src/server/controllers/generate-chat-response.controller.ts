import type { Context } from "hono";
import type { GenerateChatResponseInput } from "common";
import type { GenerateChatResponse } from "../../core/chat/app/generate-chat-response.ts";

import { streamSSE } from "hono/streaming";
import { inject, injectable } from "tsyringe";
import { Message } from "../../core/message/domain/message.ts";
import { GenerateChatResponseToken } from "../../core/chat/infrastructure/di/tokens.ts";

@injectable()
export class GenerateChatResponseController {
  constructor(
    @inject(GenerateChatResponseToken)
    private readonly generateChatResponse: GenerateChatResponse
  ) {}

  async send(context: Context) {
    const body = await context.req.json<GenerateChatResponseInput>();
    const chatMessage = Message.createFromUser(body.chatId, body.content, 0);

    return streamSSE(context, async (stream) => {
      const chunks = this.generateChatResponse.execute(chatMessage);

      for await (const chunk of chunks) {
        stream.writeSSE({
          data: chunk,
          event: "chunk",
        });
      }
    });
  }
}
