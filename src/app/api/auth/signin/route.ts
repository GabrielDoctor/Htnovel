import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { addTokenToHeader, createToken } from "@/lib/utils";
import type { User } from "@/lib/auth";
export async function POST(req: NextRequest) {
  const result: any = await req.formData();
  const email = result.get("email");
  const password = result.get("password");
  if (!email || !password) {
    return Response.json({ error: "Email and password are required" });
  }
  const dbRs = await sql`SELECT * FROM users WHERE email = ${email} `;
  const userExists = dbRs.length > 0;
  if (!userExists) {
    return Response.json({ error: "Invalid email or password" });
  }
  const user: User = dbRs[0] as User;
  const validPassword = await bcrypt.compare(password, dbRs[0].password);
  if (!validPassword) {
    return Response.json({ error: "Invalid email or password" });
  }
  const response = addTokenToHeader(user);

  return response;
}
