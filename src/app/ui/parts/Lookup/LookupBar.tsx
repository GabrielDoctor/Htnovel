"use client";
import React, { useEffect } from "react";
import { EditBoxContext } from "../../contexts/EditBoxContext";
import {
  addFocusStyle,
  getAllTokenInLine,
  getAllZhInLine,
} from "@/utils/utils";
import ZhLine from "../ZhLine";
import EnTab from "./EnTab";
import ViTab from "./ViTab";
const LookupBar = () => {
  const [zhToks, setZhToks] = React.useState<HTMLSpanElement[]>([]);
  const [lookupData, setLookupData] = React.useState<any[]>([]);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const { openLookupBar, setOpenLookupBar, firstNode } =
    React.useContext(EditBoxContext);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`fixed top-0 right-0 h-full  bg-gray-700 dark:bg-gray-900 overflow-x-hidden transition-transform duration-500 ${
        openLookupBar ? "translate-x-0" : "translate-x-full"
      } w-4/5 md:w-1/3 z-50 opacity-100`}
    >
      <div className="flex flex-col justify-center items-center w-full p-2 md:p-6">
        <header className="flex flex-row justify-between items-center w-full h-full ">
          <h1 className="text-3xl font-bold text-white">Lookup</h1>
          <button onClick={() => setOpenLookupBar(false)}>X</button>
        </header>
        <section>
          <h1 className="text-2xl font-bold text-white">Chinese</h1>
          <ZhLine zhToks={zhToks} setZhToks={setZhToks} firstNode={firstNode} />
        </section>
        <div>Keyword: {zhToks.map((tok) => tok.textContent).join("")}</div>
        <div className="bg-gray-800 p-1 md:p-4 w-full h-full rounded-lg">
          <div className="flex flex-row justify-around items-center border-b border-gray-500 py-1 md:py-2  bg-gray-800 shadow-sm overflow-scroll">
            <button
              onClick={() => setActiveTab(0)}
              className={`px-6 py-2 text-xl rounded-md font-bold cursor-pointer transition duration-300 ease-in-out ${
                activeTab === 0
                  ? "bg-indigo-900 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-500 hover:text-gray-800"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-6 py-2 text-xl rounded-md font-bold cursor-pointer transition duration-300 ease-in-out ${
                activeTab === 1
                  ? "bg-indigo-900 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-500 hover:text-gray-800"
              }`}
            >
              Vietnamese
            </button>
          </div>
          <div>
            {activeTab === 0 ? (
              <EnTab words={zhToks.map((tok) => tok.textContent).join("")} />
            ) : (
              <ViTab words={zhToks.map((tok) => tok.textContent).join("")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookupBar;
