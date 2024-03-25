import sql from "@/lib/db";
import { NextRequest } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { novel_id: string } }
) {
  const { novel_id } = params;
  try {
    console.log(novel_id);
    const novelInfo = await sql`
      SELECT novel_name
      FROM novels
      WHERE id = ${novel_id}
    `;

    // Lấy danh sách chapters thuộc novel
    const chapters = await sql`
      SELECT c.id, c.chapter_title, c.chapter_index, c.up_time, v.name AS volumn_name
      FROM chapters c INNER JOIN volumes v ON c.volume_id = v.id
        WHERE c.novel_id = ${novel_id}
      ORDER BY chapter_index ASC
    `;
    return new Response(
      JSON.stringify({
        novel_name: novelInfo[0].novel_name,
        chapters: chapters,
      }),
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
