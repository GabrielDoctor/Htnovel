"use client";
import { useState, useEffect } from "react";
export default function Translate() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  function capitalizeAfterPunctuation(text) {
    const regex = /([.?!'"()])[\s]([a-z])/g;
    const regex2 = /(^[\["']\s*)([a-z])/g;
    function replacer(match, p1, p2) {
      return p1 + " " + p2.toUpperCase();
    }
    text = text.replace(regex, replacer);
    text = text.replace(regex2, replacer);
    text = text.replaceAll(/\n\w/g, (match) => match.toUpperCase());

    return text;
  }

  const handleTranslate = async () => {
    try {
      const response = await fetch("/api/translate/text", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: text,
      });
      const data = await response.text();
      console.log(data);
      setTranslatedText(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <textarea
        onChange={handleInput}
        value={text}
        className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        rows="15"
        cols={"80"}
        placeholder="Enter multi-line text here..."
      />
      <button
        onClick={handleTranslate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 ease-in-out m-4"
      >
        Translate
      </button>
      {translatedText && (
        <textarea
          value={capitalizeAfterPunctuation(translatedText)}
          className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          rows="15"
          cols={"80"}
          readOnly
          placeholder="Enter multi-line text here..."
        ></textarea>
      )}
    </div>
  );
}
