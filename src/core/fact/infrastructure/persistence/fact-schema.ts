import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { chats } from "../../../chat/infrastructure/persistence/chat-schema.js";
import { messages } from "../../../message/infrastructure/persistence/message-schema.js";

export const facts = pgTable("facts", {
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chats.id),
  key: text("key").notNull(),
  value: text("value").notNull(),
  messageId: uuid("message_id")
    .notNull()
    .references(() => messages.id),
});
