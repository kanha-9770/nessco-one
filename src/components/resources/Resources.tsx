"use client";
import React from "react";
import Image from "next/image";
import Arrow from "../../../public/assets/Support/RedirectionArrowImg.svg";
import { resourceItem } from "./types/constant";
import LinkUrl from "../LinkUrl";

interface AboutLayoutProps{
  resourceData:resourceItem;
}

const Resources: React.FC <AboutLayoutProps>= ({resourceData}) => {
  const homeresourceData=resourceData?.resources[0]?.pageHeader;
  const homeimgData=resourceData?.resources[0]?.pageHeader?.image;
  const homecardData=resourceData?.resources[0]?.cards;



  return (
    <>
      <div className="h-full w-full flex flex-col">
        {/* // First Div */}
        <div className="bg-white w-full h-[15rem] flex px-6 lg:px-0">
          <div className="w-3/4 lg:pl-10 pl-3 ">
            <h1 className="bg-gradient-to-r from-[#483d73] from-2% via-red-700 via-20% to-red-700 bg-clip-text text-transparent font-medium font-poppins relative lg:text-5xl text-2xl top-[4rem] ">
              {homeresourceData.mainTitle} <span className="block">{homeresourceData.highlightTitle}</span>
            </h1>
            <p className="text-gray-600 font-poppins lg:text-sm text-xs  font-regular relative lg:top-[4rem] lg:w-[30rem] w-[13rem] top-[5rem]">
              {homeresourceData.description}
            </p>
          </div>
          <div className="w-1/4 mt-14 relative">
            <Image
              src={homeimgData.src}
              alt={homeimgData.alt}
              width={homeimgData.width}
              height={homeimgData.height}
              priority
              className="w-[10rem] h-[10rem] absolute right-6 top-2"
            />
          </div>
        </div>

        {/* // Cards Section */}
        <div className=" grid lg:grid-row-1 lg:grid-cols-5 gap-5 flex-col p-9 bg-[#f2f2f2]">
          {homecardData.map((card, index) => (
            <LinkUrl href={`/${card.link}`} key={index}>
            <div  className=" lg:h-[20rem] h-[20rem]  items-center py-10 rounded-xl flex flex-col relative  shadow-lg hover:shadow-2xl hover:scale-80  transform transition-transform duration-300 group bg-gradient-to-t from-[#f2f2f2] to-white ">
              <h1 className="font-poppins font-semibold text-3xl  relative text-center text-[#636363] group-hover:text-red-700">{card.title}</h1>
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={100}
                height={100}
                className=" bottom-10 absolute"
              />
              
              <div className="absolute bottom-2 right-2 group-hover:bg-[#483d7359] rounded-full p-2 transition duration-300">
                <Image
                  src={Arrow}
                  alt="ReDirection Arrow"
                  width={400}
                  height={400}
                  className="w-[1.5rem]  "
                />
                </div>
          
            </div>
            </LinkUrl>
          ))}
        </div>

        
      </div>
    </>
  );
};

export default Resources;
