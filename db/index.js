import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";

const DATABASE_URL = process.env.DATABASE_URL || "8000";

const db = drizzle(DATABASE_URL);
export default db;
