import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "@/lib/db";
import { addTokenToHeader } from "@/lib/utils";
import { User } from "@/lib/auth";
export async function POST(req: NextRequest, res: NextResponse) {
  const result: any = await req.formData();
  const email = result.get("email");
  const username = result.get("username");
  const password = result.get("password");
  if (!email || !password || !username) {
    return Response.json({
      error: "Email and password and username are required",
    });
  }
  const user = await sql`SELECT * FROM users WHERE email = ${email}`;
  const userExists = user.length > 0;
  if (userExists) {
    return Response.json({ error: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const rs =
    await sql`INSERT INTO users (email, user_name, password) VALUES (${email}, ${username}, ${hashedPassword}) RETURNING *`;

  if (rs.count === 0) {
    return new Response(JSON.stringify({ Error: "Interal server Error" }), {
      status: 500,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  const userInfo = rs[0] as User;
  let response = new Response(JSON.stringify({ Status: "Success" }), {
    status: 200,
  });
  response = addTokenToHeader(userInfo);
  return response;
}
