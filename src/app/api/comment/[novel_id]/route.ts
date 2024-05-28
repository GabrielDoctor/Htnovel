import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
export async function GET(
  request: NextRequest,
  { params }: { params: { novel_id: string } }
) {
  const { novel_id } = params;

  try {
    const rows =
      await sql`SELECT * FROM comments WHERE novel_id = ${novel_id} ORDER BY published_at DESC`;
    for (let i = 0; i < rows.length; i++) {
      const user_name =
        await sql`SELECT user_name FROM users WHERE id = ${rows[i].user_id} LIMIT 1`;
      rows[i].user_name = user_name[0].user_name;
    }
    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }
}
