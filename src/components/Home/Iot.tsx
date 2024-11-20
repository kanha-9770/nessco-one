// "use client";
// import React, { useRef } from "react";
// import { IotData } from "@/components/Constants/IOT_data.json";
// import Image from "next/image";

// const IOT = () => {
//   const carouselRef = useRef<HTMLDivElement | null>(null);

//   const scrollbarLeft = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({
//         left: -carouselRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   };

//   const scrollbarRight = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({
//         left: carouselRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="max-w-screen-2xl mx-auto w-full h-full my-8 md:my-16 font-poppins font-regular overflow-hidden">
//         <h1 className="text-center mb-6 md:mb-10 text-2xl md:text-3xl font-semibold text-[#483d73]">
//           {IotData.title}
//         </h1>
//         <div className="flex flex-col md:flex-row px-4 md:px-14">
//           <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
//             <div
//               className="w-full md:w-[33rem] pb-2 overflow-x-scroll scrollbar-hide"
//               ref={carouselRef}
//             >
//               <div className="w-max flex space-x-4 md:space-x-8">
//                 {IotData.cards.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white h-[18rem] md:h-[20rem] relative w-[14rem] md:w-[15rem] rounded-2xl"
//                   >
//                     <h2 className="font-medium text-center my-4 text-base md:text-lg">
//                       {item.title}
//                     </h2>
//                     <p className="text-center px-4 md:px-6 text-xs md:text-sm absolute top-14 z-10 font-normal">
//                       {item.description}
//                     </p>
//                     <video
//                       className="absolute bottom-0 opacity-30 rounded-2xl"
//                       id="background-video"
//                       autoPlay
//                       loop
//                       muted
//                       playsInline
//                       preload="metadata"
//                       poster={item.video}
//                     >
//                       <source src={item.video} type="video/mp4" />
//                     </video>
//                     <svg
//                       className="h-12 w-12 md:h-14 md:w-14 bg-black border-4 border-[#f5f5f5] p-1.5 rounded-full text-white transform transition-transform duration-300 ease-in-out hover:rotate-45 hover:bg-[#483d73] absolute -bottom-1 -right-1 z-20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M7 17L17 7M17 7H8M17 7V16"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex space-x-2 items-center justify-end mt-2 md:absolute md:left-[28rem] z-20">
//               <div className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={3}
//                   stroke="currentColor"
//                   className="w-4 h-4 stroke-white"
//                   onClick={scrollbarLeft}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </div>
//               <div className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={3}
//                   stroke="currentColor"
//                   className="w-4 h-4 stroke-white"
//                   onClick={scrollbarRight}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div className="relative hidden md:block">
//               <svg
//                 version="1.1"
//                 id="wifi"
//                 xmlns="http://www.w3.org/2000/svg"
//                 x="0px"
//                 y="0px"
//                 width="50px"
//                 height="30px"
//                 viewBox="0 0 20 20"
//                 className="absolute top-32"
//               >
//                 <path
//                   id="wifi3"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
//                   C15.8,6.4,13,5,9.9,5z"
//                 >
//                   <animate
//                     id="four"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="three.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi2"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
//                   C14.2,9.1,12.2,8,9.9,8z"
//                 >
//                   <animate
//                     id="three"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="two.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi1"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
//                   C12.6,11.8,11.4,11,9.9,11z"
//                 >
//                   <animate
//                     id="two"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="one.end+0.05s"
//                   />
//                 </path>
//                 <circle
//                   id="dot"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   cx="9.9"
//                   cy="15.3"
//                   r="1"
//                 >
//                   <animate
//                     id="one"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="0s;four.end+0.05s"
//                   />
//                 </circle>
//               </svg>
//               <svg
//                 version="1.1"
//                 id="wifi"
//                 xmlns="http://www.w3.org/2000/svg"
//                 x="0px"
//                 y="0px"
//                 width="50px"
//                 height="30px"
//                 viewBox="0 0 20 20"
//                 className="absolute top-14 left-24"
//               >
//                 <path
//                   id="wifi3"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
//                   C15.8,6.4,13,5,9.9,5z"
//                 >
//                   <animate
//                     id="four"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="three.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi2"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
//                   C14.2,9.1,12.2,8,9.9,8z"
//                 >
//                   <animate
//                     id="three"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="two.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi1"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
//                   C12.6,11.8,11.4,11,9.9,11z"
//                 >
//                   <animate
//                     id="two"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="one.end+0.05s"
//                   />
//                 </path>
//                 <circle
//                   id="dot"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   cx="9.9"
//                   cy="15.3"
//                   r="1"
//                 >
//                   <animate
//                     id="one"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="0s;four.end+0.05s"
//                   />
//                 </circle>
//               </svg>
//               <svg
//                 version="1.1"
//                 id="wifi"
//                 xmlns="http://www.w3.org/2000/svg"
//                 x="0px"
//                 y="0px"
//                 width="50px"
//                 height="30px"
//                 viewBox="0 0 20 20"
//                 className="absolute top-11 left-[15.5rem]"
//               >
//                 <path
//                   id="wifi3"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
//                   C15.8,6.4,13,5,9.9,5z"
//                 >
//                   <animate
//                     id="four"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="three.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi2"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
//                   C14.2,9.1,12.2,8,9.9,8z"
//                 >
//                   <animate
//                     id="three"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="two.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi1"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
//                   C12.6,11.8,11.4,11,9.9,11z"
//                 >
//                   <animate
//                     id="two"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="one.end+0.05s"
//                   />
//                 </path>
//                 <circle
//                   id="dot"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   cx="9.9"
//                   cy="15.3"
//                   r="1"
//                 >
//                   <animate
//                     id="one"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="0s;four.end+0.05s"
//                   />
//                 </circle>
//               </svg>
//               <svg
//                 version="1.1"
//                 id="wifi"
//                 xmlns="http://www.w3.org/2000/svg"
//                 x="0px"
//                 y="0px"
//                 width="50px"
//                 height="30px"
//                 viewBox="0 0 20 20"
//                 className="absolute top-20 left-[22.8rem]"
//               >
//                 <path
//                   id="wifi3"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
//                   C15.8,6.4,13,5,9.9,5z"
//                 >
//                   <animate
//                     id="four"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="three.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi2"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
//                   C14.2,9.1,12.2,8,9.9,8z"
//                 >
//                   <animate
//                     id="three"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="two.end+0.05s"
//                   />
//                 </path>
//                 <path
//                   id="wifi1"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
//                   C12.6,11.8,11.4,11,9.9,11z"
//                 >
//                   <animate
//                     id="two"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="one.end+0.05s"
//                   />
//                 </path>
//                 <circle
//                   id="dot"
//                   fill="#483d73"
//                   fillOpacity="0.5"
//                   cx="9.9"
//                   cy="15.3"
//                   r="1"
//                 >
//                   <animate
//                     id="one"
//                     attributeName="fill-opacity"
//                     dur="500ms"
//                     values="0.5;1;0.5"
//                     calcMode="linear"
//                     begin="0s;four.end+0.05s"
//                   />
//                 </circle>
//               </svg>
//               <Image
//                 className="object-cover ml-2 hidden md:block"
//                 src={IotData.machineImg}
//                 alt={IotData.title}
//                 width={400}
//                 height={400}
//               />
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 relative">
//             <video
//               className="absolute -top-20 -right-56 opacity-10 hidden md:block"
//               id="background-video"
//               autoPlay
//               muted
//               playsInline
//               preload="auto"
//               poster={IotData.globeVideo}
//               onTimeUpdate={(e) => {
//                 const video = e.target as HTMLVideoElement;
//                 if (video.currentTime >= video.duration - 0.2) {
//                   video.currentTime = 0;
//                   video.play();
//                 }
//               }}
//             >
//               <source src={IotData.globeVideo} type="video/mp4" />
//             </video>

