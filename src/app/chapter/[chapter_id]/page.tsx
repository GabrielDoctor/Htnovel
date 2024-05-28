import fs from "fs";
import sql from "@/lib/db";
import Link from "next/link";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { cookies } from "next/headers";
import MT1 from "@/app/ui/TranUI/MT1";
// import MT from "@/app/ui/TranUI/MT";
import { EditBoxProvider } from "@/app/ui/contexts/EditBoxContext";
import React from "react";
import dynamic from "next/dynamic";
const ChapterNavigator = dynamic(() => import("@/app/ui/ChapterNavigator"), {
  ssr: false,
});

const MT = dynamic(() => import("@/app/ui/TranUI/MT"), {
  ssr: false,
});

const TranOptionBar = dynamic(() => import("@/app/ui/TranOptionBar"), {
  ssr: false,
});
interface ChapterInfo {
  id: string;
  content_path: string;
  chapter_index: number;
  novel_id: string;
  chapter_title: string;
}

interface ChapterData {
  chapterInfo: ChapterInfo;
  nextChapterId: string | null;
  preChapterId: string | null;
  content: string;
}

async function getChapterInfo(chapter_id: string): Promise<ChapterData | null> {
  try {
    const rows = await sql`SELECT * FROM chapters WHERE id = ${chapter_id}`;
    if (rows.length === 0) {
      throw new Error("Chapter not found");
    }

    const chapter = rows[0] as ChapterInfo;
    const nextChapterQuery = await sql`
      SELECT id FROM chapters WHERE novel_id = ${
        chapter.novel_id
      } AND chapter_index = ${Number(chapter.chapter_index) + 1}`;
    const preChapterQuery = await sql`
      SELECT id FROM chapters WHERE novel_id = ${
        chapter.novel_id
      } AND chapter_index = ${Number(chapter.chapter_index) - 1}`;
    const nextChapterId = nextChapterQuery.length
      ? nextChapterQuery[0].id
      : null;
    const preChapterId = preChapterQuery.length ? preChapterQuery[0].id : null;
    const data = fs.readFileSync(chapter.content_path, "utf-8");

    return {
      chapterInfo: chapter,
      nextChapterId,
      preChapterId,
      content: data,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface PageProps {
  params: { chapter_id: string };
}

export default async function Page({ params }: PageProps) {
  const { chapter_id } = params;
  const option = cookies().get("TransOptions");
  const chapterData = await getChapterInfo(chapter_id);

  if (!chapterData) {
    return <div>Chapter not found.</div>;
  }

  const { chapterInfo, content, preChapterId, nextChapterId } = chapterData;

  return (
    <div className="flex flex-col justify-center items-center w-full m-auto">
      <TranOptionBar />
      {/* <EditBoxProvider>
        <MT1 chapter_id={chapter_id} />
      </EditBoxProvider> */}
      <EditBoxProvider>
        <MT chapterTitle={chapterInfo.chapter_title} content={content} />
      </EditBoxProvider>
      <ChapterNavigator
        preChapterId={preChapterId}
        nextChapterId={nextChapterId}
      />
    </div>
  );
}
