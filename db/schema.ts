import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    email: varchar("email").notNull().unique(),
    name: varchar("name"),
    image: varchar("image"),
    created_at: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updated_at: timestamp("updated_at")
      .default(sql`now()`)
      .notNull(),
    password: varchar("password").notNull(),
    isVerified: boolean("isVerified").default(false).notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  }
);

export type IUser = typeof user.$inferSelect;
