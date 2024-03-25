import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken, createToken } from "@/lib/utils";
import sql from "@/lib/db";
import { use } from "react";

type DecodedToken = {
  id: string;
  email: string;
  userName: string;
  iat: number;
  exp: number;
};

async function verifyAndRefreshToken(request: NextRequest) {
  const accessToken = request.cookies.get("AccessToken")?.value;
  const refreshToken = request.cookies.get("RefreshToken")?.value;
  if (!accessToken || !refreshToken) return { valid: false };

  const decodedAccessToken = verifyToken(accessToken, "ACCESS_TOKEN");
  const decodedRefreshToken = verifyToken(refreshToken, "REFRESH_TOKEN");
  if (!decodedAccessToken || !decodedAccessToken.decoded?.id) {
    if (!decodedRefreshToken || !decodedRefreshToken.decoded?.id)
      return { valid: false };

    const refreshTokenDB = await sql`
      SELECT * FROM refresh_tokens WHERE token = ${refreshToken} AND user_id = ${decodedRefreshToken?.decoded?.id}
    `;

    if (refreshTokenDB.count === 0) return { valid: false };

    if (decodedRefreshToken.valid && !decodedRefreshToken.expired) {
      const newAccessToken = createToken(
        decodedRefreshToken.decoded?.id,
        decodedRefreshToken?.decoded?.email,
        decodedRefreshToken?.decoded?.userName,
        decodedRefreshToken?.decoded?.role,
        decodedRefreshToken?.decoded?.avatar,
        process.env.ACCESS_TOKEN_SECRET || "",
        1000 * 60 * 60 * 24 // 1 day
      );

      return {
        valid: true,
        user: decodedRefreshToken,
        accessToken: newAccessToken,
      };
    }
  }

  return { valid: true, user: decodedAccessToken };
}

export async function POST(request: NextRequest) {
  const { valid, user, accessToken } = await verifyAndRefreshToken(request);
  if (!valid) {
    let res = new Response(
      JSON.stringify({ Status: "Authentication failed" }),
      {
        status: 401,
      }
    );
    res.headers.set(
      "Set-Cookie",
      `ACCESS_TOKEN=;SameSite=strict;Path=/;Secure;HttpOnly`
    );
  }

  const response = new Response(
    JSON.stringify({ Status: "Success", User: user?.decoded }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  response.headers.set(
    "Set-Cookie",
    `ACCESS_TOKEN=${accessToken};SameSite=strict;Path=/;Secure;HttpOnly;Max-Age=1000; HttpOnly`
  );

  return response;
}
