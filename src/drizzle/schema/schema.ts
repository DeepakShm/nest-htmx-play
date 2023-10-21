import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const todo = pgTable('todo', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  completed: boolean('completed').default(false),
});

export type NewTodo = typeof todo.$inferInsert;
