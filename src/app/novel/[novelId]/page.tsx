import sql from "@/lib/db";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import AuthorIcon from "@/app/ui/assets/author";
import EyeGlass from "@/app/ui/assets/eyeglass";
import Button from "@mui/material/Button";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FullWidthTabs from "@/app/ui/Tabs";
import BookmarkBtn from "@/app/ui/parts/BookmarkBtn";

type Novel = {
  id: string;
  novel_name: string;
  author: string;
  author_id: string;
  cover: string;
  description_text: string;
  genre: string;
  views: bigint;
  status: string;
};

type chapters = {
  id: number;
  chapter_src_id: string;
  novel_id: number;
  volume_id: number;
  chapter_index: number;
  chapter_title: string;
  price: number;
  is_vip: boolean;
  up_time: string;
  content_path: string;
  author_say: string;
};

interface latestChapterInfo {
  chapter_id: number;
  chapter_title: string;
  chapter_index: number;
  volumn_name: string;
  up_time: string;
}

async function getLatestChapters(novelId: string) {
  try {
    const latestChapter =
      (await sql`SELECT c.id AS chapter_id, c.chapter_title AS chapter_title, c.chapter_index AS chapter_index,c.up_time AS up_time, v.name AS volumn_name FROM chapters c INNER JOIN volumes v ON c.volume_id = v.id WHERE c.novel_id = ${novelId} ORDER BY c.id DESC LIMIT 5`) as latestChapterInfo[];

    return latestChapter;
  } catch (error) {
    console.error(error);
  }
}

async function incrementNovelViews(novelId: string): Promise<void> {
  await sql`UPDATE novels SET views = views + 1 WHERE id = ${novelId}`;
}

async function getNovelInfo(novelId: string) {
  try {
    // Start a transaction to safely increment views

    const novelInfo = await sql`SELECT * FROM novels WHERE id = ${novelId}`;
    if (novelInfo.length === 0) {
      throw new Error("Novel not found");
    }

    const numChapters =
      await sql`SELECT COUNT(*) FROM chapters WHERE novel_id = ${novelId}`;
    const tags =
      await sql`SELECT tag_name FROM novel_tag nt JOIN tags t ON nt.tag_id = t.id WHERE nt.novel_id = ${novelId}`;

    // Increment views

    await incrementNovelViews(novelId);
    return {
      ...novelInfo[0],
      tags: tags.map((tag: any) => tag.tag_name || ""),
      numChapters: numChapters[0].count,
    };
  } catch (error) {
    console.error("Failed to get novel info or update views", error);
    throw error;
  }
}
async function getSameNovelInfo(author_id: string) {
  const sameAuthorNovel =
    await sql`SELECT id,novel_name,author,cover,author_id FROM novels WHERE author_id = ${author_id} LIMIT 10`;
  return sameAuthorNovel;
}
export default async function Page({
  params,
}: {
  params: { novelId: string };
}) {
  const novel: any = await getNovelInfo(params.novelId);
  let cover = novel.cover;
  try {
    const imgCheck = await fetch(novel.cover, {
      method: "HEAD",
    });
    if (!imgCheck.ok) {
      cover = "http://img.wenku8.com/image/3/3632/3632s.jpg";
    }
  } catch (error) {
    cover = "http://img.wenku8.com/image/3/3632/3632s.jpg";
  }

  const sameAuthorNovel = await getSameNovelInfo(novel.author_id);
  const latestChapters = await getLatestChapters(params.novelId);
  const bookStatus = [
    ["Chapters", novel.numChapters],
    ["Status", novel.status],
    ["Views", novel.views],
    ["Likes", 0],
  ];

  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen w-11/12 md:w-3/4">
      <div className="relative w-full">
        <Image
          className="absolute inset-0 w-full h-full object-cover blur-md -z-10"
          width={1080}
          height={1080}
          src={cover}
          alt="cover"
        />
        <div className="relative z-10 p-4 md:p-8">
          <Image
            className="rounded-lg shadow-lg"
            width={320}
            height={480}
            src={cover}
            alt="cover"
            priority
          />
        </div>
      </div>
      <h3 className="mt-4 text-4xl font-bold text-gray-800 dark:text-white">
        {novel.novel_name}
      </h3>
      <div className="mt-2 flex items-center gap-2">
        <AuthorIcon className="h-6 w-6 fill-current text-gray-700 dark:text-gray-300" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {novel.author}
        </p>
      </div>
      <div className="flex flex-row justify-center items-center mt-4 w-full">
        <button className="w-full rounded-full bg-blue-600 py-3 px-6 text-white font-bold transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <span>Start Reading</span>
        </button>
      </div>
      <div className="mt-4 flex flex-row justify-center items-center w-full gap-4">
        <BookmarkBtn novel_id={novel.id} />
        <button className="flex flex-row justify-center items-center rounded-full bg-pink-500 py-3 px-6 text-white font-bold transition duration-300 ease-in-out hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          <FavoriteBorderIcon className="mr-2 h-6 w-6" />
          <h3>Like</h3>
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {bookStatus.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 p-4 shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
          >
            <span className="text-xl font-bold text-white">{value}</span>
            <span className="text-base font-medium text-white">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-2">
        <h4 className="w-full text-center font-bold text-lg text-gray-800 dark:text-white">
          Tags:
        </h4>
        {novel.tags.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full bg-indigo-500 px-4 py-1 text-sm text-white font-bold transition duration-300 ease-in-out hover:bg-indigo-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 w-full">
        <FullWidthTabs
          description={novel.description_text}
          novel_id={novel.id}
        />
      </div>
    </div>
  );
}
