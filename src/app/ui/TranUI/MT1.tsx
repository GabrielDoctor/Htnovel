"use client";
import { useEffect, useState, useContext } from "react";
import CVline from "../parts/CvLine";
import { ZhProvider } from "../contexts/ToolBoxContext";

export default function MT1({ chapter_id }: { chapter_id: string }) {
  const [Tokens, setTokens] = useState("");
  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch(`/api/chapter/${chapter_id}/translate`, {
        method: "GET",
      });
      const tokens = await response.json();
      console.log(tokens);
      setTokens(tokens.text);
    };
    fetchTokens();
  }, [chapter_id]);

  return (
    <div>
      {Tokens !== "" &&
        Tokens.split("\n").map((token, index) => (
          <CVline key={index} line={token} />
        ))}
    </div>
  );
}
