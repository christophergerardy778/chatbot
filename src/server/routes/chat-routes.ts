import { Hono } from "hono";
import { type DependencyContainer } from "tsyringe";
import type { GenerateChatResponseController } from "../controllers/generate-chat-response.controller.ts";
import { GenerateChatResponseControllerToken } from "../di/tokens.ts";

export const createChatRouter = (container: DependencyContainer) => {
  const router = new Hono();

  const generateChatReponseController =
    container.resolve<GenerateChatResponseController>(
      GenerateChatResponseControllerToken
    );

  router.post("/", (context) => generateChatReponseController.send(context));

  return router;
};
