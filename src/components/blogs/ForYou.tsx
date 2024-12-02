"use client";
import React from "react";
import Image from "next/image";
import { BlogsItem } from "./types/constant";

interface BlogsProps {
  blogsData: BlogsItem;
}

const Page4: React.FC<BlogsProps> = ({ blogsData }) => {
  const ForYou = blogsData?.blogs[0]?.ForYou;
  return (
    <>
      <div className="lg:mr-[3vw] lg:ml-0 mr-[4vw] ml-[4vw] font-regular font-poppins">
        <div className="bg-white w-full lg:h-[30.5rem] h-[14rem] mt-[2rem] rounded-[1rem] overflow-hidden">
          <div className="mt-[1.4rem] mb-[0.5rem] mx-[1.2rem] text-[1.5rem] font-poppins text-[#3a2a79] flex">
            <h1>{ForYou?.title}</h1>
            <p className="mt-[0.3rem]">
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
          <div className="lg:h-[25.3rem] w-full overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto] flex h-full w-full lg:overflow-y-auto overflow-x-auto scrollbar-custom scrollbar">
              {ForYou?.for?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex mx-[1rem] mt-[1rem] h-max border-solid border-b-2 border-[#E6E7E6] pb-[0.1rem]"
                >
                  <div className="flex flex-col pb-2 lg:w-full w-[55vw] mr-[0.8rem] relative">
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
                    <h2 className="text-black mb-[0.2rem] lg:w-[94%] font-semibold text-lg font-poppins">
                      {item?.title}
                    </h2>
                    <p className="text-black font-normal lg:text-sm text-[0.8rem] w-full font-poppins">
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
                    <button className="text-[1rem] mt-[0.4rem] ml-[4.2rem] p-[0.4rem] hover:bg-[#33246e] hover:text-white rounded-[1rem] group">
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
        </div>
      </div>
    </>
  );
};

export default Page4;
