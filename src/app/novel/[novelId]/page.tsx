import sql from "@/lib/db";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import AuthorIcon from "@/app/ui/assets/author";
import EyeGlass from "@/app/ui/assets/eyeglass";
import Button from "@mui/material/Button";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FullWidthTabs from "@/app/ui/Tabs";

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

  const sameAuthorNovel = await getSameNovelInfo(novel.author_id);
  const latestChapters = await getLatestChapters(params.novelId);
  const bookStatus = [
    ["Chapters", novel.numChapters],
    ["Status", novel.status],
    ["Views", novel.views],
    ["Likes", 0],
  ];
  return (
    <div className=" m-auto flex flex-col gap-3 items-center justify-center h-full w-11/12 md:w-3/4 md:m-auto relative">
      <div className="flex flex-col justify-center items-center w-full relative">
        <Image
          className="absolute w-full h-full blur-md -z-10 right-0 top-0"
          width={1080}
          height={1080}
          src={novel.cover}
          alt="cover"
        ></Image>
        <Image
          className="rounded-lg w-40 h-56 sm:w-80 sm:h-full p-2"
          width={320}
          height={480}
          src={novel.cover}
          alt="cover"
          priority
        ></Image>
      </div>
      <Typography variant="h3">{novel.novel_name}</Typography>

      <div className="flex flex-row justify-center items-center gap-3 h-8">
        <div className="h-full w-6">
          <AuthorIcon className="fill-black dark:fill-slate-100 h-full w-full" />
        </div>
        <Typography className="" variant="body1">
          {novel.author}
        </Typography>
      </div>
      <Button
        sx={{ borderRadius: "20px" }}
        color="secondary"
        variant="contained"
        className="flex flex-row justify-center items-center gap-3 h-10 w-full"
      >
        <EyeGlass className="fill-black dark:fill-slate-100 h-full w-6" />
        <Typography sx={{ fontWeight: "bold", flexShrink: 2 }} variant="body1">
          Read
        </Typography>
      </Button>
      <div className="flex flex-row justify-center items-center gap-3 h-10 w-full">
        <Button
          sx={{ borderRadius: "20px", width: "50%" }}
          variant="contained"
          className="flex flex-row justify-center items-center gap-3 h-10 w-full"
          startIcon={<BookmarksIcon />}
        >
          Bookmark
        </Button>

        <Button
          sx={{ borderRadius: "20px", width: "50%" }}
          variant="contained"
          startIcon={<FavoriteBorderIcon />}
        >
          Like
        </Button>
      </div>
      <div className="flex flex-row justify-center items-center gap-3 h-18 w-full p-2">
        {bookStatus.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col justify-center items-center gap-1 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 border-2 rounded-lg p-4 bg-rose-600 dark:bg-rose-900 dark:border-gray-700 hover:bg-rose-700 dark:hover:bg-rose-800 transition ease-in-out duration-300 shadow-lg dark:shadow-md hover:shadow-xl dark:hover:shadow-lg text-center"
          >
            <Typography
              sx={{ fontWeight: "bold", flexShrink: 0 }}
              variant="body1"
              className="text-xl text-white dark:text-gray-200"
            >
              {value}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="body1"
              className="text-sm text-gray-900 dark:text-gray-300"
            >
              {label}
            </Typography>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-3 h-18 w-full flex-wrap">
        <Typography variant="h4">Tags:</Typography>
        {novel.tags.map((tag: any) => (
          <Button key={tag} sx={{ borderRadius: "20px" }} variant="contained">
            <Typography sx={{ fontWeight: "bold", flexShrink: 2 }}>
              {tag}
            </Typography>
          </Button>
        ))}
      </div>
      <div className="flex flex-col justify-start items-center gap-3 w-full">
        <Typography
          className="border-1 p-1 rounded-lg  bg-slate-500 px-4"
          sx={{ fontWeight: "bold" }}
          variant="h4"
        >
          Latest Chapters
        </Typography>
        <div className="flex flex-col justify-center items-center gap-1 w-full">
          {latestChapters &&
            latestChapters.map((item: latestChapterInfo) => (
              <div
                className="flex flex-col justify-between gap-2 w-full border-2 rounded-lg p-2 dark:bg-slate-700 border-gray-400   transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl dark:border-amber-700"
                key={item.chapter_id}
              >
                <div className="flex flex-row justify-between items-center gap-3 ">
                  <Typography
                    className="border-1 p-1 rounded-lg  bg-slate-500"
                    sx={{ fontWeight: "bold" }}
                    variant="body1"
                  >
                    #{item.chapter_index}
                  </Typography>
                  <Typography className="truncate" variant="body1">
                    {item.chapter_title}
                  </Typography>
                </div>
                <div className="flex flex-row justify-between items-center gap-3">
                  <Typography className="truncate" variant="body1">
                    {item.volumn_name}
                  </Typography>
                  <Typography
                    className="border-2 rounded-lg p-1 bg-slate-500"
                    sx={{ fontWeight: "bold" }}
                    variant="body1"
                  >
                    {new Date(item.up_time).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full">
        <FullWidthTabs
          description={novel.description_text}
          novel_id={novel.id}
        />
      </div>
    </div>
  );
}
