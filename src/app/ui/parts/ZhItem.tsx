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
        <span data-zh={zh} data-vi={vi} data-pos={pos} className="font-bold">
          {`${zh} `}
        </span>
      )}
    </>
  );
}
