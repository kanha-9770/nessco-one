"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HomeData } from "./types/constant";

interface FeatureProjectLayoutProps {
  heroData: HomeData;
}

const AUTO_SCROLL_SPEED = 1; // Adjust speed (pixels per frame)
const RESUME_DELAY = 2000; // 3-second delay after hover (in milliseconds)

const FeatureProjects: React.FC<FeatureProjectLayoutProps> = ({ heroData }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [resumeTimeoutId, setResumeTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  // Memoized scroll functions to avoid re-creation on every render
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

  // Continuous scrolling without delay
  useEffect(() => {
    let animationFrameId: number;

    const continuousScroll = () => {
      if (carouselRef.current && !isHovered) {
        carouselRef.current.scrollLeft += AUTO_SCROLL_SPEED; // Change the value to adjust scroll speed
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth / 2
        ) {
          // Reset the scroll to the start (infinite loop)
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
    <>
      <div
        className="w-full h-full px-14 font-poppins max-w-screen-2xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-row rounded-3xl lg:my-[1rem] bg-white p-2">
          {/* Left Section with Title and Buttons */}
          <div className="flex w-[20%] flex-col relative justify-center items-center">
            <div className="lg:text-2xl text-center text-[1.8rem]">
              <h2 className="lg:text-2xl text-center  text-[1.8rem] bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent font-semibold">
                {relatedProduct?.title?.trim().replace(/\s+\S+$/, "") ||
                  "Default Title"}
              </h2>
              <h2 className="lg:text-2xl text-center  text-[1.8rem] bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent font-semibold">
                {relatedProduct?.title?.trim().match(/\S+$/) ||
                  "Default Subtitle"}
              </h2>
            </div>
            <p className="text-center text-md font-medium pt-2 w-[60%]">
              {relatedProduct?.description || "No description available."}
            </p>
            <div className="flex flex-row justify-between space-x-16 mt-4">
              <div className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-white"
                  onClick={scrollLeft}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>

              <div className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-white"
                  onClick={scrollRight}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="w-full h-full flex items-center overflow-hidden">
            <div
              className="overflow-auto scrollbar-hide px-1 flex"
              ref={carouselRef}
            >
              <div className="w-max flex items-center justify-center space-x-2">
                {/* Duplicate the items for infinite scrolling */}
                {[
                  ...relatedProduct?.imageWithDescription,
                  ...relatedProduct?.imageWithDescription,
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`carousel-item relative h-full lg:w-[11.5rem] w-[70vw] bg-gradient-to-b from-[#f5f5f5] to-[#f2f2f2] rounded-2xl transition-all duration-300 ${
                      hoveredCardIndex === idx ? "bg-[#f0f0f0]" : ""
                    }`}
                    onMouseEnter={() => setHoveredCardIndex(idx)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                  >
                    {/* Image with Tooltip */}
                    <div className="absolute top-0 right-2 flex space-x-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center relative group">
                        <Image
                          src={item.image}
                          alt={item.h1}
                          width={400}
                          height={400}
                          className="hover:scale-90 transition-all duration-300"
                        />
                        <div className="hidden group-hover:flex absolute top-10 left-5 bg-white border border-gray-300 rounded-md shadow-md px-2 py-1 z-20">
                          <p className="lg:text-[0.7rem] text-[0.7rem] text-black">
                            {item.information}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="p-2 font-poppins">
                      <h3 className="lg:text-xs font-semibold w-[65%]">
                        {item.h1}
                      </h3>
                    </div>

                    {/* Product Image */}
                    <div className="flex justify-center items-center">
                      <div className="w-full px-2 hover:px-0 transition-all duration-300 lg:h-[8rem] mt-2 mb-6 flex justify-center items-center">
                        <Image
                          className="object-cover"
                          src={item.img}
                          alt={item.h1}
                          width={400}
                          height={400}
                        />
                      </div>
                    </div>

                    {/* View Machine Button */}
                    {hoveredCardIndex === idx && (
                      <div className="flex bg-black rounded-b-full  w-full items-center justify-center absolute bottom-0">
                        <button className="text-sm text-white font-medium mr-1">
                          View Machine
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(FeatureProjects);
