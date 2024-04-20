export default function ZhItem({
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
      {zh && (
        <span zh={zh} vi={vi} pos={pos} className="font-bold">
          {`${zh} `}
        </span>
      )}
    </>
  );
}
