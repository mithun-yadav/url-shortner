import express from "express";
import db from "../db/index.js";
import { usersTable } from "../models/index.js";
import { loginPostRequestBodySchema, signupPostRequestBodySchema } from "../validation/request.validation.js";
import { eq } from "drizzle-orm";
import { hashedPasswordWithSalt } from "../utils/hash.js";
import { getUserByEmail } from "../servies/user.service.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { createUserToken } from "../utils/token.js";
dotenv.config()

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  const { firstName, lastName, email, password } = validationResult.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return res
      .status(400)
      .json({ error: `User with email: ${email} already exists` });

  const { salt, password: hashedPassword } = hashedPasswordWithSalt(password);

  const [user] = await db
    .insert(usersTable)
    .values({ email, firstName, lastName, password: hashedPassword, salt })
    .returning({ id: usersTable.id });

  return res.status(201).json({ data: { userId: user.id } });
});

router.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { email, password } = validationResult.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: `user with email: ${email} does not exist` });
  }
  const { password: hashedPassword } = hashedPasswordWithSalt(password, user.salt)

  if (user.password !== hashedPassword) {
    return res.status(400).json({ error: `invalid credentials` });
  }

  const token = await createUserToken(user.id)
  return res.status(200).json({ data: { userId: user.id, token } });
})

export default router;
