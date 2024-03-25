import jwt from "jsonwebtoken";
import { User } from "./auth";

export const createToken = (
  userId: string,
  email: string,
  userName: string,
  role: string,
  avatar: string,
  secret: string,
  expiresIn: number
) => {
  const payload = {
    id: userId,
    email: email,
    userName: userName,
    role: role,
    avatar: avatar,
    iat: Date.now(),
    exp: Date.now() + expiresIn,
  };
  return jwt.sign(payload, secret);
};

export const addTokenToHeader = (user: User) => {
  console.log(user);
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
    return Response.json({ Error: "Internal Server Error" });
  const ACCESS_TOKEN = createToken(
    user.id,
    user.email,
    user.user_name,
    user.role,
    user.avatar,
    ACCESS_TOKEN_SECRET,
    1000 * 60 * 60 * 24
  );
  const REFRESH_TOKEN = createToken(
    user.id,
    user.email,
    user.user_name,
    user.role,
    user.avatar,
    ACCESS_TOKEN_SECRET,
    1000 * 60 * 60 * 24 * 7
  );

  // Add secure in cookie when https
  let response = new Response(JSON.stringify({ Status: "Success" }), {});
  response.headers.append(
    "Set-Cookie",
    `AccessToken=${ACCESS_TOKEN}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${
      1000 * 60 * 60 * 24
    }`
  );
  response.headers.append(
    "Set-Cookie",
    `RefreshToken=${REFRESH_TOKEN}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${
      1000 * 60 * 60 * 24 * 7
    }`
  );
  return response;
};

export const verifyToken = (
  token: string,
  type: "ACCESS_TOKEN" | "REFRESH_TOKEN"
) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
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
