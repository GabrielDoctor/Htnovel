import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const img = await request.formData();
  const file = img.get("file");
  const uploadImgDir = "./images";
  console.log(uploadImgDir, file);
}
