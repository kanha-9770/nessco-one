import React from "react";
import Image from "next/image";
import LinkUrl from "../LinkUrl";

interface SectionProps {
  number: number;
  title: string;
  description: string;
  img: string;
  button: string;
  link:string;
}

const Section: React.FC<SectionProps> = ({
  number,
  title,
  description,
  img,
  button,
  link,
}) => {
  return (
    <div className="flex p-8 mb-6 bg-black text-white rounded-md shadow-md">
      <div className="w-[80%] space-y-3">
        <h2 className="text-3xl font-medium">
          {number}. {title}
        </h2>
        <div className="border-t-2 w-[45%] ml-7"></div>
        <p className="text-base font-regular ml-7">{description}</p>
      </div>
      <div className="flex flex-col w-[20%] items-center justify-center space-y-4 relative">
        <Image src={img} alt="" width={400} height={400} className="h-20 w-auto" />
        <LinkUrl href={`/resources/knowledge-center/${link}`}
          className="group flex items-center justify-center text-white hover:text-[#8c52ff] absolute bottom-0 left-1/2 transform -translate-x-1/2"
        >
          {button}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-4 h-4 ml-2"
          >
            <circle
              cx="32"
              cy="32"
              r="32"
              className="fill-white group-hover:fill-[#8c52ff]"
            />
            <path
              d="M25 20 L37 32 L25 44"
              className="stroke-black stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round group-hover:stroke-white"
            />
          </svg>
        </LinkUrl>
      </div>
    </div>
  );
};

export default Section;
