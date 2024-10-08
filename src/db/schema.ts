import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
    pathName: text('pathName').notNull().unique().primaryKey(),
    editorSavedState: text('editorSavedState').notNull(),
    password: text('password'),
    read: integer('read').notNull().default(0),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});