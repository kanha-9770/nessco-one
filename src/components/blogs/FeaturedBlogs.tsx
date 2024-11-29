"use client";
import React from "react";
import Image from "next/image";
import { BlogsItem } from "./types/constant";

interface BlogsProps {
  blogsData: BlogsItem;
}

const Page3: React.FC<BlogsProps> = ({ blogsData }) => {
  const FeaturedBlogs = blogsData?.blogs[0]?.FeaturedBlogs;
  return (
    <>
      <div className="lg:mr-[3vw] lg:ml-0 mr-[4vw] ml-[4vw] font-regular font-poppins">
        <div className="bg-white w-full h-max lg:mt-[5.2rem] mt-[2rem] rounded-[1rem] overflow-hidden">
          <div className="pt-[1.4rem] mx-[1rem] text-[1.5rem] font-poppins text-[#3a2a79] flex">
            <h1>{FeaturedBlogs?.featuredBlogs}</h1>
            <p className="mt-[0.1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-8 h-8 stroke-[#483d73]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
          </div>
          {FeaturedBlogs?.featured?.map((item, idx) => (
            <div
              key={idx}
              className="flex mx-[1rem] my-[1.5rem] border-solid border-b-2 border-[#E6E7E6] pb-[0.1rem]"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 hover:bg-[#E6E7E6] rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </div>
                <p className="text-black text-[1rem] w-full pr-[1rem] font-poppins">
                  {item?.description}
                </p>
              </div>
              <div className="flex flex-col">
                <Image
                  src={item?.img}
                  alt={"Blogs Image"}
                  width={400}
                  height={400}
                  className="lg:w-[7.5rem] lg:h-[5rem] w-[6rem] h-[5rem] rounded-[0.5rem] object-cover"
                />
                <button className="text-[1rem] mt-[0.4rem] ml-[4.1rem] p-[0.4rem] hover:bg-[#33246e] rounded-[1rem] group">
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    className="w-4 h-4"
                  >
                    <rect
                      x="20"
                      y="20"
                      width="160"
                      height="160"
                      rx="10"
                      ry="10"
                      fill="none"
                      stroke="black"
                      stroke-width="10"
                      className="group-hover:stroke-white"
                    />

                    <rect
                      x="40"
                      y="40"
                      width="40"
                      height="40"
                      fill="black"
                      className="group-hover:fill-white"
                    />

                    <rect
                      x="90"
                      y="40"
                      width="80"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="90"
                      y="60"
                      width="80"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="40"
                      y="90"
                      width="130"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="40"
                      y="110"
                      width="130"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="40"
                      y="130"
                      width="130"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white w-full h-max mt-[1rem] rounded-[1rem] hidden lg:block overflow-hidden">
          <div className="pt-[1.4rem] mx-[1rem] text-[1.5rem] font-poppins text-[#3a2a79] flex">
            <h1>{FeaturedBlogs?.featuredBlogs}</h1>
            <p className="mt-[0.1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-8 h-8 stroke-[#483d73]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
          </div>

          {FeaturedBlogs?.feature?.map((item, idx) => (
            <div
              key={idx}
              className="flex mx-[1rem] my-[1.5rem] border-solid border-b-2 border-[#E6E7E6] pb-[0.1rem]"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 text-lg hover:bg-[#E6E7E6] rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </div>
                <p className="text-black text-[1rem] w-full pr-[1rem] font-poppins">
                  {item?.description}
                </p>
              </div>
              <div className="flex flex-col">
                <Image
                  src={item?.img}
                  alt={"Blogs Image"}
                  width={400}
                  height={400}
                  className="lg:w-[7.5rem] lg:h-[5rem] w-[6rem] h-[5rem] rounded-[0.5rem] object-cover"
                />
                <button className="text-[1rem] mt-[0.4rem] ml-[4.1rem] p-[0.4rem] hover:bg-[#33246e]  rounded-[1rem] group">
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    className="w-4 h-4"
                  >
                    <rect
                      x="20"
                      y="20"
                      width="160"
                      height="160"
                      rx="10"
                      ry="10"
                      fill="none"
                      stroke="black"
                      stroke-width="10"
                      className="group-hover:stroke-white"
                    />

                    <rect
                      x="40"
                      y="40"
                      width="40"
                      height="40"
                      fill="black"
                      className="group-hover:fill-white"
                    />

                    <rect
                      x="90"
                      y="40"
                      width="80"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="90"
                      y="60"
                      width="80"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="40"
                      y="90"
                      width="130"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="40"
                      y="110"
                      width="130"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                    <rect
                      x="40"
                      y="130"
                      width="130"
                      height="10"
                      fill="black"
                      className="group-hover:fill-white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page3;
