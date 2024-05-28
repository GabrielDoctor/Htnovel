import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken, createToken } from "@/lib/utils";
import sql from "@/lib/db";

interface DecodedToken {
  id: string;
  user_name: string;
  iat: number;
  exp: number;
}

async function verifyAndRefreshToken(request: NextRequest) {
  const accessToken = request.cookies.get("ACCESS_TOKEN")?.value;
  const refreshToken = request.cookies.get("REFRESH_TOKEN")?.value;

  if (!accessToken || !refreshToken)
    return { valid: false, user: null, accessToken: "" };

  let decodedAccessToken: any = null;
  try {
    decodedAccessToken = verifyToken(accessToken, "ACCESS_TOKEN");
  } catch (error) {
    console.log(error);
  }

  if (decodedAccessToken && decodedAccessToken.id) {
    return { valid: true, user: decodedAccessToken, accessToken };
  }

  let decodedRefreshToken = null;
  try {
    decodedRefreshToken = verifyToken(refreshToken, "REFRESH_TOKEN");
  } catch (error) {
    console.log(error);
    return { valid: false, user: null, accessToken: "" };
  }

  if (!decodedRefreshToken || !decodedRefreshToken.decoded.id) {
    return { valid: false, user: null, accessToken: "" };
  }
  const refreshTokenDB = await sql`
    SELECT * FROM refresh_tokens WHERE token = ${refreshToken} AND user_id = ${decodedRefreshToken.decoded.id}
  `;

  if (refreshTokenDB.count === 0) {
    return { valid: false, user: null, accessToken: "" };
  }

  if (decodedRefreshToken.valid && !decodedRefreshToken.expired) {
    const newAccessToken = createToken(
      decodedRefreshToken.decoded.id,
      process.env.ACCESS_TOKEN_SECRET || "",
      "1h"
    );
    return {
      valid: true,
      user: decodedRefreshToken.decoded,
      accessToken: newAccessToken,
    };
  }

  return { valid: false, user: null, accessToken: "" };
}

export async function POST(request: NextRequest) {
  const { valid, user, accessToken } = await verifyAndRefreshToken(request);
  if (!valid) {
    return new NextResponse(
      JSON.stringify({ Status: "Authentication failed" }),
      {
        status: 401,
        headers: {
          "Set-Cookie": `ACCESS_TOKEN=; path=/; SameSite=Strict; HttpOnly; Max-Age=0;REFRESH_TOKEN=; path=/; SameSite=Strict; HttpOnly; Max-Age=0`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  const user_id = user?.id;
  const user_data = await sql`
    SELECT id, email, user_name, photo, role FROM users WHERE id = ${user_id}
  `;

  let response = new NextResponse(
    JSON.stringify({ Status: "Success", User: user_data[0] }),
    {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `ACCESS_TOKEN=${accessToken}; path=/; SameSite=Strict; Secure; HttpOnly; Max-Age=${
          60 * 60
        }`,
      },
    }
  );

  return response;
}
