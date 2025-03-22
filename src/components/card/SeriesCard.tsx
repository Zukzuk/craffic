import React from "react";
import Image from "next/image";
import { ISeriesItem } from "@/types";
import { useRouter } from "next/navigation";
import { Chip } from "@material-tailwind/react";

export default function SeriesCard({ title, subSeriesOf, numOfBooks, uri }: ISeriesItem) {
  const router = useRouter();

  const getSubSerieOf = () => {
    if (subSeriesOf && subSeriesOf.length > 0) {
      return (
        <div className="absolute bottom-1 left-1 text-gray-400 flex flex-wrap gap-1">
          {subSeriesOf.map((series, i) => (
            <Chip className="rounded-full text-[8px] text-thin bg-gray-700 hover:bg-gray-600 p-0 pl-2 pr-2 h-[17px]" key={i} value={series} />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-[160px] cursor-pointer bg-gray-800 hover:bg-gray-700 hover:shadow-lg transition-colors rounded-md border-2 border-gray-700/20">
      <div className="h-[212px] relative overflow-hidden bg-gray-900 rounded-tl-md" onClick={() => router.push(uri)}>
        <div className="absolute top-0 right-0 text-gray-300 z-10">
          <Chip className="rounded-[0px] rounded-bl-[5px] text-[10px] text-thin bg-purple-600 p-0 pl-2 pr-2 h-[20px]" value={numOfBooks} />
        </div>
        {/* <Image
          src={`/${path}/${image}`}
          alt={title}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          // placeholder="blur" // Use a blur placeholder while loading
          // blurDataURL="/placeholder.png" // A base64 placeholder image
          onClick={() => router.push(uri)} // Navigate to the directory
        /> */}
        {getSubSerieOf()}
      </div>
      <h3 className="text-gray-300 text-xs font-semibold p-2">{title}</h3>
    </div>
  );
};
