import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const text = await request.text();
  console.log(text);
  try {
    const response = await fetch(`http://localhost:8080/api/translate/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: text,
    });
    const data = await response.json();
    console.log(data);
    return new Response(data.text, {
      status: 200,
      headers: {
        "Content-type": "plain/text",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}
