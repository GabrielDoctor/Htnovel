"use client";
import CvItem from "./CvItem";
import React, { useEffect } from "react";
import { ZhContext } from "../contexts/ToolBoxContext";
import ZhItem from "./ZhItem";
export default function CVline({ line }: { line: string }) {
  //const [zh, setZh] = useState(data);
  const { data, setData } = React.useContext(ZhContext);

  return (
    <div>
      <p>
        {data === "true" &&
          line.split("\t\t\t").map((item) => {
            const parts = item.split("  ");
            const vi = parts[0];
            const zh = parts[1];
            const pos = parts[2];
            return <ZhItem key={item} zh={zh} vi={vi} pos={pos} />;
          })}
      </p>
      <p>
        {line.split("\t\t\t").map((item) => {
          const parts = item.split("  ");
          const vi = parts[0];
          const zh = parts[1];
          const pos = parts[2];
          return <CvItem key={item} zh={zh} vi={vi} pos={pos} />;
        })}
      </p>
    </div>
  );
}
