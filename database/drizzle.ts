import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// const connectionString = process.env.DATABASE_URL!;

const connectionString =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_DATABASE_URL!
    : process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(connectionString);
export const db = drizzle(sql);
