"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ClienteleItem } from "./types/constant";

interface AboutLayoutProps{
  clienteleData:ClienteleItem;
}

const Clientele: React.FC <AboutLayoutProps>=({clienteleData}) => {
  const homeclientData=clienteleData?.Clientele[0]?.content?.heading;


  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Check screen width to determine mobile or desktop behavior
    const isMobile = window.innerWidth <= 768; // You can adjust the breakpoint

    const mobileX = 40;  // Movement for mobile screens
    const desktopX = 170; // Movement for desktop screens

    const moveX = isMobile ? mobileX : desktopX; // Choose based on screen size

    // Add a delay before starting the animation
    tl.to(leftHandRef.current, {
      x: moveX, // Move right
      duration: 4,
      ease: "power2.inOut",
      delay: 1, // Delay before starting the animation
    })
      .to(rightHandRef.current, {
        x: -moveX, // Move left
        duration: 4,
        ease: "power2.inOut",
      }, "<") // "<" syncs the two animations
     
  }, []);


  return (
    <>
      <div className="lg:h-full lg:w-full h-[50rem] w-full bg-black">
        <h1 className="relative font-poppins font-medium text-5xl left-7 lg:top-[5rem] top-[5rem] text-white ">
          {homeclientData?.title}
        </h1>
        <div className="flex justify-between relative lg:top-0 top-32">
          {/* Left Hand */}
          <div className="relative lg:top-20 lg:left-[8rem] z-10" ref={leftHandRef} >
            <Image
              src={homeclientData?.lefthand}
              alt="lefthand"
              height={500}
              width={500}
              className="object-cover"
              priority // Prioritize loading this image
            />
          </div>

          {/* Right Hand */}
          <div className="relative lg:right-[8rem] lg:top-16 -top-3" ref={rightHandRef} >
            <Image
              src={homeclientData?.righthand}
              alt="righthand"
              height={500}
              width={500}
              className="object-cover"
              priority // Prioritize loading this image
            />
          </div>
        </div>
        <div className="lg:flex lg:flex-row flex-col w-full font-poppins lg:pl-5 text-white relative mt-[10rem]">
          <div className="lg:w-2/5 text-5xl font-medium lg:top-0 relative top-32 text-left pl-3">
            <p className="lg:w-[16rem]">{homeclientData?.boldHeading}</p>
          </div>

          <div className="lg:w-3/5 relative lg:text-right lg:pr-8 p-2 lg:p-0 lg:top-0 top-[10rem] text-left w-[80%] text-sm font-poppins font-regular">
            <p>{homeclientData?.peraOne}</p>
            <p className="font-bold pt-2 text-md">{homeclientData?.peraTwo}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientele;
