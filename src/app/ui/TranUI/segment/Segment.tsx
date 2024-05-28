import { useEffect, useState } from "react";
import { translate } from "@/utils/translate_api";
import { TransOption, useSettings } from "../../contexts/SettingContext";
import CvItem from "../../parts/CvItem";
import { Spinner } from "flowbite-react";
type SegmentProps = {
  segment: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Segment({ segment, setIsLoading }: SegmentProps) {
  const { language, transOption } = useSettings().readingSetting;
  const { chineseAlongside } = useSettings().readingSetting;
  const [translatedTextArr, setTranslatedTextArr] = useState<string[]>([]);
  const [originTextArr, setOriginTextArr] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    async function translate_segment(segment: string) {
      const translated = await translate(segment, language, "", transOption);
      const translatedLines = translated ? translated.split("\n") : [];
      const originalLines = segment.split("\n");
      setTranslatedTextArr(translatedLines);
      setOriginTextArr(originalLines);
    }
    translate_segment(segment);
  }, [segment, language, transOption]);
  useEffect(() => {
    if (translatedTextArr.length > 0) setIsLoading(false);
  }, [translatedTextArr]);
  return (
    <div className="flex flex-col justify-center items-start h-full w-full ">
      {translatedTextArr.length > 0 ? (
        translatedTextArr.map((item, index) => (
          <div key={index}>
            {chineseAlongside && (
              <div>
                {originTextArr[index] &&
                  originTextArr[index]
                    .split("")
                    .map((item, index) => (
                      <CvItem
                        key={item + index}
                        zh={item}
                        vi={item}
                        pos={index.toString()}
                      />
                    ))}
              </div>
            )}
            <p>{item}</p>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner color="info" aria-label="Spinner" />
        </div>
      )}
    </div>
  );
}
