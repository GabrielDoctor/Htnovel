import { NextRequest } from "next/server";
import sql from "@/lib/db";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let page = searchParams.get("page") || 1;
  let limit = searchParams.get("limit") || 20;
  let order = searchParams.get("order") || "desc";
  let genre = searchParams.get("genre") || "校园";
  if (typeof limit == "string") limit = parseInt(limit);
  if (typeof page == "string") page = parseInt(page);
  const rows =
    await sql`SELECT * FROM novels n JOIN novel_tag nt ON n.id = nt.novel_id JOIN tags t ON nt.tag_id = t.id WHERE t.tag_name = ${genre} ORDER BY ${order} LIMIT ${limit} OFFSET ${
      (page - 1) * limit
    }`;
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