//             <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#d08ceb] to-[#483d73] text-4xl md:text-[5.5rem] font-semibold pt-4 md:pt-8 text-center md:text-left">
//               {IotData.subTitle}
//             </h1>
//             <Image
//               className="w-full absolute bottom-0 hidden md:block"
//               src={IotData.desktopImg}
//               alt={IotData.title}
//               width={400}
//               height={400}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default IOT;
"use client";
import React, {useRef } from "react";
import Image from "next/image";
import { HomeData } from "./types/constant";

interface KnowMoreLayoutProps {
  heroData: HomeData;
}

export default function IOT({ heroData }: KnowMoreLayoutProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const IotData = heroData?.home[10]?.data;



  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount =
        direction === "left"
          ? -carouselRef.current.offsetWidth
          : carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full h-full my-8 md:my-16 font-poppins font-regular overflow-hidden">
      <h1 className="text-center mb-6 md:mb-10 text-2xl md:text-3xl font-semibold text-[#483d73]">
        {IotData?.title}
      </h1>
      <div className="flex flex-col-reverse lg:flex-row px-4 md:px-14">
        <div className="w-full lg:w-1/2 relative mb-8 lg:mb-0">
          <div
            className="w-full lg:w-[33rem] pb-2 overflow-x-scroll scrollbar-hide"
            ref={carouselRef}
          >
            <div className="w-max flex space-x-4 md:space-x-8">
              {IotData?.cards?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white h-[18rem] md:h-[20rem] relative w-[60vw] md:w-[30vw] lg:w-[15rem] rounded-2xl"
                >
                  <h2 className="font-medium text-center my-4 text-base md:text-lg">
                    {item.title}
                  </h2>
                  <p className="text-center px-4 md:px-6 text-xs md:text-sm absolute top-14 z-10 font-normal">
                    {item.description}
                  </p>
                  <video
                    className="absolute bottom-0 w-full h-auto opacity-30 rounded-2xl"
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
                    className="h-12 w-12 md:h-14 md:w-14 bg-black border-4 border-[#f5f5f5] p-1.5 rounded-full text-white transform transition-transform duration-300 ease-in-out hover:rotate-45 hover:bg-[#483d73] absolute -bottom-1 -right-1 z-20"
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
          <div className="flex space-x-2 items-center justify-end mt-2 lg:absolute lg:left-[28rem] z-20">
            <button
              onClick={() => scrollCarousel("left")}
              className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="relative hidden lg:block">
            {[
              { top: "32", left: "0" },
              { top: "14", left: "24" },
              { top: "11", left: "15.5rem" },
              { top: "20", left: "22.8rem" },
            ].map((position, index) => (
              <svg
                key={index}
                version="1.1"
                id={`wifi-${index}`}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50px"
                height="30px"
                viewBox="0 0 20 20"
                className={`absolute top-${position.top} left-${position.left}`}
              >
                <path
                  id={`wifi3-${index}`}
                  fill="#483d73"
                  fillOpacity="0.5"
                  d="M9.9,5C6.8,5,4,6.4,2.2,8.7l1.1,1.1c1.6-2,4-3.2,6.7-3.2c2.7,0,5.1,1.3,6.7,3.2l1.1-1.1
                  C15.8,6.4,13,5,9.9,5z"
                >
                  <animate
                    id={`four-${index}`}
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin={`three-${index}.end+0.05s`}
                  />
                </path>
                <path
                  id={`wifi2-${index}`}
                  fill="#483d73"
                  fillOpacity="0.5"
                  d="M9.9,8c-2.3,0-4.3,1.1-5.6,2.8l1.1,1.1c1-1.4,2.6-2.4,4.5-2.4c1.9,0,3.5,0.9,4.5,2.4l1.1-1.1
                  C14.2,9.1,12.2,8,9.9,8z"
                >
                  <animate
                    id={`three-${index}`}
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin={`two-${index}.end+0.05s`}
                  />
                </path>
                <path
                  id={`wifi1-${index}`}
                  fill="#483d73"
                  fillOpacity="0.5"
                  d="M9.9,11c-1.5,0-2.7,0.8-3.4,2l1.1,1.1c0.4-0.9,1.3-1.6,2.3-1.6s2,0.7,2.3,1.6l1.1-1.1
                  C12.6,11.8,11.4,11,9.9,11z"
                >
                  <animate
                    id={`two-${index}`}
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin={`one-${index}.end+0.05s`}
                  />
                </path>
                <circle
                  id={`dot-${index}`}
                  fill="#483d73"
                  fillOpacity="0.5"
                  cx="9.9"
                  cy="15.3"
                  r="1"
                >
                  <animate
                    id={`one-${index}`}
                    attributeName="fill-opacity"
                    dur="500ms"
                    values="0.5;1;0.5"
                    calcMode="linear"
                    begin={`0s;four-${index}.end+0.05s`}
                  />
                </circle>
              </svg>
            ))}
            <Image
              className="object-cover ml-2 hidden lg:block"
              src={IotData.machineImg}
              alt={IotData.title}
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative">
          <video
            className="absolute -top-20 -right-56 opacity-10 -z-10"
            id="background-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={IotData.globeVideo}
            onTimeUpdate={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video.currentTime >= video.duration - 0.2) {
                video.currentTime = 0;
                video.play();
              }
            }}
          >
            <source src={IotData.globeVideo} type="video/mp4" />
          </video>

          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#d08ceb] to-[#483d73] text-4xl md:text-5xl lg:text-[5.5rem] font-semibold pt-4 md:pt-8 text-center lg:text-left">
            {IotData.subTitle}
          </h1>
          <Image
            className="w-full my-8 lg:absolute lg:bottom-0 lg:my-0 "
            src={IotData.desktopImg}
            alt={IotData.title}
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
