"use client";
import React from "react";
import Image from "next/image";
import DecorativeImg1 from "../../../public/assets/Marquee/DecorativeImg1.svg";
import DecorativeImg2 from "../../../public/assets/Marquee/DecorativeImg2.svg";
import { InfiniteMovingCards } from "../ui/marqueeCardAnimation";
import { HomeData } from "./types/constant";
interface MarqueeLayoutProps {
  heroData: HomeData;
}
export default function MarqueeSection({ heroData }: MarqueeLayoutProps) {
  // Memoize brand section to avoid recomputation
  const brandSection = heroData.home[5]?.data;

  // Return early if no brand section is found or data is missing
  if (!brandSection) return null;

  const { trusted, partners } = heroData.home[5]?.data;

  return (
    <div className="h-[40rem] px-14 flex flex-col justify-center gap-12 overflow-hidden bg-gradient-to-b from-[#ece9f5]  via-white via-20% to-transparent relative font-poppins font-regular">
      <Image alt="Decorative Image" src={DecorativeImg1} className="w-52 rotate-12 absolute top-4 -right-14"/>
      <Image alt="Decorative Image" src={DecorativeImg2} className="w-[20rem] absolute -bottom-16 left-10"/>
      <div className="h-1/3 w-full flex flex-col justify-center items-center space-y-4">
        <h1 className="text-[#483d73] font-semibold text-center text-3xl">Trusted Partners & Brands</h1>
        <p className="text-[#483d73] font-extralight text-center w-[16rem]">“Building lasting partnerships with 
        trusted brands worldwide.”</p>
      </div>
      <div className="relative h-1/3 flex flex-col lg:flex-row ">
        {/* Heading Section */}
        <div className="hidden md:flex text-[#483d73] flex-col">
          <h1 className="text-sm absolute lg:text-xl bg-[#D3CFE2] px-4 py-2 rounded-3xl font-medium mt-5 font-poppins whitespace-nowrap">
            {heroData?.home[5]?.heading1}
          </h1>
          <h2 className="mt-28 absolute right-0 text-sm bg-[#D3CFE2] px-4 py-2 rounded-3xl lg:text-xl font-medium  font-poppins whitespace-nowrap">
            {heroData?.home[5]?.heading2}
          </h2>
        </div>

        {/* Marquee Cards */}
        <div className=" mask-gradient-marquee">
          <div className=" w-full md:w-[85%] md:ml-48">
            <InfiniteMovingCards
              items={trusted}
              direction="left"
              className="w-full"
            />
          </div>
          <div className="mt-2 w-full md:w-[83%]">
            <InfiniteMovingCards
              items={partners}
              direction="right"
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* Description Section */}
      {heroData?.home[5]?.description?.text && (
        <div className="relative flex flex-col h-1/3 items-center text-center">
          <p className="text-sm text-[#483d73] lg:text-xl mx-4 w-full lg:w-[62%] font-poppins font-normal leading-8">
            {heroData?.home[5]?.description.text}
          </p>
        </div>
      )}
    </div>
  );
}
