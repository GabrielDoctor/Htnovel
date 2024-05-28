"use client";
import { useState, useEffect, use } from "react";
import { useAuth } from "../ui/contexts/AuthContext";
import BookCard from "../ui/BookCard";
interface BookProps {
  id: string;
  novel_name: string;
  author: string;
  cover: string;
  views: string;
}
export default function BookList() {
  const { userData } = useAuth();
  const [books, setBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (userData?.role === "Guest" || !userData) {
        alert("Please login to use this feature");
        return;
      }
      const response = await fetch(`/api/booklist/${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Error: " + error.message);
        return;
      }
      const data = await response.json();
      setBooks(data);
    };

    if (userData) {
      fetchBooks();
    }
  }, [userData]);

  const handleRemoveBookmark = async (novelId: string) => {
    const response = await fetch(`/api/booklist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userData?.id, novel_id: novelId }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert("Error: " + error.message);
      return;
    }

    setBooks(books.filter((book) => book.id !== novelId));
  };
  return (
    <div className="p-5 dark:text-white text-black grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-10 rounded-md border-2 border-black border-opacity-80 dark:border-slate-400 ">
      {books &&
        books.map((book: any) => {
          return (
            <div key={book.id} className="relative">
              <BookCard
                title={book.novel_name}
                author={book.author}
                imageUrl={book.cover}
                novelId={book.id}
                views={book.views}
              />
              <button
                className="absolute rounded-lg top-0 right-0 m-2 p-3 bg-red-500 text-white"
                onClick={() => handleRemoveBookmark(book.id)}
              >
                X
              </button>
            </div>
          );
        })}
    </div>
  );
}
