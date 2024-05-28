"use client";
import React, { useContext, useState } from "react";
import { EditBoxContext } from "../../contexts/EditBoxContext";
import ZhLine from "../ZhLine";
import EnTab from "./EnTab";
import ViTab from "./ViTab";

const LookupBar = () => {
  const [zhToks, setZhToks] = useState<HTMLSpanElement[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const { openLookupBar, setOpenLookupBar, firstNode } =
    useContext(EditBoxContext);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`fixed top-0 right-0 h-full bg-gray-700 dark:bg-gray-900 overflow-x-hidden transition-transform duration-500 ease-in-out ${
        openLookupBar ? "translate-x-0" : "translate-x-full"
      } w-4/5 md:w-1/3 z-50 opacity-100 shadow-lg`}
    >
      <div className="flex flex-col justify-center items-center w-full p-2 md:p-6">
        <header className="flex flex-row justify-between items-center w-full">
          <h1 className="text-3xl font-bold text-white">Lookup</h1>
          <button
            onClick={() => {
              setOpenLookupBar(false);
              setZhToks([]);
            }}
            className="text-3xl font-bold text-white hover:text-red-500 transition-colors duration-200 ease-in-out"
          >
            ×
          </button>
        </header>
        <section className="py-4">
          <h2 className="text-2xl font-bold text-white">Chinese</h2>
          <ZhLine zhToks={zhToks} setZhToks={setZhToks} firstNode={firstNode} />
        </section>
        <div className="text-white mb-4">
          Keyword: {zhToks.map((tok) => tok.textContent).join("")}
        </div>
        <div className="bg-gray-800 p-1 md:p-4 w-full h-full rounded-lg">
          <div className="flex flex-row justify-around items-center border-b border-gray-500 py-1 md:py-2 bg-gray-800 shadow-sm overflow-x-scroll">
            <button
              onClick={() => setActiveTab(0)}
              className={`px-6 py-2 text-xl rounded-md font-bold cursor-pointer transition duration-300 ease-in-out ${
                activeTab === 0
                  ? "bg-indigo-900 text-white shadow"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-6 py-2 text-xl rounded-md font-bold cursor-pointer transition duration-300 ease-in-out ${
                activeTab === 1
                  ? "bg-indigo-900 text-white shadow"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Vietnamese
            </button>
          </div>
          <div className="mt-4">
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
