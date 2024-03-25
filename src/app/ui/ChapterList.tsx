"use client";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";

export default function ChapterList({ novel_id }: any) {
  const [chapters, setChapters] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20; // Đặt số lượng chapter trên mỗi trang là 20

  useEffect(() => {
    const fetchChapters = async () => {
      const url = `/api/novel/${novel_id}/chapters`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setChapters(data.chapters || []);
    };
    fetchChapters();
  }, [novel_id]);

  // Tính toán các chapter để hiển thị trên trang hiện tại
  const startIndex = (page - 1) * itemsPerPage;
  const selectedChapters = chapters.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Xử lý thay đổi trang
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages = Math.ceil(chapters.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      {chapters.length > 0 ? (
        <div className="grid grid-rows-1 md:grid-cols-2 gap-4 w-full max-w-4xl m-auto">
          {selectedChapters.map((chapter: any) => (
            <div
              key={chapter.id}
              className="p-4 bg-gray-100 dark:bg-slate-800 rounded-md shadow-sm"
            >
              <div className="flex flex-row justify-between">
                <div className="mb-2 text-sm text-gray-500">{`#${chapter.chapter_index}`}</div>
                <Link
                  className="truncate text-md  sm:text-lg text-slate-900 dark:text-slate-300 font-semibold hover:text-blue-500"
                  href={`/chapter/${chapter.id}`}
                >
                  {chapter.chapter_title}
                </Link>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(chapter.up_time).toLocaleDateString()}
                </div>
                <p className=" text-sm  text-gray-500 truncate">
                  {chapter.volumn_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CircularProgress />
      )}
      {chapters.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          className="my-4 dark:bg-slate-300"
        />
      )}
    </div>
  );
}
