import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const { from, to, text } = await request.json();
  const ENCODE_KEY = process.env.ENCODE_KEY;
  const encryptedKey = request.cookies.get("KEY")?.value;
  const model = request.cookies.get("MODEL")?.value;
  let originalKey = "";

  if (encryptedKey && typeof encryptedKey === "string" && ENCODE_KEY) {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, ENCODE_KEY);
    originalKey = bytes.toString(CryptoJS.enc.Utf8);
  }
  try {
    const res = await fetch("http://127.0.0.1:5002/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: to,
        text: text,
        api_key: originalKey,
        model: model,
      }),
    });
    const data = await res.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }
}
