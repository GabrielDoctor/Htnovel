import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const { novel_id, user_id } = await request.json();

  const ACCESS_TOKEN = request.cookies.get("ACCESS_TOKEN")?.value;

  if (!ACCESS_TOKEN) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const token = verifyToken(ACCESS_TOKEN, "ACCESS_TOKEN");
  if (!token?.valid) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (token.decoded.id !== user_id) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const existingBookmarks = await sql`
    SELECT * FROM booklist WHERE novel_id = ${novel_id} AND user_id = ${user_id}
  `;
  if (existingBookmarks.count > 0) {
    return new NextResponse(JSON.stringify({ error: "Already bookmarked" }), {
      status: 409,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const rows =
      await sql`INSERT INTO booklist (novel_id, user_id) VALUES (${novel_id}, ${user_id})`;
    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
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

export async function DELETE(request: NextRequest) {
  const { user_id, novel_id } = await request.json();
  const ACCESS_TOKEN = request.cookies.get("ACCESS_TOKEN")?.value;

  if (!ACCESS_TOKEN) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const token = verifyToken(ACCESS_TOKEN, "ACCESS_TOKEN");
  if (!token?.valid) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (token.decoded.id !== user_id) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const rows =
      await sql`DELETE FROM booklist WHERE novel_id = ${novel_id} AND user_id = ${user_id}`;
    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
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
