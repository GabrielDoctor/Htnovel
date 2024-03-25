"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Content } from "next/font/google";
export default function BingTransBtn({ content }: { content: string }) {
  const BingTrans = async () => {
    let lines = content.split("<br/>");
    let transText = "";
    lines.forEach(async (line) => {
      const res = await fetch("https://webmail.smartlinkcorp.com/dotrans.php", {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: "dir=zh-CN/vi&provider=microsoft&text=" + line,
        method: "POST",
      });
      let transLine = await res.text();
      transText = transText + transLine + "\n";
    });

    console.log(transText);
    let chapter_content = document.getElementById("chapter_content");
    if (chapter_content) {
      let cleanText = transText.split("\n").join("");
      console.log(cleanText);
      chapter_content.textContent = cleanText || transText;
    }
  };
  return (
    <Button variant="contained" color="success" onClick={BingTrans}>
      Bing
    </Button>
  );
}
