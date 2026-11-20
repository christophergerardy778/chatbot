import type { Message } from "../../../message/domain/message.ts";

export interface ChatLanguageModel {
  generate(message: Message): AsyncIterable<string>;
}
