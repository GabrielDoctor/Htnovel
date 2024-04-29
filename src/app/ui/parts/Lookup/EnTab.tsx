"use client";
import React, { useEffect, useState } from "react";
import { DictEntry } from "@/Types/dict";

export default function EnTab({ words }: { words: string }) {
  const [wordsInfo, setWordsInfo] = useState<DictEntry>();
  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch(`/api/lookup/en/${words}`, {
        method: "GET",
      });
      const data: DictEntry = await response.json();
      setWordsInfo(data);
    };
    if (words !== "") fetchTokens();
  }, [words]);

  return (
    <div className="bg-gray-700 shadow overflow-hidden sm:rounded-lg">
      <div className=" px-4 py-5 sm:px-6">
        <h1 className="text-lg leading-6 font-bold text-gray-300">
          Word: {wordsInfo?.word ?? "N/A"}
        </h1>
      </div>
      <div className="border-t border-gray-600">
        <dl>
          <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Pinyin</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {wordsInfo?.pinyin ?? "N/A"}
            </dd>
          </div>
          <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Phonetic</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {wordsInfo?.phonetic ?? "N/A"}
            </dd>
          </div>

          <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Kind: </dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {wordsInfo?.kind &&
                JSON.parse(wordsInfo?.kind)
                  .map((k: string) => {
                    return k ?? "N/A";
                  })
                  ?.join(", ")}
            </dd>
          </div>

          <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Means</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {wordsInfo?.content?.[0]?.means.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="font-semibold">Mean: {item.mean}</div>
                  <div className="text-gray-400">Explain: {item.explain}</div>
                  <div className="mt-2">
                    Example:
                    <ul className="list-disc pl-5 space-y-2">
                      {item.examples.map((exampleId, exampleIndex) => {
                        let example = wordsInfo.examples.find(
                          (e) => e.id === String(exampleId)
                        );
                        return (
                          <li key={exampleIndex} className="text-gray-400">
                            <div>Chinese: {example?.e ?? "N/A"}</div>
                            <div>Pinyin: {example?.p ?? "N/A"}</div>
                            <div>English: {example?.m ?? "N/A"}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </dd>
          </div>
          <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Lượng từ</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              <ol>
                <li>Measure: {wordsInfo?.measure?.measure ?? "N/A"}</li>
                <li>Example: {wordsInfo?.measure?.example ?? "N/A"}</li>
                <li>Pinyin: {wordsInfo?.measure?.pinyin ?? "N/A"}</li>
              </ol>
            </dd>
          </div>
          <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Anto: </dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              <div>{wordsInfo?.snym?.anto?.join(", ") ?? "N/A"}</div>
            </dd>
          </div>
          <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Syno: </dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              <div>{wordsInfo?.snym?.syno?.join(", ") ?? "N/A"}</div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
