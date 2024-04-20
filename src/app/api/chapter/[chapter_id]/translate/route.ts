import { NextRequest } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { chapter_id: string } }
) {
  const { chapter_id } = params;
  try {
    const res = await fetch(
      `http://localhost:8080/api/translate/chapter/${chapter_id}`,
      {
        method: "GET",
      }
    );
    const tokens = await res.json();
    return new Response(JSON.stringify(tokens), {
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
