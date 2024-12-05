"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavbarData } from "../types/constant";
import YouTube from "./YoutubeSvg";
import SVGComponent from "../BlueLogo";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import Link from "next/link";
import { countryCODE, languageCODE } from "../nav-menue";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoLayoutGridProps {
  navData: NavbarData;
  setActive?: (item: string | null) => void;
}

const VideoGrid: React.FC<VideoLayoutGridProps> = ({ navData }) => {
  const videoData = navData?.navbar[5]?.data;
  const videoDataItem = videoData?.videoDataItem || [];

  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Adjust this value as needed
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(checkScrollability, 300); // Check after animation
    }
  };

  const renderVideoCard = (item: any, index: number) => (
    <Dialog key={index}>
      <DialogTrigger asChild>
        <div className="relative flex-shrink-0 cursor-grab w-full h-32 bg-[#f2f2f2] rounded-3xl flex flex-col justify-center items-center">
          <div className="relative w-full h-full flex justify-center items-center cursor-pointer">
            <Image
              src={item?.image}
              alt={item.title}
              fill
              className="absolute inset-0 h-full w-full rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>

            <div
              className="absolute text-white rounded-[0.8rem] w-[3.5rem] h-[3.5rem] flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer z-10"
              onClick={() =>
                setCurrentVideo("https://www.youtube.com/embed/AE0QMNZleJs")
              }
            >
              <YouTube />
            </div>
          </div>

          <div className="absolute flex items-center space-x-2 -top-2 left-2 z-40 cursor-pointer font-poppins mt-4 font-semibold text-base">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-white">
              <SVGComponent />
            </div>
            <span className="text-white text-sm line-clamp-1 font-medium">
              {item?.title || "Watch Video"}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[760px] lg:max-w-[54rem] p-4">
        <div className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh]">
          <iframe
            src={`${currentVideo || ""}${
              currentVideo?.includes("?") ? "&" : "?"
            }autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-xl"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className="relative hidden lg:flex flex-col lg:flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-2 w-full font-poppins">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full p-2 shadow-md z-50"
          >
            <ChevronLeft className="text-black hover:text-white" size={24} />
          </button>
        )}
        <div
          className={`flex overflow-x-auto py-2 scroll-smooth [scrollbar-width:none] gap-6`}
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          {videoDataItem?.map((item, index) => (
            <div key={index} className="flex cursor-grab flex-col space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative flex-shrink-0 cursor-grab w-80 h-48 bg-[#f2f2f2] rounded-3xl flex flex-col justify-center items-center">
                    <div className="relative w-full h-full flex justify-center items-center cursor-pointer">
                      <Image
                        src={item.bgPic}
                        alt={item.title}
                        fill
                        className="absolute inset-0 h-full w-full rounded-xl opacity-80"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>

                      <div
                        className="absolute text-white rounded-[0.8rem] w-[3.5rem] h-[3.5rem] flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer z-10"
                        onClick={() =>
                          setCurrentVideo(
                            "https://www.youtube.com/embed/AE0QMNZleJs"
                          )
                        }
                      >
                        <YouTube />
                      </div>
                    </div>

                    <div className="absolute flex items-center space-x-2 -top-2 left-2 z-40 cursor-pointer font-poppins text-center mt-4 font-semibold text-base ">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-white">
                        <SVGComponent />
                      </div>
                      <span className="text-white text-lg font-medium">
                        {item?.title || "Watch Video"}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[760px] lg:max-w-[54rem] p-4">
                  <div className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh]">
                    <iframe
                      src={`${currentVideo || ""}${
                        currentVideo?.includes("?") ? "&" : "?"
                      }autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-xl"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full p-2 shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="lg:hidden p-2 text-black border-b lg:rounded-none lg:p-0 lg:border-none flex items-center relative">
          <Link
            href={`/${countryCODE}/${languageCODE}/videos`}
            className="flex items-center space-x-2 cursor-pointer pl-2"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                <path d="m21 3-9 9" />
                <path d="M15 3h6v6" />
              </svg>
            </div>
            <p className="text-lg font-poppins ">Video</p>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-15rem)]">
          <div className="grid grid-cols-2 gap-4 p-4">
            {videoDataItem?.map((item, index) => (
              <div key={index} className="w-full">
                {renderVideoCard(item, index)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default VideoGrid;