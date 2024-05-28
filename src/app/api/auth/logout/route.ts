import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const res = new NextResponse(JSON.stringify({ Status: "Success" }), {
    status: 200,
    headers: {
      "Content-type": "application/json",
    },
  });
  res.cookies.delete("AccessToken");
  res.cookies.delete("RefreshToken");

  return res;
}
