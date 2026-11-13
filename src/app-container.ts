import { container } from "tsyringe";
import type { ChatLanguageModel } from "./core/chat/app/ports/chat-language-model.ts";
import {
  ChatLanguageModelToken,
  GenerateChatResponseToken,
} from "./core/chat/infrastructure/di/tokens.ts";

import { OllamaChatLanguageModel } from "./core/chat/infrastructure/ollama-chat-language-model.ts";
import { GenerateChatResponseControllerToken } from "./server/di/tokens.ts";
import { GenerateChatResponseController } from "./server/controllers/generate-chat-response.controller.ts";
import { GenerateChatResponse } from "./core/chat/app/generate-chat-response.ts";

// CORE
container.register<ChatLanguageModel>(ChatLanguageModelToken, {
  useClass: OllamaChatLanguageModel,
});

container.register<GenerateChatResponse>(GenerateChatResponseToken, {
  useClass: GenerateChatResponse,
});

// SERVER
container.register(GenerateChatResponseControllerToken, {
  useClass: GenerateChatResponseController,
});

export { container as appContainer };
