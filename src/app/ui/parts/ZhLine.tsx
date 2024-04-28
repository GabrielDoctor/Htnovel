"use client";
import {
  addFocusStyle,
  getAllTokenInLine,
  getAllZhInLine,
} from "@/utils/utils";
import { useEffect, useRef } from "react";
import { clearAllLineFocusStyle } from "@/utils/utils";
export default function ZhLine({
  zhToks,
  setZhToks,
  firstNode,
}: {
  zhToks: HTMLSpanElement[];
  setZhToks: React.Dispatch<React.SetStateAction<HTMLSpanElement[]>>;
  firstNode: HTMLSpanElement | undefined;
}) {
  const preNode = useRef<HTMLSpanElement>();
  useEffect(() => {
    addFocusStyle(zhToks);
  }, [zhToks]);
  const handleNavigateLeft = () => {
    clearAllLineFocusStyle(zhToks);
    setZhToks((prev) => {
      if (prev && prev.length >= 1) {
        const previousElement = prev[0].previousElementSibling;
        if (previousElement instanceof HTMLSpanElement) {
          console.log(previousElement);
          return [previousElement, ...prev];
        }
      }
      return prev;
    });
  };
  const handleNavigateRight = () => {
    clearAllLineFocusStyle(zhToks);
    setZhToks((prev) => {
      if (prev && prev.length >= 1) {
        const nextElement = prev[prev.length - 1].nextElementSibling;
        if (nextElement instanceof HTMLSpanElement) {
          return [...prev, nextElement];
        }
      }
      return prev;
    });
  };
  return (
    <div className="flex flex-col justify-between items-center w-full h-full px-4 py-2">
      <div className="bg-gray-800 rounded-md p-2">
        {firstNode &&
          getAllZhInLine(firstNode)?.map((tok, index) => (
            <span
              className="cursor-pointer hover:bg-red-400"
              key={index}
              onClick={(e) => {
                clearAllLineFocusStyle(zhToks);
                setZhToks([e.currentTarget]);
              }}
            >
              {tok}
            </span>
          ))}
      </div>
      <div className="flex flex-row justify-between items-center w-full h-full px-4 py-2">
        <button
          onClick={handleNavigateLeft}
          className="text-xl text-gray-800 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded-l"
        >
          {"<"}
        </button>
        <button className="text-xl text-gray-800 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded-r">
          {">"}
        </button>
        <button className="text-xl text-gray-800 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded-l">
          {"<"}
        </button>
        <button
          onClick={handleNavigateRight}
          className="text-xl text-gray-800 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded-r"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
