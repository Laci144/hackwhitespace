import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

type slide = {
  title: string;
  content?: string;
  image?: string;
};

const Lessoncard = ({ title, content, image }: slide) => {
  return (
    <div className="flex flex-col items-center justify-start border-2 border-red-600 w-full h-full p-5">
      <div className="border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-full h-[700px] p-6 rounded-3xl">
        <div className="text-3xl font-bold text-white overflow-hidden pb-4 border-b-2 border-gray-800">
          <h2>{title}</h2>
        </div>
        <div className="pt-4 text-white relative">
          <p>{content}</p>
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="w-full h-[300px] object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Lessoncard;
