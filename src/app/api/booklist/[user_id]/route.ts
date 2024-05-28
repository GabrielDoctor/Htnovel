import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;
  try {
    const rows =
      await sql`SELECT n.id, n.novel_name,n.author,n.cover,n.views FROM novels n INNER JOIN booklist b ON n.id = b.novel_id WHERE b.user_id = ${user_id}`;
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
