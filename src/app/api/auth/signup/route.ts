import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "@/lib/db";
import { createAuthHeaders } from "@/lib/utils";
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
    return Response.json(
      { error: "Email already exists" },
      {
        status: 409,
      }
    );
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
  const userData = {
    id: userInfo.id,
    user_name: userInfo.user_name,
    role: userInfo.role,
    email: userInfo.email,
    photo: userInfo.photo,
  };
  const headers = await createAuthHeaders(userData.id);
  if (!headers) {
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
  return new NextResponse(JSON.stringify(userData), {
    status: 200,
    headers: headers,
  });
}
