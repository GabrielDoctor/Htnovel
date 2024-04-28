"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
export const ZhContext = createContext({
  data: "true",
  setData: (data: string) => {},
});
export function ZhProvider({ children }: any) {
  const [data, setData] = useState("false");

  useEffect(() => {
    const storedData =
      typeof window !== "undefined" ? localStorage.getItem("display_zh") : null;
    setData(storedData ?? "false");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("display_zh", data);
    }
  }, [data]);

  const value = { data, setData };

  return <ZhContext.Provider value={value}>{children}</ZhContext.Provider>;
}
