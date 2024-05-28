import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    user_id,
    parent_comment_id,
    comment_data,
    novel_id,
  }: {
    user_id: string;
    parent_comment_id?: string;
    comment_data: string;
    novel_id: string;
  } = await req.json();

  try {
    if (!user_id || !novel_id || !comment_data) {
      return new NextResponse(JSON.stringify("Invalid request"), {
        status: 400,
        headers: {
          "Content-type": "application/json",
        },
      });
    }
    let rows: [] = [];
    if (!parent_comment_id) {
      const rows =
        await sql`INSERT INTO comments(user_id, novel_id, content) VALUES (${user_id}, ${novel_id}, ${comment_data}) RETURNING *`;
    } else {
      const rows =
        await sql`INSERT INTO comments(user_id, novel_id, parent_id, content) VALUES (${user_id}, ${novel_id}, ${parent_comment_id}, ${comment_data}) RETURNING *`;
    }

    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
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
