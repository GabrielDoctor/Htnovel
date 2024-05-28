"use client";
import { useState } from "react";
import { Textarea, Button, Card } from "flowbite-react";
import { TransOption, useSettings } from "../ui/contexts/SettingContext";
import { translate } from "@/utils/translate_api";

export default function Translate() {
  const [text, setText] = useState("");
  const { language } = useSettings().readingSetting;
  const [translatedText, setTranslatedText] = useState("");
  const [transOption, setTransOption] = useState(TransOption.Bing);

  const handleTranslate = async () => {
    try {
      const data = await translate(text, language, "", transOption);
      setTranslatedText(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-white dark:bg-gray-800 px-1 py-1 md:px-8 md:py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Translator
        </h2>
        <div className="flex flex-row justify-center items-center gap-4">
          <label
            htmlFor="translationOptions"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            Translation Service:
          </label>
          <select
            className="  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={(e) => setTransOption(e.target.value)}
            name="translationOptions"
            id="translationOptions"
          >
            {Object.values(TransOption).map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Textarea
          id="translate-input"
          placeholder="Enter text need translate here..."
          rows={5}
          onChange={handleInput}
          value={text}
          color="light"
        />
        <div className="flex justify-center my-4">
          <Button gradientMonochrome="info" onClick={handleTranslate}>
            Translate
          </Button>
        </div>
        <Textarea
          id="translate-output"
          placeholder="Text is translated..."
          rows={5}
          value={translatedText}
          readOnly
          color="light"
        />
      </Card>
    </div>
  );
}
