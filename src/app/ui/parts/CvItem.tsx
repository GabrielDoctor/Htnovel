export default function CvItem({
  zh,
  vi,
  pos,
}: {
  zh: string;
  vi: string;
  pos: string;
}) {
  return (
    <>
      {vi && (
        <span zh={zh} pos={pos} className="font-bold">
          {`${vi} `}
        </span>
      )}
    </>
  );
}
