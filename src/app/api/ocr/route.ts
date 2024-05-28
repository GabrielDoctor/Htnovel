import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  try {
    console.log(formData.get("image"));
    const response = await fetch("http://localhost:5000/extract-text", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-type": "application/json",
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
