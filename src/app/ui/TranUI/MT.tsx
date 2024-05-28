"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useContext } from "react";
import { TransOption, useSettings } from "../contexts/SettingContext";
import Segment from "./segment/Segment";

import { clearAllLineFocusStyle } from "@/utils/utils";
import { translate } from "@/utils/translate_api";
import { EditBoxContext } from "@/app/ui/contexts/EditBoxContext";
import LookupBar from "../parts/Lookup/LookupBar";
import EditToolBar from "../parts/EditToolBar";

type MTProps = {
  chapterTitle: string;
  content: string;
};

export default function MT({ chapterTitle, content }: MTProps) {
  const { readingTheme, theme, readingSetting } = useSettings();
  const [segments, setSegments] = useState<string[]>([]);
  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(false);
  const [segmentNum, setSegmentNum] = useState<number>(1);
  const [displaySegments, setDisplaySegments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [isLoaderShown, setIsLoaderShown] = useState<boolean>(false);
  const [translatedTitle, setTranslatedTitle] = useState<string>("");
  const {
    openLookupBar,
    setOpenLookupBar,
    toolbarPos,
    setToolbarPos,
    HtmlNodes,
    setHtmlNodes,
    setFirstNode,
  } = useContext(EditBoxContext);
  useEffect(() => {
    async function translate_title(chapterTitle: string) {
      const translated = await translate(
        chapterTitle,
        readingSetting.language,
        "",
        readingSetting.transOption
      );
      setTranslatedTitle(translated || chapterTitle);
    }
    translate_title(chapterTitle);
  }, [readingSetting.language, readingSetting.transOption]);

  const splitContent = (content: string): string[] => {
    if (content[0] === "\n") content = content.slice(1);
    const result: string[] = [];
    let currentIndex = 0;

    while (currentIndex < content.length) {
      let endIndex = currentIndex + 700;
      if (endIndex > content.length) {
        endIndex = content.length;
      } else {
        const lastNewLine = content.lastIndexOf("\n", endIndex);
        if (lastNewLine === -1 || lastNewLine == 0) break;
        if (lastNewLine > currentIndex) {
          endIndex = lastNewLine;
        }
      }

      result.push(content.substring(currentIndex, endIndex));
      currentIndex = endIndex + 1;
    }

    return result;
  };

  useEffect(() => {
    if (!content) return;
    setSegments(splitContent(content));
    setIsContentLoaded(true);
  }, [content]);

  useEffect(() => {
    setDisplaySegments(segments.slice(0, segmentNum));
  }, [segmentNum, segments]);
  useEffect(() => {
    setSegmentNum(1);
  }, [readingSetting.language, readingSetting.transOption]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 25 &&
        !loading
      ) {
        if (segmentNum < segments.length && loading === false) {
          console.log(loading);
          setSegmentNum((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [segments.length, segmentNum, loading]);
  const handleClick = () => {
    setOpenLookupBar(false);
    setToolbarPos({ top: 0, left: 0 });
    if (HtmlNodes) clearAllLineFocusStyle(HtmlNodes);
    setHtmlNodes(undefined);
    setFirstNode(undefined);
  };
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col justify-center items-center w-full px-7 md:px-44 gap-2 ${
        readingTheme.fontColor
      } ${
        theme === "dark"
          ? readingTheme.backgroundColor.dark
          : readingTheme.backgroundColor.light
      } ${readingTheme.fontFamily} ${readingTheme.lineHeight} ${
        readingTheme.fontSize
      }`}
      style={{
        fontFamily: readingTheme.fontFamily,
      }}
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight p-5">
        {translatedTitle ? translatedTitle : chapterTitle}
      </h1>
      <LookupBar />
      {!openLookupBar && toolbarPos.top !== 0 && <EditToolBar />}
      <div className="flex flex-col justify-center items-start px-1 md:px-16 gap-1">
        {isContentLoaded &&
          displaySegments.map((segment, index) => (
            <Segment key={index} setIsLoading={setLoading} segment={segment} />
          ))}
      </div>
    </div>
  );
}
