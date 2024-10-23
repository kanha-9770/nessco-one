"use client";
import React, { useRef } from "react";
import { IOTData } from "@/components/Constants/IOT_data.json";
import Image from "next/image";

const IOT = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollbarLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollbarRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full h-full my-32 font-poppins font-regular overflow-hidden">
        <h1 className="text-center mb-10 text-3xl font-semibold text-[#483d73]">
          {IOTData.title}
        </h1>
        <div className="flex px-14">
          <div className="w-1/2 relative">
            <div
              className="w-[33rem] pb-2 overflow-x-scroll scrollbar-hide"
              ref={carouselRef}
            >
              <div className="w-max flex space-x-8">
                {IOTData.cards.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white h-[20rem] relative w-[15rem] rounded-2xl"
                  >
                    <h2 className="font-medium text-center my-4 text-lg">
                      {item.title}
                    </h2>
                    <p className="text-center px-6 text-sm absolute top-14 z-10 font-normal">
                      {item.description}
                    </p>
                    <video
                      className="absolute bottom-0 opacity-30 rounded-2xl"
                      id="background-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={item.video}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                    <svg
                      className="h-14 w-14 bg-black border-4 border-[#f5f5f5] p-1.5 rounded-full text-white transform transition-transform duration-300 ease-in-out hover:rotate-45 hover:bg-[#483d73] absolute -bottom-1 -right-1 z-20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2 items-center justify-end mt-2 absolute left-[28rem] z-20">
              <div className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-white"
                  onClick={scrollbarLeft}
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
                  onClick={scrollbarRight}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <svg
                version="1.1"
                id="wifi"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50px"
                height="30px"
                viewBox="0 0 20 20"
                className="absolute top-32"
              >
                <path
                  id="wifi3"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
		C15.8,6.4,13,5,9.9,5z"
                >
                  <animate
                    id="four"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="three.end+0.05s"
                  />
                </path>
                <path
                  id="wifi2"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
		C14.2,9.1,12.2,8,9.9,8z"
                >
                  <animate
                    id="three"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="two.end+0.05s"
                  />
                </path>
                <path
                  id="wifi1"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
		C12.6,11.8,11.4,11,9.9,11z"
                >
                  <animate
                    id="two"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="one.end+0.05s"
                  />
                </path>
                <circle
                  id="dot"
                  fill="#483d73"
                  fill-opacity="0.5"
                  cx="9.9"
                  cy="15.3"
                  r="1"
                >
                  <animate
                    id="one"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="0s;four.end+0.05s"
                  />
                </circle>
              </svg>
              <svg
                version="1.1"
                id="wifi"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50px"
                height="30px"
                viewBox="0 0 20 20"
                className="absolute top-14 left-24"
              >
                <path
                  id="wifi3"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
		C15.8,6.4,13,5,9.9,5z"
                >
                  <animate
                    id="four"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="three.end+0.05s"
                  />
                </path>
                <path
                  id="wifi2"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
		C14.2,9.1,12.2,8,9.9,8z"
                >
                  <animate
                    id="three"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="two.end+0.05s"
                  />
                </path>
                <path
                  id="wifi1"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
		C12.6,11.8,11.4,11,9.9,11z"
                >
                  <animate
                    id="two"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="one.end+0.05s"
                  />
                </path>
                <circle
                  id="dot"
                  fill="#483d73"
                  fill-opacity="0.5"
                  cx="9.9"
                  cy="15.3"
                  r="1"
                >
                  <animate
                    id="one"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="0s;four.end+0.05s"
                  />
                </circle>
              </svg>
              <svg
                version="1.1"
                id="wifi"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50px"
                height="30px"
                viewBox="0 0 20 20"
                className="absolute top-11 left-[15.5rem]"
              >
                <path
                  id="wifi3"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
		C15.8,6.4,13,5,9.9,5z"
                >
                  <animate
                    id="four"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="three.end+0.05s"
                  />
                </path>
                <path
                  id="wifi2"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
		C14.2,9.1,12.2,8,9.9,8z"
                >
                  <animate
                    id="three"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="two.end+0.05s"
                  />
                </path>
                <path
                  id="wifi1"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
		C12.6,11.8,11.4,11,9.9,11z"
                >
                  <animate
                    id="two"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="one.end+0.05s"
                  />
                </path>
                <circle
                  id="dot"
                  fill="#483d73"
                  fill-opacity="0.5"
                  cx="9.9"
                  cy="15.3"
                  r="1"
                >
                  <animate
                    id="one"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="0s;four.end+0.05s"
                  />
                </circle>
              </svg>
              <svg
                version="1.1"
                id="wifi"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50px"
                height="30px"
                viewBox="0 0 20 20"
                className="absolute top-20 left-[22.8rem]"
              >
                <path
                  id="wifi3"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
		C15.8,6.4,13,5,9.9,5z"
                >
                  <animate
                    id="four"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="three.end+0.05s"
                  />
                </path>
                <path
                  id="wifi2"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
		C14.2,9.1,12.2,8,9.9,8z"
                >
                  <animate
                    id="three"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="two.end+0.05s"
                  />
                </path>
                <path
                  id="wifi1"
                  fill="#483d73"
                  fill-opacity="0.5"
                  d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
		C12.6,11.8,11.4,11,9.9,11z"
                >
                  <animate
                    id="two"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="one.end+0.05s"
                  />
                </path>
                <circle
                  id="dot"
                  fill="#483d73"
                  fill-opacity="0.5"
                  cx="9.9"
                  cy="15.3"
                  r="1"
                >
                  <animate
                    id="one"
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin="0s;four.end+0.05s"
                  />
                </circle>
              </svg>
              <Image
                className="object-cover ml-2"
                src={IOTData.machineImg}
                alt={IOTData.title}
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="w-1/2 relative">
            <video
              className="absolute -top-20 -right-56 opacity-10"
              id="background-video"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={IOTData.globeVideo}
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                // Restart the video slightly before it reaches the end
                if (video.currentTime >= video.duration - 0.2) {
                  video.currentTime = 0; // Reset to the start
                  video.play(); // Play again immediately
                }
              }}
            >
              <source src={IOTData.globeVideo} type="video/mp4" />
            </video>

            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#d08ceb] to-[#483d73] text-[5.5rem] font-semibold pt-8">
              {IOTData.subTitle}
            </h1>
            <Image
              className="w-full absolute bottom-0"
              src={IOTData.desktopImg}
              alt={IOTData.title}
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IOT;
