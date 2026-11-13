import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { GenerateChatResponseControllerToken } from "../di/tokens.ts";
import { type DependencyContainer } from "tsyringe";
import type { GenerateChatResponseController } from "../controllers/generate-chat-response.controller.ts";
import { generateChatResponseInputSchema } from "common";
import { validationErrorHandler } from "../middlewares/validation-error-handler.ts";

export const createChatRouter = (container: DependencyContainer) => {
  const router = new Hono();

  const generateChatReponseController =
    container.resolve<GenerateChatResponseController>(
      GenerateChatResponseControllerToken
    );

  router.post(
    "/",
    zValidator("json", generateChatResponseInputSchema, validationErrorHandler),
    (context) => generateChatReponseController.send(context)
  );

  return router;
};
