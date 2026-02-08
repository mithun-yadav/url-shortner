import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validation/token.validation.js";
const JWT_SECRET = process.env.JWT_SECRET || ""

/**
 * @param {string | object} payload
 * @returns {Promise<string>}
 */
export async function createUserToken(payload) {
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if (validationResult.error) {
        throw new Error(validationResult.error.message)
    }

    const payloadValidateData = validationResult.data


    const token = jwt.sign(payloadValidateData, JWT_SECRET, { expiresIn: "1h" })
    return token
}