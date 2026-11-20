import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import { chats } from "../../../chat/infrastructure/persistence/chat-schema.js";

export const messageRoles = pgEnum("message_role", [
  "system",
  "user",
  "assistant",
]);

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chats.id),
  role: messageRoles("role").notNull(),
  content: text("content").notNull(),
  sequence: integer("sequence").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
