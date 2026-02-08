import { createHmac, randomBytes } from "node:crypto";

/**
 * @param {string} password
 */
export function hashedPasswordWithSalt(password, userSalt = '') {
  const salt = userSalt ? userSalt : randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { salt, password: hashedPassword };
}
