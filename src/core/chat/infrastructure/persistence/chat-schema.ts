import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const chats = pgTable("chats", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").notNull(),
  name: text("name").notNull(),
  summary: text("summary").notNull().default(""),
  nextSequence: integer("next_sequence").notNull().default(0),
  factsUntilSequence: integer("facts_until_sequence").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
