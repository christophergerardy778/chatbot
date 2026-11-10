import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { streamSSE } from "hono/streaming";
import { appContainer } from "../app-container.ts";
import type { ChatLanguageModel } from "../core/chat/app/ports/chat-language-model.ts";

export const startServer = async () => {
  const app = new Hono();

  app.get("/", (c) => {
    const chatModel =
      appContainer.resolve<ChatLanguageModel>("ChatLanguageModel");

    return streamSSE(c, async (stream) => {
      try {
        let finalMessage = "";

        for await (const message of chatModel.generate()) {
          finalMessage += message;

          await stream.writeSSE({
            event: "chunk",
            data: JSON.stringify(message),
          });
        }

        await stream.writeSSE({ event: "done", data: "{}" });

        console.log(finalMessage);
      } catch (error) {
        await stream.writeSSE({
          event: "error",
          data: error instanceof Error ? error.message : String(error),
        });
      }
    });
  });

  serve({
    fetch: app.fetch,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  });
};
