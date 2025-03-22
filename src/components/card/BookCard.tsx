import React from "react";
import Image from "next/image";
import { IBookItem } from "@/types";
import { useRouter } from "next/navigation";
import Chip from "@material-tailwind/react/components/Chip";

export default function BookCard({ title, extension, uri }: IBookItem) {
  const router = useRouter();

  // TODO: Add a great looking card (https://www.material-tailwind.com/docs/react/card) -> Tailwind CSS Background Blog Card

  return (
    <div className="max-w-[160px] cursor-pointer bg-gray-800 hover:bg-gray-700 hover:shadow-lg transition-colors rounded-md border-2 border-gray-700/20">
      <div className="h-[212px] relative overflow-hidden bg-gray-900 rounded-tl-md rounded-tr-md" onClick={() => router.push(uri)}>
        <div className="absolute bottom-1 left-1 text-gray-400 z-10">
          <Chip className="rounded-full text-[8px] text-thin bg-gray-700 p-0 pl-2 pr-2 h-[17px]" value={extension} />
        </div>
        <div className="absolute bottom-0 right-0 text-gray-300 z-10">
          <Chip className="rounded-[0px] rounded-tl-[5px] text-[9px] text-thin bg-purple-600 p-0 pl-2 pr-2 h-[19px]" value={1} />
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
      </div>
      <h3 className="text-gray-300 text-xs font-semibold p-2">{title}</h3>
    </div>
  );
};
