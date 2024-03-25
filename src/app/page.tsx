"use client";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./ui/CarouselItem";
import Typography from "@mui/material/Typography";
import BookCard from "./ui/BookCard";
import Skeleton from "@mui/material/Skeleton";
export default function Home() {
  const [booklists, setBooklists] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);
  useEffect(() => {
    const fetchBookList = async () => {
      const baseUrl = "/api/getNovelInfoList";
      const url = `${baseUrl}?page=1&limit=10&order=desc&genre=校园`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const booklists = await res.json();
      setBooklists(booklists);

      console.log(booklists);
    };
    fetchBookList();
  }, []);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      const baseUrl = "/api/getNovelInfoList";
      const page = Math.floor(Math.random() * 10) + 1;
      const url = `${baseUrl}?page=${page}&limit=10`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const randomBooks = await res.json();
      setRandomBooks(randomBooks);
    };
    fetchRandomBooks();
  }, []);
  return (
    <main>
      {booklists.length > 0 && randomBooks.length > 0 ? (
        <>
          <div className="m-6 w-4/5 lg:w-3/4 mx-auto border-black dark:border-white p-3 border-solid rounded-lg border-2">
            <Carousel className="h-full w-full">
              {booklists.length > 0 &&
                booklists.map((booklist: any) => {
                  return (
                    <div key={booklist.id}>
                      {CarouselItem({
                        bookId: booklist,
                        title: booklist.novel_name,
                        description: booklist.description_text,
                        img: booklist.cover,
                        author: booklist.author,
                      })}
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <div className="m-6 max-w-6xl md:ml-10 md:mr-10 lg:ml-40 lg:mr-40">
            <Typography variant="h4" component="h4">
              Random Novels
              <hr className="pb-4 border-t-2 dark:border-white border-black border-opacity-80 h-1 w-full bg-gradient-to-r from-transparent dark:from-transparent via-black dark:via-gray-700 to-transparent dark:to-transparent" />{" "}
            </Typography>
            <div className="p-5 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-10 rounded-md border-2 border-black border-opacity-80 dark:border-slate-400 ">
              {randomBooks &&
                randomBooks.map((book: any) => {
                  return (
                    <BookCard
                      key={book.novel_id}
                      title={book.novel_name}
                      author={book.author}
                      imageUrl={book.cover}
                      novelId={book.novel_id}
                      views={book.views}
                    />
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <>
          <Skeleton
            className="w-4/5 m-auto rounded-lg mt-7 "
            animation="wave"
            variant="rounded"
            width={1080}
            height={360}
          />
          <Skeleton
            className="w-4/5 m-auto rounded-lg mt-8 "
            animation="wave"
            variant="rounded"
            width={1080}
            height={480}
          />
        </>
      )}
    </main>
  );
}
