import sql from "@/lib/db";
import { NextRequest } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { novel_id: string } }
) {
  const { novel_id } = params;
  try {
    const rows = await sql`SELECT * FROM novels WHERE id = ${novel_id}`;
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}
