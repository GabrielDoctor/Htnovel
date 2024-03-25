import sql from "@/lib/db";
import { NextRequest } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { volumn_id: string } }
) {
  const { volumn_id } = params;
  try {
    const volumeInfo = await sql`
      SELECT name
      FROM volumes
      WHERE id = ${volumn_id}
    `;

    // Lấy danh sách chapters thuộc volume
    const chapters = await sql`
      SELECT id, chapter_title, chapter_index, up_time
      FROM chapters
      WHERE volume_id = ${volumn_id}
      ORDER BY chapter_index ASC
    `;
    return new Response(
      JSON.stringify({ volumn_name: volumeInfo[0].name, chapters: chapters }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
