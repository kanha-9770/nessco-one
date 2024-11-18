import React from "react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { HomeData } from "./types/constant";
import FeatureProjects from "./FeatureProjects";
import Link from "next/link";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";

const ImageSlider = dynamic(() => import("../ui/ImageSlider"));

interface HeroLayoutProps {
  heroData: HomeData;
}

const Home: React.FC<HeroLayoutProps> = ({ heroData }) => {
  return (
    <>
      <div className="relative max-w-screen-2xl mx-auto h-full w-full flex flex-col items-center overflow-hidden">
        <div className="relative px-4 md:px-4 lg:px-14 w-full">
          <div className="w-full flex justify-center items-center h-[50vh] sm:h-[52vh] rounded-3xl">
            <ImageSlider heroData={heroData} />
          </div>
        </div>
        <div className="absolute flex flex-col w-1/2 sm:w-[20rem] sm:h-[5rem] sm:rounded-tl-[2rem] rounded-tl-[1.5rem] right-0 bg-[#f2f2f2] bottom-0 text-3xl font-poppins text-white text-center">
          <div className="-mt-4 sm:-mt-6 flex mr-2  md:mr-2 lg:mr-12 justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 20 20"
              fill="none"
              className="flex h-4 w-8 sm:h-6 sm:w-10"
            >
              <path
                d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                fill="#f2f2f2"
                transform="rotate(90 10 10)"
              ></path>
            </svg>
          </div>
          <div className="w-full mt-4 ml-8 flex justify-start">
            <Link
              className="absolute bottom-1 right-[4rem]"
              href={`/${countryCODE}/${languageCODE}/contact`}
            >
              <Button className="rounded-full flex items-center justify-between text-primary-foreground border-2 border-white h-[3.5rem] w-36 sm:h-16 sm:w-60 md:h-16 md:w-60 lg:h-16 lg:w-60 text-xs sm:text-sm md:text-base lg:text-lg bg-clip-border relative group custom-gradient-border transition-all duration-300 overflow-hidden">
                <span className="font-medium text-black group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700 group-hover:text-transparent group-hover:bg-clip-text pl-2 sm:pl-4 md:pl-6 lg:pl-8 truncate flex-grow text-left transition-all duration-300">
                  {heroData?.home[1]?.data?.buttonText}
                </span>
                <span className="h-8 w-8 sm:h-10 sm:w-10 group custom-gradient-border-icon border-[0.5px] md:h-12 md:w-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-16 scale-150 md:h-16 stroke-[#483d73] group-hover:stroke-white transition-all duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>

          <div className="z-50 mt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 20 20"
              fill="none"
              className="sm:-ml-[2rem] -ml-6 h-4 w-8 sm:h-6 sm:w-10"
            >
              <path
                d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                fill="#f2f2f2"
                transform="rotate(90 10 10)"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <FeatureProjects heroData={heroData} />
    </>
  );
};

Home.displayName = "Hero";
export default React.memo(Home);
