"use client";
import CvItem from "./CvItem";
import React, { useEffect } from "react";
import { ZhContext } from "../contexts/ToolBoxContext";
import { EditBoxContext } from "../contexts/EditBoxContext";
import ZhItem from "./ZhItem";
export default function CVline({ line }: { line: string }) {
  //const [zh, setZh] = useState(data);
  const { data, setData } = React.useContext(ZhContext);

  return (
    <div>
      <div>
        {data === "true" &&
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
