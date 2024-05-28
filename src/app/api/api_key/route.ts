import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { key, model } = await request.json();
  const ENCODE_KEY = process.env.ENCODE_KEY;
  if (!ENCODE_KEY)
    return new NextResponse(JSON.stringify("Internal server error"), {
      status: 500,
      headers: {
        "Content-type": "application/json",
      },
    });
  const encryptedApiKey = CryptoJS.AES.encrypt(key, ENCODE_KEY).toString();
  const res = new NextResponse(JSON.stringify("Save API_KEY success!"), {
    status: 200,
    headers: {
      "Content-type": "application/json",
    },
  });
  res.cookies.set("KEY", encryptedApiKey, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  });
  res.cookies.set("MODEL", model, {
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
