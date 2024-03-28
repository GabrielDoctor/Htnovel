"use client";
export default function ChapterContent({ title, content }) {
  return (
    <>
      <h1 className="text-4xl font-bold">{title}</h1>
      {content?.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </>
  );
}
