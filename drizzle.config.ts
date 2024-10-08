import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './migrations',
    dialect: 'sqlite',
    driver: 'turso',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
      authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,
    },
  });