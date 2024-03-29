import Image from "next/image";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function BookCard({
  title,
  author,
  imageUrl,
  novelId,
  views,
}: any) {
  return (
    <div className=" relative flex flex-col p-1 justify-center items-center border-black dark:border-white border-solid border-2 rounded-md hover:border-blue-500 transition duration-300 ease-in-out hover:shadow-lg">
      <div className="absolute top-3 left-3 text-xs sm:text-sm  z-10 bg-slate-400 dark:bg-slate-800 border-2 border-black dark:border-white border-solid rounded-full px-3  ">
        <VisibilityIcon /> {views}
      </div>
      {/* Link and Image */}
      <Link className="w-full h-3/4 p-1" href={`/novel/${novelId}`}>
        <Image
          className="w-full h-full transform hover:scale-105 transition duration-300 ease-in-out"
          width={480}
          height={320}
          src={imageUrl}
          alt="Cover"
          priority
        />
      </Link>

      {/* Title and Author */}
      <div className="flex flex-col justify-center items-center w-full h-1/3 p-1">
        <p className="max-w-full font-bold text-sm md:text-xl mb-2 p-0 truncate hover:text-blue-500 transition duration-300 ease-in-out">
          <Link href={`/novel/${novelId}`}>{title}</Link>
        </p>
        <p className="text-xs md:text-base p-0 transition duration-300 ease-in-out hover:text-gray-600">
          {author}
        </p>
      </div>
    </div>
  );
}
