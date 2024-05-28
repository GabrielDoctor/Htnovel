"use client";
import CvItem from "./CvItem";
import React, { useEffect } from "react";
import ZhItem from "./ZhItem";
import { useSettings } from "../contexts/SettingContext";
export default function CVline({ line }: { line: string }) {
  //const [zh, setZh] = useState(data);
  const { readingSetting } = useSettings();

  return (
    <div>
      <div>
        {readingSetting.chineseAlongside === true &&
          line.split("\t\t\t").map((item) => {
            const parts = item.split("  ");
            if (parts.length < 3) {
              return null;
            }
            const vi = parts[0];
            const zh = parts[1];
            const pos = parts[2];
            return <ZhItem key={item} zh={zh} vi={vi} pos={pos} />;
          })}
      </div>
      <div>
        {line.split("\t\t\t").map((item) => {
          const parts = item.split("  ");
          if (parts.length < 3) {
            return null;
          }
          const vi = parts[0];
          const zh = parts[1];
          const pos = parts[2];
          return <CvItem key={item} zh={zh} vi={vi} pos={pos} />;
        })}
      </div>
    </div>
  );
}
