import { NextRequest } from "next/server";
import sql from "@/lib/db";

export async function POST(request: NextRequest) {
  const bookdata = await request.formData();
  const name = bookdata.get("bookName") as string;
  const author = bookdata.get("author") as string;
  const description = bookdata.get("description") as string;
  //const tags = (bookdata.get("tags") || "") as string;
  let cover = (bookdata.get("cover") || "") as string;
  //const type = bookdata.get("type") as string;
  console.log(name, author, description, cover);
  if (cover == "") {
    cover =
      "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }
  if (!name || !author || !description || !cover) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const rows = await sql`
      INSERT INTO novels (novel_name, author, description_text, cover, host)
      VALUES (${name}, ${author}, ${description}, ${cover}, 'htnovel') RETURNING id
    `;
    console.log("rows: ", rows[0]);
    return new Response(JSON.stringify({ success: true, bookId: rows[0].id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
