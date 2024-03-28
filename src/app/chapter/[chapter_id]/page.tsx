import fs from "fs";
import sql from "@/lib/db";
import BingTransBtn from "@/app/ui/parts/BingTransBtn";
import Link from "next/link";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import ChapterContent from "@/app/ui/ChapterContent";

async function getChapterInfo(chapter_id: string) {
  try {
    const rows = await sql`SELECT * FROM chapters WHERE id = ${chapter_id}`;
    if (rows.length === 0) {
      throw new Error("Chapter not found");
    }
    const nextChapterQuery =
      await sql`SELECT id FROM chapters WHERE novel_id = ${rows[0].novel_id} AND chapter_index = ${rows[0].chapter_index} + 1`;
    let nextChapterId =
      nextChapterQuery.length === 0 ? null : nextChapterQuery[0];

    const preChapterQuery =
      await sql`SELECT id FROM chapters WHERE novel_id = ${rows[0].novel_id} AND chapter_index = ${rows[0].chapter_index} - 1`;
    let preChapterId = preChapterQuery.length === 0 ? null : preChapterQuery[0];
    const data = fs.readFileSync(rows[0].content_path, {
      encoding: "utf-8",
      flag: "r",
    });
    return {
      chapterInfo: rows[0],
      nextChapterId: nextChapterId?.id,
      preChapterId: preChapterId?.id,
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
  const { chapterInfo, content, preChapterId, nextChapterId } =
    (await getChapterInfo(chapter_id)) || {};

  return (
    <div className="flex flex-col justify-center items-center w-3/4 m-auto">
      <div>
        <ChapterContent title={chapterInfo?.chapter_title} content={content} />
      </div>
      <div className="flex flex-row justify-center items-center gap-5 m-5">
        <Link href={`/chapter/${preChapterId}`}>
          <Button
            className={
              preChapterId == null ? "opacity-50 cursor-not-allowed" : ""
            }
            disabled={preChapterId == null}
          >
            <HiOutlineArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <Link href={`/chapter/${nextChapterId}`}>
          <Button
            className={
              nextChapterId == null ? "opacity-50 cursor-not-allowed" : ""
            }
            disabled={nextChapterId == null}
          >
            <HiOutlineArrowRight className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
