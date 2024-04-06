import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { addTokenToHeader, createToken } from "@/lib/utils";
import type { User } from "@/lib/auth";
export async function GET(req: NextRequest) {
  const res = new NextResponse(JSON.stringify({ Status: "Success" }), {
    status: 200,
    headers: {
      "Content-type": "application/json",
    },
  });
  res.cookies.delete("AccessToken");
  res.cookies.delete("RefreshToken");

  return res;
}
