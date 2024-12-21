import { pgTable, serial, text, timestamp, varchar, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Create a function to generate UUIDs
const generateUUID = sql`uuid_generate_v4()`;

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(generateUUID),
  name: varchar("name", { length: 255 }),
  email: text("email").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const agents = pgTable("agents", {
  agent_id: serial("agent_id").primaryKey(),
  user_id: uuid("user_id").references(() => users.id),
  name: varchar("name", { length: 255 }),
  system_prompt: text("system_prompt").default("Lorem Ipsum"),
  greeting_message: text("greeting_message").default("Lorem Ipsum"),
  language: text("language").array().notNull(),
  integration: text("integration").array(),
  voice: varchar("voice", { length: 50 }),
  debug_mode: boolean("debug_mode").default(false),
  logging_enabled: boolean("logging_enabled").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert; 