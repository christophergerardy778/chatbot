import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { appContainer } from "../app-container.ts";
import { createChatRouter } from "./routes/chat-routes.ts";

export const startServer = async () => {
  const app = new Hono();

  app.route("/chat", createChatRouter(appContainer));

  serve({
    fetch: app.fetch,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  });
};
