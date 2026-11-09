import { Hono } from "hono";
import { serve } from "@hono/node-server";

export const startServer = async () => {
  const app = new Hono();

  app.get("/", (c) => {
    return c.json({ message: "Hello, World!" });
  });

  serve({
    fetch: app.fetch,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  });
};
