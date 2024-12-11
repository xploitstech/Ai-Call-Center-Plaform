import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from 'pg';
import * as schema from "@/db/schema";
import { logger } from "@/lib/utils/logger";

const connectionString = process.env.DATABASE_URL!;

// Create a PostgreSQL pool with pg
const pool = new Pool({
  connectionString,
});

// Add error handling for the pool
pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
});

// For server-side operations
export const db = drizzle(pool, { schema });

// Types
export type DbClient = typeof db;
export * from "@/db/schema"; 