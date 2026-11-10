import { container } from "tsyringe";
import { OllamaChatLanguageModel } from "./core/chat/infrastructure/ollama-chat-language-model.ts";

container.register("ChatLanguageModel", { useClass: OllamaChatLanguageModel });

export { container as appContainer };
