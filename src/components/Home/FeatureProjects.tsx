
"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HomeData } from "./types/constant";
import Link from "next/link";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";

interface FeatureProjectLayoutProps {
  heroData: HomeData;
}

const AUTO_SCROLL_SPEED = 1;
const RESUME_DELAY = 2000;

const FeatureProjects: React.FC<FeatureProjectLayoutProps> = ({ heroData }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [resumeTimeoutId, setResumeTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const scrollLeft = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const relatedProduct = heroData?.home[4]?.data;

  useEffect(() => {
    let animationFrameId: number;

    const continuousScroll = () => {
      if (carouselRef.current && !isHovered) {
        carouselRef.current.scrollLeft += AUTO_SCROLL_SPEED;
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(continuousScroll);
    };

    continuousScroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (resumeTimeoutId) {
      clearTimeout(resumeTimeoutId);
      setResumeTimeoutId(null);
    }
  };

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setIsHovered(false);
    }, RESUME_DELAY);
    setResumeTimeoutId(timeoutId);
  };

  return (
    <div className="w-full h-full px-1 sm:px-2 md:px-14 font-poppins max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row rounded-3xl my-2 sm:my-4 md:my-8 bg-white p-2">
        {/* Text Section */}
        <div className="w-full md:w-[20%] flex flex-col justify-center items-center mb-2 md:mb-0">
          <div className="text-center flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
            <h2 className="text-lg sm:text-xl md:text-3xl bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent font-semibold">
              {relatedProduct?.title?.trim().replace(/\s+\S+$/, "") || "Default Title"}
            </h2>
            <h2 className="text-lg sm:text-xl md:text-3xl bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent font-semibold">
              {relatedProduct?.title?.trim().match(/\S+$/) || "Default Subtitle"}
            </h2>
          </div>
          <p className="text-center text-xs sm:text-sm md:text-md font-medium pt-1 sm:pt-2 w-full md:w-[60%]">
            {relatedProduct?.description || "No description available."}
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-8 mt-2 sm:mt-4">
            <button
              className="h-6 w-6 sm:h-8 sm:w-8 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center"
              onClick={scrollLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 stroke-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="h-6 w-6 sm:h-8 sm:w-8 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center"
              onClick={scrollRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 stroke-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        <div
          className="w-full h-[200px] sm:h-[250px] md:h-full flex items-center overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-auto scrollbar-hide px-1 flex" ref={carouselRef}>
            <div className="w-max flex items-center justify-center space-x-2">
              {[...relatedProduct?.imageWithDescription, ...relatedProduct?.imageWithDescription].map((item, idx) => (
                <div
                  key={idx}
                  className={`carousel-item relative h-full w-[150px] sm:w-[180px] md:w-[11.5rem] bg-gradient-to-b from-[#f5f5f5] to-[#f2f2f2] rounded-2xl transition-all duration-300 ${
                    hoveredCardIndex === idx ? "bg-[#f0f0f0]" : ""
                  }`}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  <div className="absolute top-0 right-1 sm:right-2 flex space-x-1 sm:space-x-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative group">
                      <Image
                        src={item.image}
                        alt={item.h1}
                        width={400}
                        height={400}
                        className="hover:scale-90 transition-all duration-300"
                      />
                      <div className="hidden group-hover:flex absolute top-8 sm:top-10 left-4 sm:left-5 bg-white border border-gray-300 rounded-md shadow-md px-1 sm:px-2 py-1 z-20">
                        <p className="text-[0.6rem] sm:text-[0.7rem] text-black">{item.information}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-1 sm:p-2 font-poppins">
                    <h3 className="text-[0.6rem] sm:text-xs font-semibold w-[65%]">{item.h1}</h3>
                  </div>

                  <Link
                    href={`/${countryCODE}/${languageCODE}/product/${item?.h1}`}
                    className="flex justify-center items-center"
                  >
                    <div className="w-full px-1 sm:px-2 hover:px-0 transition-all duration-300 h-[6rem] sm:h-[7rem] md:h-[8rem] mt-1 sm:mt-2 mb-4 sm:mb-6 flex justify-center items-center">
                      <Image
                        className="object-cover"
                        src={item.img}
                        alt={item.h1}
                        width={400}
                        height={400}
                      />
                    </div>
                  </Link>

                  {hoveredCardIndex === idx && (
                    <Link
                      className="flex bg-black rounded-b-full w-full items-center justify-center absolute bottom-0"
                      href={`/${countryCODE}/${languageCODE}/product/${item?.h1}`}
                    >
                      <button className="text-[0.6rem] sm:text-xs text-white font-medium mr-1">View Machine</button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FeatureProjects);