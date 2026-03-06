import { integer, pgTable, varchar, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const postsTable = pgTable("Posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  lead: varchar({ length: 255 }).notNull(),
  content: text("content"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});

export const usersTable = pgTable("Users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar({ length:255 }).notNull(),
  password: varchar("password", { length:255 }).notNull()
})

