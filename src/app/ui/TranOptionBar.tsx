"use client";
import { useState } from "react";
import { useSettings } from "./contexts/SettingContext";
import { TransOption } from "./contexts/SettingContext";
import { Button } from "flowbite-react"; // Import Flowbite Button component

export default function TranOptionBar() {
  const { readingTheme, theme, readingSetting, setReadingSetting } =
    useSettings();
  const { transOption } = readingSetting;
  const [curTransOption, setTransOption] = useState<TransOption>(transOption);

  const handleTransOptionChange = (option: TransOption) => {
    setTransOption(option);
    setReadingSetting({ ...readingSetting, transOption: option });
  };

  const isActive = (option: TransOption) => curTransOption === option;

  return (
    <div
      className={`flex flex-col justify-center items-center gap-5 w-full p-4 ${
        theme === "dark"
          ? readingTheme.backgroundColor.dark
          : readingTheme.backgroundColor.light
      }`}
    >
      <h3 className="text-sm font-bold mb-4 text-orange-400 italic">
        Choose the translation mode for the best experience.
      </h3>
      <div className="flex flex-row items-center">
        <h3
          className={`text-sm font-bold mr-4 italic ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Third-party translation:
        </h3>
        <div className="flex gap-2">
          <Button
            color={isActive(TransOption.Bing) ? "purple" : "blue"}
            onClick={() => handleTransOptionChange(TransOption.Bing)}
          >
            Bing
          </Button>
          <Button
            color={isActive(TransOption.Google) ? "purple" : "blue"}
            onClick={() => handleTransOptionChange(TransOption.Google)}
          >
            Google
          </Button>
          <Button
            color={isActive(TransOption.Baidu) ? "purple" : "blue"}
            onClick={() => handleTransOptionChange(TransOption.Baidu)}
          >
            Baidu
          </Button>
          <Button
            color={isActive(TransOption.Gpt) ? "purple" : "blue"}
            onClick={() => handleTransOptionChange(TransOption.Gpt)}
          >
            GPT
          </Button>
        </div>
      </div>
      {readingSetting.language === "vi" && (
        <div className="flex flex-row items-center">
          <h3
            className={`text-sm font-bold mr-4 italic ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Vietnamese only:
          </h3>
          <div className="flex gap-2">
            <Button
              style={{
                borderWidth: "1px",
                borderColor: "purple",
              }}
              color={isActive(TransOption.STV) ? "purple" : "blue"}
              onClick={() => handleTransOptionChange(TransOption.STV)}
            >
              STV
            </Button>
            <Button
              style={{
                borderWidth: "1px",
                borderColor: "purple",
              }}
              color={isActive(TransOption.GPT_CHIVI) ? "purple" : "blue"}
              onClick={() => handleTransOptionChange(TransOption.GPT_CHIVI)}
            >
              GPT tiên hiệp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
