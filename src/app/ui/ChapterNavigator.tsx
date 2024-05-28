"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { useSettings } from "./contexts/SettingContext";

export default function ChapterNavigator({
  preChapterId,
  nextChapterId,
}: {
  preChapterId: string | null;
  nextChapterId: string | null;
}) {
  const { readingTheme, theme } = useSettings();
  const [scrollY, setScrollY] = useState<number>(0);
  const [isSticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < scrollY) {
        setSticky(true);
      } else if (currentScrollY > scrollY) {
        setSticky(false);
      }

      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <div
      className={`flex flex-row justify-center items-center gap-5 rounded-lg pb-3 shadow-lg ${
        isSticky
          ? "fixed bottom-1 left-0 w-full z-50 bg-gradient-to-t from-gray-500 via-transparent to-transparent"
          : `${
              theme === "dark"
                ? readingTheme.backgroundColor.dark
                : readingTheme.backgroundColor.light
            }`
      }  `}
    >
      <Link href={`/chapter/${preChapterId}`} passHref>
        <Button
          disabled={!preChapterId}
          className="bg-white bg-opacity-70 hover:bg-opacity-100"
        >
          <HiOutlineArrowLeft className="w-6 h-6 text-gray-800" />
        </Button>
      </Link>
      <Link href={`/chapter/${nextChapterId}`} passHref>
        <Button
          disabled={!nextChapterId}
          className="bg-white bg-opacity-70 hover:bg-opacity-100"
        >
          <HiOutlineArrowRight className="w-6 h-6 text-gray-800" />
        </Button>
      </Link>
    </div>
  );
}
