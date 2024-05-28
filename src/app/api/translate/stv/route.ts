import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const res = await fetch("https://comic.sangtacvietcdn.xyz/tsm.php?cdn=/", {
    headers: {
      accept: "*/*",
      "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://nhimmeo.cf/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "sajax=trans&content=" + text,
    method: "POST",
  });
  const data = await res.text();
  return new Response(data, {
    status: 200,
    headers: {
      "Content-type": "plain/text",
    },
  });
}
