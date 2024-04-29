"use client";
import * as React from "react";
import EditToolBar from "./EditToolBar";
import { EditBoxContext } from "../contexts/EditBoxContext";

export default function CvItem({
  zh,
  vi,
  pos,
}: {
  zh: string;
  vi: string;
  pos: string;
}) {
  // const itemRef = React.useRef<HTMLSpanElement>(null);
  const { setHtmlNodes, setToolbarPos, setFirstNode, setOpenLookupBar } =
    React.useContext(EditBoxContext);

  // Create a unique identifier for this CvItem
  //const id = React.useMemo(() => `${pos}-${zh}`, [pos, zh]);

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setToolbarPos({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setHtmlNodes([event.currentTarget]);
    setFirstNode(event.currentTarget);
    setOpenLookupBar(false);
  };

  return (
    <>
      {vi && (
        <span
          // ref={itemRef}
          data-zh={zh}
          data-pos={pos}
          className="font-bold relative cursor-pointer hover:underline"
          onClick={handleClick}
        >
          {`${vi} `}
        </span>
      )}
    </>
  );
}
