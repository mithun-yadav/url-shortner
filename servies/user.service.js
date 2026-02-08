import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";

/**
 * @param {string} email
 * @returns {Promise<{ id: string, firstName: string, lastName: string | null, email: string, salt: string, password: string } | undefined>}
 */
export async function getUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
}
