"use client";
import React, { MouseEventHandler } from "react";
import { EditBoxContext } from "../contexts/EditBoxContext";
export default function EditToolBar() {
  const { toolbarPos, HtmlNodes, setHtmlNodes, setOpenLookupBar } =
    React.useContext(EditBoxContext);
  const EditBoxRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    if (EditBoxRef.current) {
      const { width, height } = EditBoxRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
    console.log(toolbarPos);
  }, []);
  const style = {
    top: `${toolbarPos.top - size.height + 1}px`,
    left: `${toolbarPos.left - size.width / 2}px`,
  };

  const handleNavigateLeft: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    setHtmlNodes((prev) => {
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

  const handleNavigateRight: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    setHtmlNodes((prev) => {
      if (prev && prev.length >= 1) {
        const nextElement = prev[prev.length - 1].nextElementSibling;
        if (nextElement instanceof HTMLSpanElement) {
          return [...prev, nextElement];
        }
      }
      return prev;
    });
  };

  const handleOpenLookup: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpenLookupBar((prev) => !prev);
  };
  if (!HtmlNodes || toolbarPos.top === 0) return null;

  return (
    <div
      ref={EditBoxRef}
      className="flex items-center justify-between gap-x-2 absolute bg-gray-800 rounded-lg text-white shadow-lg z-50 px-1 py-1"
      style={style}
    >
      <button
        onClick={handleNavigateLeft}
        className="bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md px-3 py-1 transition duration-300 ease-in-out"
      >
        {"<"}
      </button>
      <button
        onClick={handleOpenLookup}
        className="bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md px-3 py-1 transition duration-300 ease-in-out"
      >
        Tra từ
      </button>
      <button
        onClick={handleNavigateRight}
        className="bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md px-3 py-1 transition duration-300 ease-in-out"
      >
        {">"}
      </button>
    </div>
  );
}
