import fs from "fs";
import sql from "@/lib/db";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BingTransBtn from "@/app/ui/parts/BingTransBtn";

async function getChapterInfo(chapter_id: string) {
  try {
    const rows = await sql`SELECT * FROM chapters WHERE id = ${chapter_id}`;
    if (rows.length === 0) {
      throw new Error("Chapter not found");
    }
    const data = fs.readFileSync(rows[0].content_path, {
      encoding: "utf-8",
      flag: "r",
    });
    return {
      chapterInfo: rows[0],
      content: data,
    };
  } catch (error) {
    console.error(error);
  }
}

export default async function Page({
  params,
}: {
  params: { chapter_id: string };
}) {
  const { chapter_id } = params;
  const { chapterInfo, content } = (await getChapterInfo(chapter_id)) || {};

  return (
    <div className="flex flex-col justify-center items-center w-3/4 m-auto">
      <BingTransBtn content={content || ""} />
      <Typography variant="h3">{chapterInfo?.chapter_title}</Typography>
      <Typography id="chapter_content" variant="body1">
        {content?.split("<br/>").map((line, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: line }}></p>
        ))}
      </Typography>
    </div>
  );
}
