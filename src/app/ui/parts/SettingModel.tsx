import React, { useState } from "react";
import { Modal, Button, ToggleSwitch, TextInput } from "flowbite-react";
import Image from "next/image";
import { useSettings } from "../contexts/SettingContext";
import Cookies from "js-cookie";
export const languages_baidu = {
  Auto: "auto",
  Chinese: "zh",
  English: "en",
  Cantonese: "yue",
  ClassicalChinese: "wyw",
  Japanese: "jp",
  Korean: "kor",
  French: "fra",
  Spanish: "spa",
  Thai: "th",
  Arabic: "ara",
  Russian: "ru",
  Portuguese: "pt",
  German: "de",
  Italian: "it",
  Greek: "el",
  Dutch: "nl",
  Polish: "pl",
  Bulgarian: "bul",
  Estonian: "est",
  Danish: "dan",
  Finnish: "fin",
  Czech: "cs",
  Romanian: "rom",
  Slovenia: "slo",
  Swedish: "swe",
  Hungarian: "hu",
  TraditionalChinese: "cht",
  Vietnamese: "vie",
};

export const languages_google = {
  auto: "Automatic",
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  ny: "Chichewa",
  "zh-cn": "Chinese Simplified",
  "zh-tw": "Chinese Traditional",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  iw: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  ko: "Korean",
  ku: "Kurdish (Kurmanji)",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  no: "Norwegian",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  gd: "Scots Gaelic",
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};

const SettingsModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    theme,
    toggleTheme,
    readingTheme,
    setReadingTheme,
    systemTheme,
    setSystemTheme,
    readingSetting,
    setReadingSetting,
  } = useSettings();
  const overlayClasses = [
    "bg-gradient-to-tr from-purple-900/80 via-transparent to-purple-700/80 text-black dark:text-white",

    "bg-gradient-to-br from-blue-900/70 via-transparent to-blue-400/70 text-black dark:text-white",

    "bg-gradient-to-tl from-orange-400/50 via-transparent to-pink-500/50 text-black dark:text-white",

    "bg-gradient-to-tl from-green-900/80 via-transparent to-cyan-600/80 text-black dark:text-white",

    "bg-gradient-to-tl from-pink-700/80 via-transparent to-indigo-600/80 text-black dark:text-white",

    "bg-gradient-to-bl from-yellow-600/50 via-transparent to-red-500/70 text-black dark:text-white",

    "bg-gradient-to-tl from-black via-transparent to-white text-black dark:text-white",

    "bg-white bg-opacity-90",
    "bg-amber-50 text-gray-600",

    "bg-black bg-opacity-50 text-white",
  ];
  const fontSizeClasses = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
  ];
  const fontSizeNames = [
    "Very small",
    "Small",
    "Normal",
    "Large",
    "Very large",
    "Extra large",
  ];

  const initOverlay = overlayClasses.includes(systemTheme.transparentOverlay)
    ? systemTheme.transparentOverlay
    : "bg-black bg-opacity-50";
  const [selectedOverlayClass, setSelectedOverlayClass] = useState(initOverlay);

  const initFontSize = fontSizeClasses.includes(readingTheme.fontSize)
    ? readingTheme.fontSize
    : "text-base";
  const [selectedFontSizeClass, setSelectedFontSizeClass] =
    useState(initFontSize);

  const initSystemFontFamily = systemTheme.fontFamily
    ? systemTheme.fontFamily
    : "'Roboto', sans-serif";
  const [selectedSystemFontFamily, setSelectedSystemFontFamily] =
    useState(initSystemFontFamily);

  const increaseFontSize = () => {
    const index = fontSizeClasses.indexOf(selectedFontSizeClass);
    if (index < fontSizeClasses.length - 1) {
      const newFontSizeClass = fontSizeClasses[index + 1];
      setSelectedFontSizeClass(newFontSizeClass);
      setReadingTheme({
        ...readingTheme,
        fontSize: newFontSizeClass,
      });
    }
  };
  const [apiKey, setApiKey] = useState("");
  const GPTModels = [
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo",
    "gpt-4",
    "gpt-4-turbo",
    "gpt-4o",
  ];
  const [selectedModel, setSelectedModel] = useState<string>(
    Cookies.get("model") || "gpt-3.5-turbo"
  );

  const decreaseFontSize = () => {
    const index = fontSizeClasses.indexOf(selectedFontSizeClass);
    if (index > 0) {
      const newFontSizeClass = fontSizeClasses[index - 1];
      setSelectedFontSizeClass(newFontSizeClass);
      setReadingTheme({
        ...readingTheme,
        fontSize: newFontSizeClass,
      });
    }
  };
  const initReadingFontFamily = readingTheme.fontFamily
    ? readingTheme.fontFamily
    : "'Roboto', sans-serif";
  const [selectedReadingFontFamily, setSelectedReadingFontFamily] = useState(
    initReadingFontFamily
  );

  const fontColorClasses = [
    "text-black",
    "text-gray-500",
    "text-white",
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
  ];
  const readingBackgroundColors = [
    { light: "bg-white", dark: "bg-black" },
    { light: "bg-gray-100", dark: "bg-gray-800" },
    { light: "bg-blue-100", dark: "bg-blue-800" },
    { light: "bg-green-100", dark: "bg-green-800" },
    { light: "bg-red-100", dark: "bg-red-800" },
    { light: "bg-yellow-100", dark: "bg-yellow-800" },
    { light: "bg-purple-100", dark: "bg-purple-800" },
    { light: "bg-indigo-100", dark: "bg-indigo-800" },
    { light: "bg-pink-100", dark: "bg-pink-800" },
  ];

  const initReadingBackgroundColor = readingBackgroundColors.includes(
    readingTheme.backgroundColor
  )
    ? readingTheme.backgroundColor
    : { light: "bg-gray-50", dark: "bg-gray-800" };

  const [selectedReadingBackgroundColor, setSelectedReadingBackgroundColor] =
    useState(initReadingBackgroundColor);

  const initFontColor = fontColorClasses.includes(readingTheme.fontColor)
    ? readingTheme.fontColor
    : "text-black";

  const [selectedFontColorClass, setSelectedFontColorClass] =
    useState(initFontColor);

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newColorClass = event.target.value;
    setSelectedFontColorClass(newColorClass);
  };
  const saveApiKey = async () => {
    const json = {
      key: apiKey,
      model: selectedModel,
    };
    const res = await fetch("/api/api_key", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if (res.ok) {
      alert("Save key successfully!!");
    } else {
      alert("Internal server error");
    }
  };
  const lineHeightClasses = [
    "leading-none",
    "leading-tight",
    "leading-snug",
    "leading-normal",
    "leading-relaxed",
    "leading-loose",
  ];
  const lineHeightNames = [
    "none",
    "tight",
    "snug",
    "normal",
    "relaxed",
    "loose",
  ];
  const initLineHeight = lineHeightClasses.includes(readingTheme.lineHeight)
    ? readingTheme.lineHeight
    : "leading-5";
  const [selectedLineHeight, setSelectedLineHeight] = useState(initLineHeight);

  const increaseLineHeight = () => {
    const index = lineHeightClasses.indexOf(selectedLineHeight);
    if (index < lineHeightClasses.length - 1) {
      const newLineHeight = lineHeightClasses[index + 1];
      setSelectedLineHeight(newLineHeight);
      setReadingTheme({
        ...readingTheme,
        lineHeight: newLineHeight,
      });
    }
  };

  const decreaseLineHeight = () => {
    const index = lineHeightClasses.indexOf(selectedLineHeight);
    if (index > 0) {
      const newLineHeight = lineHeightClasses[index - 1];
      setSelectedLineHeight(newLineHeight);
      setReadingTheme({
        ...readingTheme,
        lineHeight: newLineHeight,
      });
    }
  };

  const [chineseLine, setChineseLine] = useState(
    readingSetting.chineseAlongside ? readingSetting.chineseAlongside : false
  );
  const handleChineseLineChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChineseLine(!event.target.checked);
  };

  const [selectedLanguage, setSelectedLanguage] = React.useState(
    readingSetting.language
  );

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
    setReadingSetting({ ...readingSetting, language: event.target.value });
  };

  return (
    <Modal
      className="fixed inset-0"
      show={isOpen}
      size="lg"
      position={"center"}
      onClose={() => setIsOpen(false)}
    >
      <Modal.Header>
        <div className="flex gap-2 items-center justify-center">
          <span>
            <Image
              src={"/images/setting_2.svg"}
              width={30}
              height={30}
              alt="Setting icon 2"
            />
          </span>
          <h1>Website Settings</h1>
        </div>
        {/* <div>
          <pre>{JSON.stringify(systemTheme, null, 2)}</pre>
          <pre>{JSON.stringify(readingTheme, null, 2)}</pre>
          <pre>{JSON.stringify(readingSetting, null, 2)}</pre>
        </div> */}
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">
              System UI
            </h3>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <span className="text-md font-medium">Darkmode:</span>
            <ToggleSwitch
              onChange={() => toggleTheme()}
              checked={theme === "dark" ? true : false}
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium">Overlay: </span>
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowY: "scroll",
                msOverflowStyle: "none" /* IE and Edge */,
                scrollbarWidth: "none" /* Firefox */,
              }}
              className="flex gap-2  p-2 sm:p-4 transition-all duration-300 ease-in-out"
            >
              {overlayClasses.map((overlayClass, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedOverlayClass(overlayClass);
                    setSystemTheme({
                      ...systemTheme,
                      transparentOverlay: overlayClass,
                    });
                  }}
                  className={`h-8 w-8 min-h-8 min-w-8 rounded-full cursor-pointer transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-gray-800 ${overlayClass} ${
                    selectedOverlayClass === overlayClass
                      ? "ring-2 ring-offset-2 ring-offset-gray-300 ring-gray-800 shadow-lg"
                      : "shadow-sm"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium ">Font Family:</span>
            <select
              value={selectedSystemFontFamily}
              onChange={(e) => {
                setSelectedSystemFontFamily(e.target.value);
                setSystemTheme({ ...systemTheme, fontFamily: e.target.value });
              }}
              className="w-40 p-2 dark:text-black bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Garamond, serif">Garamond</option>
              <option value="'Merriweather', serif">Merriweather</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'PT Serif', serif">PT Serif</option>
              <option value="sans-serif">Sans-Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
          <hr className="my-0 border-t border-gray-300" />
          <div>
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">
              Reading UI
            </h3>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium">Font Size: </span>
            <div className="flex flex-row items-center gap-2 justify-between">
              <button
                disabled={fontSizeClasses.indexOf(selectedFontSizeClass) === 0}
                onClick={() => {
                  decreaseFontSize();
                }}
                className="h-10 w-10 rounded-md bg-lime-700 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150 shadow-md flex items-center justify-center"
              >
                <span className="text-xl text-gray-700 select-none">−</span>
              </button>
              <span className="text-md min-w-24 text-center font-medium text-slate-600 dark:text-slate-400">
                {fontSizeNames[fontSizeClasses.indexOf(selectedFontSizeClass)]}
              </span>
              <button
                disabled={
                  fontSizeClasses.indexOf(selectedFontSizeClass) ===
                  fontSizeClasses.length - 1
                }
                onClick={() => {
                  increaseFontSize();
                }}
                className="h-10 w-10 rounded-md bg-lime-700 hover:bg-lime-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150 shadow-md flex items-center justify-center"
              >
                <span className="text-xl text-gray-700 select-none">+</span>
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium ">Font Family:</span>
            <select
              value={selectedReadingFontFamily}
              onChange={(e) => {
                setSelectedReadingFontFamily(e.target.value);
                setReadingTheme({
                  ...readingTheme,
                  fontFamily: e.target.value,
                });
              }}
              className="w-40 p-2 dark:text-black bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Garamond, serif">Garamond</option>
              <option value="'Merriweather', serif">Merriweather</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'PT Serif', serif">PT Serif</option>
              <option value="sans-serif">Sans-Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium ">Font Color:</span>
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowY: "scroll",
                msOverflowStyle: "none" /* IE and Edge */,
                scrollbarWidth: "none" /* Firefox */,
              }}
            >
              {fontColorClasses.map((color, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedFontColorClass(color);
                    setReadingTheme({
                      ...readingTheme,
                      fontColor: color,
                    });
                  }}
                  className={`mx-1 h-10 w-10 min-h-10 min-w-10 my-2 d rounded-md bg-orange-300 dark:bg-slate-600 ${color} ${
                    selectedFontColorClass === color
                      ? "ring-2 ring-lime-500"
                      : ""
                  }`}
                >
                  Aa
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-0">
            <span className="text-md font-medium m-0 p-0">
              Background Color:{" "}
            </span>
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowY: "scroll",
                msOverflowStyle: "none" /* IE and Edge */,
                scrollbarWidth: "none" /* Firefox */,
              }}
              className="flex p-2 sm:p-4 transition-all duration-300 ease-in-out"
            >
              {readingBackgroundColors.map((bgColor, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedReadingBackgroundColor(bgColor);
                    setReadingTheme({
                      ...readingTheme,
                      backgroundColor: bgColor,
                    });
                  }}
                  className={`h-8 w-8 min-h-8 min-w-8 rounded-full cursor-pointer transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-gray-800 ${
                    theme === "dark" ? bgColor.dark : bgColor.light
                  } ${
                    readingTheme.backgroundColor.dark === bgColor.dark
                      ? "ring-2 ring-offset-2 ring-offset-gray-300 ring-gray-800 shadow-lg"
                      : "shadow-sm"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium">Line height:</span>
            <div className="flex flex-row items-center gap-2 justify-between">
              <button
                disabled={lineHeightClasses.indexOf(selectedLineHeight) === 0}
                onClick={() => {
                  decreaseLineHeight();
                }}
                className="h-10 w-10 rounded-md bg-lime-700 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150 shadow-md flex items-center justify-center"
              >
                <span className="text-xl text-gray-700 select-none">−</span>
              </button>
              <span className="text-md min-w-24 text-center font-medium text-slate-900 dark:text-slate-600">
                {lineHeightNames[lineHeightClasses.indexOf(selectedLineHeight)]}
              </span>
              <button
                disabled={
                  lineHeightClasses.length - 1 ===
                  lineHeightClasses.indexOf(selectedLineHeight)
                }
                onClick={() => {
                  increaseLineHeight();
                }}
                className="h-10 w-10 rounded-md bg-lime-700 hover:bg-lime-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150 shadow-md flex items-center justify-center"
              >
                <span className="text-xl text-gray-700 select-none">+</span>
              </button>
            </div>
          </div>
          <hr className="my-0 border-t border-gray-300" />
          <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">
            Reading Mode
          </h3>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium ">Chinese-X parallel:</span>
            <label className="flex items-center cursor-pointer">
              <ToggleSwitch
                checked={readingSetting.chineseAlongside}
                onChange={() => {
                  setReadingSetting({
                    ...readingSetting,
                    chineseAlongside: !readingSetting.chineseAlongside,
                  });
                }}
              />
            </label>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium ">Language:</span>
            <select
              className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {Object.entries(languages_google).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">
            AI Translation
          </h3>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium ">OpenAI key:</span>
            <div className="flex flex-row justify-start gap-1">
              <TextInput
                id="api_key"
                type="text"
                placeholder="Enter your API key"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setApiKey(e.target.value)
                }
              />
            </div>
            <Button color="blue" onClick={saveApiKey}>
              Save
            </Button>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-md font-medium ">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {GPTModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
