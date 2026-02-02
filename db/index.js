import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";

// Provide a sensible default so running locally without a .env still
// gives a clear error (or connects to a local container-bound Postgres).
const DEFAULT_DATABASE_URL =
  process.env.DEFAULT_DATABASE_URL ||
  "postgres://postgres:admin@127.0.0.1:5432/postgres";

const DATABASE_URL = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

console.log("Using DATABASE_URL:", DATABASE_URL);

const db = drizzle(DATABASE_URL);
export default db;
