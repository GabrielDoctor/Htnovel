"use client";
import React from "react";
import { ZhContext } from "./contexts/ToolBoxContext";
export default function Test() {
  const { data } = React.useContext(ZhContext);
  return <div>{data}</div>;
}
