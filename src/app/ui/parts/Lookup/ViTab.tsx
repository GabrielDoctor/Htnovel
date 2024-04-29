"use client";
import React, { useEffect, useState } from "react";
import { DictEntry } from "@/Types/dict";
import { join } from "path";

export default function EnTab({ words }: { words: string }) {
  const [wordsInfo, setWordsInfo] = useState<DictEntry>();
  const kinds = {
    numb: "Số từ",
    n: "Danh từ",
    dist: "Từ phân loại",
    measure: "Lượng từ",
    v: "Động từ",
    part: "Tiểu/Trợ từ",
    adj: "Tính từ",
    onom: "Từ tượng thanh",
    time: "Từ chỉ thời gian",
    punct: "Dấu câu",
    intj: "Thán từ",
    mpart: "Trợ/tiểu từ thuộc trạng/lối, trợ/tiểu từ ngữ khí",
    conj: "Liên Từ",
    adv: "Phó từ",
    suff: "Hậu tố",
    stt: "Từ trạng thái",
    pro: "Đại từ",
    prep: "Giới từ",
    nlocal: "Danh từ chỉ vị trí",
    locativ: "Từ mượn",
    pref: "Tiền tố",
    idioms: "Thành ngữ",
    class: "Từ chỉ số lượng",
    proverb: "Tục ngữ",
    sv: "Động từ li hợp",
    locution: "Quán dụng ngữ",
    allegorical: "Yết hậu ngữ",
    av: "Trợ động từ",
    adage: "Ngạn ngữ",
    phrase: "Cụm từ",
    sentence: "Câu",
  };
  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch(`/api/lookup/vi/${words}`, {
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
      <div className="border-t border-gray-700">
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
            <dt className="text-sm font-medium text-gray-300">Hán việt</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {typeof wordsInfo?.cn_vi === "string"
                ? wordsInfo.cn_vi.split(".").join(", ")
                : "N/A"}
            </dd>
          </div>
          <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Tu loai: </dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {wordsInfo?.kind &&
                JSON.parse(wordsInfo?.kind)
                  .map((k: string) => {
                    return kinds[k as keyof typeof kinds] ?? "N/A";
                  })
                  .join(", ")}
            </dd>
          </div>

          <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Giải nghĩa</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {wordsInfo?.content?.[0]?.means.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="font-semibold">Nghĩa: {item.mean}</div>
                  <div className="text-gray-400">
                    Giải thích: {item.explain}
                  </div>
                  <div className="mt-2">
                    Ví dụ:
                    <ul className="list-disc pl-5 space-y-2">
                      {item.examples.map((exampleId, exampleIndex) => {
                        let example = wordsInfo.examples.find(
                          (e) => e.id === String(exampleId)
                        );
                        return (
                          <li key={exampleIndex} className="text-gray-400">
                            <div>Chinese: {example?.e ?? "N/A"}</div>
                            <div>Pinyin: {example?.p ?? "N/A"}</div>
                            <div>Vietnamese: {example?.m ?? "N/A"}</div>
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
                <li>{wordsInfo?.measure?.measure ?? "N/A"}</li>
                <li>Vi du: {wordsInfo?.measure?.example ?? "N/A"}</li>
                <li>Pinyin: {wordsInfo?.measure?.pinyin ?? "N/A"}</li>
              </ol>
            </dd>
          </div>
          <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">
              Tu dong nghia:{" "}
            </dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              <div>{wordsInfo?.snym?.anto?.join(", ") ?? "N/A"}</div>
            </dd>
          </div>
          <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">
              Tu trai nghia:{" "}
            </dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              <div>{wordsInfo?.snym?.syno?.join(", ") ?? "N/A"}</div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
