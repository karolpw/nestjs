import { integer, pgTable, varchar, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const postsTable = pgTable("Posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  lead: varchar({ length: 255 }).notNull(),
  content: text("content"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});

