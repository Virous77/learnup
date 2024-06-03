import { sql } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid('id').primaryKey().unique().defaultRandom(),
  email: varchar('email').notNull().unique(),
  name: varchar('name'),
  image: varchar('image'),
  created_at: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updated_at: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
  password: varchar('password').notNull(),
  isVerified: boolean('isVerified').default(false).notNull(),
  user_name: varchar('userName').notNull(),
  bio: varchar('bio'),
  isDeleted: boolean('isDeleted').default(false).notNull(),
  visibleName: varchar('visibleName'),
});

export const workspaceVisibilityType = pgEnum('workspaceVisibility', [
  'public',
  'private',
]);

export const workspace = pgTable('workspace', {
  id: uuid('id').primaryKey().unique().defaultRandom(),
  workspaceName: varchar('workspaceName').notNull().unique(),
  created_at: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updated_at: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
  isDeleted: boolean('isDeleted').default(false).notNull(),
  inviteId: varchar('inviteId').notNull().unique(),
  description: varchar('description'),
  workspaceImage: varchar('workspaceImage'),
  workspaceType: varchar('workspaceType').notNull(),
  workspaceOwner: uuid('workspaceOwner')
    .notNull()
    .references(() => user.id),
  workspaceVisibility: workspaceVisibilityType('workspaceVisibility').notNull(),
  workspaceMembers: uuid('workspaceMembers')
    .array()
    .default(sql`'{}'::uuid[]`),
});

export const board = pgTable('board', {
  id: uuid('id').primaryKey().unique().defaultRandom(),
  boardName: varchar('boardName').notNull().unique(),
  created_at: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updated_at: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
  isDeleted: boolean('isDeleted').default(false).notNull(),
  workspaceId: uuid('workspaceId')
    .notNull()
    .references(() => workspace.id),
  boardMembers: uuid('boardMembers')
    .array()
    .default(sql`'{}'::uuid[]`),
  boardOwner: uuid('boardOwner')
    .notNull()
    .references(() => user.id),
});

export const task = pgTable('task', {
  id: uuid('id').primaryKey().unique().defaultRandom(),
  taskName: varchar('taskName').notNull(),
  created_at: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updated_at: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
  isDeleted: boolean('isDeleted').default(false).notNull(),
  boardId: uuid('boardId')
    .notNull()
    .references(() => board.id),
});

export type IUser = typeof user.$inferSelect;
export type IWorkspace = typeof workspace.$inferSelect;
export type IBoard = typeof board.$inferSelect;
export type ITask = typeof task.$inferSelect;
