import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const res = await fetch(
    "https://chivi.app/_sp/qtran/c_gpt?pd=combine&rg=0&hs=1&ls=0&op=mtl",
    {
      headers: {
        accept: "*/*",
        "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "text/plain;charset=UTF-8",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          "rfface=1; r_mode=0; show_z=f; auto_u=f; _auto_=t; _regen=0; wfface=1; wtheme=oled; rfsize=1; textlh=130; _a=f9VxU7PQTxAQ9Wna%2F9dpk97CPNtcNn%2BmJz9r%2FV3%2FO9hlFD4Apb2jJwg4vjChZwjYqOBc4t9qQBWqVra4tn%2BdVWgYAAMFR1UsMDzvt9K%2FFbAMaYDe7SYUukJJlEjMTL%2BO--hcww8Sjl7VThXiVqY%2BmYp42wHvY%3D",
        Referer: "https://chivi.app/mt/qtran",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: text,
      method: "POST",
    }
  );
  const data = await res.text();
  return new Response(data, {
    status: 200,
    headers: {
      "Content-type": "plain/text",
    },
  });
}
