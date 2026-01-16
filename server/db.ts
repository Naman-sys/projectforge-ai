import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

/**
 * Deployment Safety:
 * This database client is designed to handle missing DATABASE_URL gracefully.
 * If no URL is provided (e.g. on Render/Vercel without DB setup),
 * it will still initialize but the storage layer will catch errors.
 */
const databaseUrl = process.env.DATABASE_URL;

export const pool = new Pool({ 
  connectionString: databaseUrl,
  // If no database URL, we don't want to crash on init
  ssl: databaseUrl ? { rejectUnauthorized: false } : false
});

export const db = drizzle(pool, { schema });
