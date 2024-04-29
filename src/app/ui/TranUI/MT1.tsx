"use client";
import { useEffect, useState, useContext } from "react";
import CVline from "../parts/CvLine";
import EditToolBar from "../parts/EditToolBar";
import LookupBar from "../parts/Lookup/LookupBar";
import { EditBoxContext } from "../contexts/EditBoxContext";

export default function MT1({ chapter_id }: { chapter_id: string }) {
  const [Tokens, setTokens] = useState<string | null>(null);
  const { openLookupBar, setOpenLookupBar, toolbarPos, setToolbarPos } =
    useContext(EditBoxContext);

  // Function to fetch tokens
  const fetchTokens = async (chapter_id: string) => {
    try {
      const response = await fetch(`/api/chapter/${chapter_id}/translate`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const tokens = await response.json();
      setTokens(tokens.text);
    } catch (e) {
      console.error("Fetch failed: ", e);
    }
  };

  useEffect(() => {
    fetchTokens(chapter_id);
  }, [chapter_id]);

  // function to handle click event
  const handleClick = () => {
    setOpenLookupBar(false);
    setToolbarPos({ top: 0, left: 0 });
  };

  return (
    <div onClick={handleClick}>
      {JSON.stringify(toolbarPos)}
      <LookupBar />
      {!openLookupBar && toolbarPos.top !== 0 && <EditToolBar />}
      {Tokens !== null &&
        Tokens.split("\n").map((token, index) => (
          <CVline key={index} line={token} />
        ))}
    </div>
  );
}
