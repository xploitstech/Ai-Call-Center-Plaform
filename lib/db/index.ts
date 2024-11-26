import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.POSTGRES_URL!;

// For server-side operations
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// Types
export type DbClient = typeof db;
export * from "@/db/schema"; 