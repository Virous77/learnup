import { sql } from "drizzle-orm";
import { text, boolean, pgTable, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey().notNull().unique(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  image: text("image"),
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at").default(sql`now()`),
  password: text("password").notNull(),
  isVerified: boolean("isVerified").default(false),
});
