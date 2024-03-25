import Image from "next/image";
export default function CarouselItem({ title, description, img, author }: any) {
  return (
    <div className="grid grid-cols-3 gap-1 items-center h-full w-full">
      <div className="col-span-1  h-full w-full p-0 m-0 flex flex-col items-center justify-center">
        <Image
          className="rounded-lg w-[108px] h-[161px] lg:w-[240px] lg:h-[320px] sm:w-[176px] sm:h-[263px]"
          src={img}
          alt="cover"
          width={240}
          height={320}
          priority
        />
      </div>
      <div className="col-span-2 h-full flex flex-col justify-center">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-md text-gray-800 dark:text-slate-50">{author}</p>
        <p className="text-sm text-gray-600 dark:text-slate-50 block max-h-24 md:max-h-36 overflow-hidden text-ellipsis leading-5 sm:text-clip">
          {description}
        </p>
      </div>
    </div>
  );
}
