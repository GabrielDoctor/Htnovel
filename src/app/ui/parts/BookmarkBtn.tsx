"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/ui/contexts/AuthContext";
import { BookmarkIcon } from "@heroicons/react/24/outline";
export default function BookmarkBtn({ novel_id }: { novel_id: string }) {
  const { userData } = useAuth();
  const handleBookmark = async () => {
    if (userData?.role === "Guest") {
      alert("Please login first");
      return;
    }
    try {
      const response = await fetch("/api/booklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          novel_id: novel_id,
          user_id: userData?.id,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        alert("Error: " + err.error);
        throw new Error(`Error: ${err.error}`);
      }
      const data = await response.json();
      alert("Successfully added to bookmark");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      onClick={handleBookmark}
      className="flex flex-row justify-center items-center rounded-full bg-green-500 py-3 px-6 text-white font-bold transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    >
      <BookmarkIcon className="mr-2 h-6 w-6" />
      <h3>Bookmark</h3>
    </button>
  );
}
