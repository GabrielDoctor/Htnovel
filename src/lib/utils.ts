import jwt from "jsonwebtoken";
import { User } from "./auth";
import sql from "./db";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const createToken = (
  userId: string,
  secret: string,
  expiresIn: string | number
) => {
  const payload = { id: userId };
  return jwt.sign(payload, secret, { expiresIn });
};

export const createAuthHeaders = async (userId: string) => {
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) return null;

  const ACCESS_TOKEN = createToken(userId, ACCESS_TOKEN_SECRET, "1h"); // 1 hour
  const REFRESH_TOKEN = createToken(userId, REFRESH_TOKEN_SECRET, "90d"); // 90 days

  const setCookieHeader = `ACCESS_TOKEN=${ACCESS_TOKEN}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${
    60 * 60
  },REFRESH_TOKEN=${REFRESH_TOKEN}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${
    60 * 60 * 24 * 90
  }`;
  try {
    const query = await sql`
    INSERT INTO refresh_tokens (token, user_id, expires_at)
    VALUES (${REFRESH_TOKEN}, ${userId}, NOW() + INTERVAL '90 days')
    ON CONFLICT (user_id) DO UPDATE
    SET token = ${REFRESH_TOKEN}, expires_at = NOW() + INTERVAL '90 days'
    RETURNING id;
`;

    if (!query || query.count === 0) {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    "Set-Cookie": setCookieHeader,
  };
  return headers;
};
export const verifyToken = (
  token: string,
  type: "ACCESS_TOKEN" | "REFRESH_TOKEN"
) => {
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
    return { valid: false, expired: false, decoded: null };
  if (type === "ACCESS_TOKEN") {
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
      return {
        valid: true,
        expired: false,
        decoded: JSON.parse(JSON.stringify(decoded)),
      };
    } catch (error) {
      // Token verification failed
      if (error instanceof jwt.TokenExpiredError) {
        // Token is expired
        return { valid: false, expired: true, decoded: null };
      } else {
        // Some other error
        return { valid: false, expired: false, decoded: null };
      }
    }
  } else if (type === "REFRESH_TOKEN") {
    try {
      // Verify the token using the secret or public key
      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

      // The token is valid and not expired
      return {
        valid: true,
        expired: false,
        decoded: JSON.parse(JSON.stringify(decoded)),
      };
    } catch (error) {
      // Token verification failed
      if (error instanceof jwt.TokenExpiredError) {
        // Token is expired
        return { valid: false, expired: true, decoded: null };
      } else {
        // Some other error
        return { valid: false, expired: false, decoded: null };
      }
    }
  }
};
