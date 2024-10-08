import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

if (!process.env.NEXT_PUBLIC_TURSO_DATABASE_URL || !process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN) {
    throw new Error('NEXT_PUBLIC_TURSO_DATABASE_URL or NEXT_PUBLIC_TURSO_AUTH_TOKEN environment variable is not set');
}

  const client = createClient({
    url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
  });

export const db = drizzle(client);
