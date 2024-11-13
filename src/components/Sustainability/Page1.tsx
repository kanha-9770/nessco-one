"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageData from "../Constants/Sustainability/Sustainability-Data.json";


gsap.registerPlugin(ScrollTrigger);

const Page1 = () => {
  const butterflyRef = useRef(null);
  const grassRef = useRef(null);
  const treesRef = useRef(null);
  const screen = useRef(null);

  const data = PageData;

  useEffect(() => {
    if (data && window.innerWidth > 768) {
      // Initial animation for butterfly
      gsap.fromTo(
        butterflyRef.current,
        { x: 0, opacity: 0 },
        { x: 80, opacity: 1, duration: 2 }
      );

      // Scroll animation for butterfly
      gsap.fromTo(
        butterflyRef.current,
        { x: 80, opacity: 1 },
        {
          x: 0,
          opacity: 0.2,
          duration: 1,
          scrollTrigger: {
            trigger: screen.current,
            start: "top",
            scrub: true,
          },
        }
      );

      // Animation for trees
      gsap.fromTo(treesRef.current, { y: 0 }, { y: -290, duration: 0.5 });
      gsap.fromTo(
        treesRef.current,
        { y: -290 },
        {
          y: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: screen.current,
            start: "top",
            scrub: true,
          },
        }
      );

      // Animation for grass
      gsap.fromTo(
        grassRef.current,
        { y: 0, opacity: 0 },
        { y: -110, opacity: 1, duration: 0.5, delay: 0.4 }
      );
      gsap.fromTo(
        grassRef.current,
        { y: -110 },
        {
          y: 0,
          duration: 0.2,
          scrollTrigger: {
            trigger: screen.current,
            start: "top",
            scrub: true,
          },
        }
      );
    }
  }, [data]);

  if (!data) return null; // Render nothing if the category does not match

  return (
    <div className="mt-8 flex items-center justify-center h-full w-full" ref={screen}>
      {/* <Image
        src={data.Sustainability[1].Data?.butterfly || ""}
        alt="butterfly"
        height={100}
        width={100}
        className="absolute top-[5rem] left-0 lg:w-[20rem] w-[10rem] z-[1]"
        ref={butterflyRef}
      /> */}
      <div className="lg:w-full w-[70rem] lg:h-[80vh] h-[40rem] lg:mx-20 md:h-[60rem] mx-5 bg-white lg:rounded-[40px] rounded-2xl relative overflow-hidden mt-12">
        <div className="flex flex-col items-center justify-center h-full relative z-[5]">
          <h2 className="lg:text-[6.3rem] text-4xl lg:mt-0 md:text-4xl -mt-[10rem] font-black text-[#0C350F] font-poppins text-center">
            {data.Sustainability[1].Data?.title}
          </h2>
          <h2 className="relative lg:right-[12rem] lg:-bottom-10 text-xl font-poppins font-thin">
            {data.Sustainability[1].Data?.description}
          </h2>
        </div>
        {/* <Image
          src={data.Sustainability[1].Data?.grass || ""}
          alt="grass"
          width={1100}
          height={400}
          className="absolute left-3 -bottom-[8.1rem]"
          ref={grassRef}
        /> */}
        {/* <div>
          <Image
            src={data.Sustainability[1].Data?.trees || ""}
            alt="trees"
            className="absolute right-0 md:right-20 lg:-bottom-[19rem] -bottom-4 md:-bottom-[20rem] z-[10] h-[44vh] w-[35rem]"
            ref={treesRef}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Page1;
