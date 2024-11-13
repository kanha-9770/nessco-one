"use client";
import React, { useRef, useEffect } from "react";
import  Page2Data  from "../Constants/Sustainability/Sustainability-Data.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Page2 = () => {
  const leftFootRef = useRef(null);
  const rightFootRef = useRef(null);
  const cupRef = useRef(null);
  const screen = useRef(null);

  const data = Page2Data;

  useEffect(() => {
    // Scroll animation
    gsap.to(rightFootRef.current, {
      y: 0,
      x: 0,
      opacity: 0,
    });
    gsap.fromTo(
      rightFootRef.current,
      { y: 0, x: 0, opacity: 1 },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: screen.current,
          start: "top 70%", // Adjust as needed
          end: "top 60%",
          scrub: true,
        },
      }
    );

    gsap.to(leftFootRef.current, {
      y: 0,
      x: 0,
      opacity: 0,
    });
    gsap.fromTo(
      leftFootRef.current,
      { y: 0, x: 0, opacity: 1 },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: screen.current,
          start: "top 60%", // Adjust as needed
          end: "top 50%",
          scrub: true,
        },
      }
    );

    gsap.to(rightFootRef.current, {
      y: 100,
      x: -50,
      opacity: 0,
    });

    gsap.fromTo(
      rightFootRef.current,
      {
        y: 100,
        x: -50,
        opacity: 1,
      },
      {
        y: 100,
        x: -50,
        opacity: 1,
        scrollTrigger: {
          trigger: screen.current,
          start: "top 50%", // Adjust as needed
          end: "top 40%",
          scrub: true,
        },
      }
    );

    gsap.to(leftFootRef.current, {
      y: 100,
      x: -50,
      opacity: 0,
    });
    gsap.fromTo(
      leftFootRef.current,
      { y: 100, x: -50, opacity: 1 },
      {
        y: 100,
        x: -50,
        opacity: 1,
        scrollTrigger: {
          trigger: screen.current,
          start: "top 40%", // Adjust as needed
          end: "top 30%",
          scrub: true,
        },
      }
    );

    gsap.to(rightFootRef.current, {
      y: 100,
      x: -50,
      opacity: 0,
    });
    gsap.fromTo(
      rightFootRef.current,
      { y: 100, x: -50, opacity: 0 },
      {
        y: 100,
        x: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: screen.current,
          start: "top 0%", // Adjust as needed
          end: "top -10%",
          scrub: true,
        },
      }
    );

    gsap.to(leftFootRef.current, {
      y: 100,
      x: -50,
      opacity: 0,
    });
    gsap.fromTo(
      leftFootRef.current,
      { y: 100, x: -50, opacity: 0 },
      {
        y: 100,
        x: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: screen.current,
          start: "top -10%", // Adjust as needed
          end: "top -20%",
          scrub: true,
        },
      }
    );
      //Cup Animation
      gsap.fromTo(
        cupRef.current,
        { y: 100 },
        {
          y: 0, // Adjust the end value as needed
          duration: 2,
          scrollTrigger: {
            trigger: screen.current,
            start: "20% 35%", 
            end: "80% 60% ",
            scrub: true,
          },
        }
      );
  }, []);

  return (
    <div className=" h-full flex  items-center justify-center mt-10 w-full">
      <div className="mx-20  mt-9 relative h-[70vh]  " ref={screen}>
        <div className="grid lg:grid-flow-col  gap-14 ">
        <div className="relative flex items-center justify-center lg:h-[31rem] lg:w-[33rem] w-[22rem] md:w-[40rem] md:h-[20rem]">
  {/* Heading overlay */}
  <div className="absolute top-16 left-0 w-full h-full md:w-[40rem]  flex flex-col items-center justify-center text-center lg:text-left z-10 lg:invisible visible">
    <h1 className="lg:text-[3.2rem] text-4xl font-poppins font-medium text-white ">
      {data.Sustainability[2].Data?.title1}
    </h1>
    <h1 className="lg:text-[3.2rem] text-2xl font-poppins text-white font-medium ">
      {data.Sustainability[2].Data?.title2}
    </h1>
  </div>

  {/* Video background */}
  <video
    id="background-video"
    className="w-full h-full md:w-[40rem] object-cover rounded-2xl relative lg:top-0 top-16"
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
  >
    <source src={data.Sustainability[2].Data?.bgGarden} type="video/mp4" />
  </video>
</div>
          <div>
            {/* <Image
              src={data.Sustainability[2].Data?.leftFootprint}
              alt="footprint"
              width={40}
              className="absolute -top-8 -right-1 lg:visible invisible"
              ref={leftFootRef}
            /> */}
            {/* <Image
              src={data.Sustainability[2].Data?.rightFootprint}
              alt="footprint"
              width={40}
              className="absolute -top-14 -right-10 lg:visible invisible"
              ref={rightFootRef}
            /> */}
            <div className=" lg:block hidden text-center lg:text-left">
          <h1 className="lg:text-[3.2rem] text-4xl font-poppins font-medium lg:mb-3">
            {data.Sustainability[2].Data?.title1}
          </h1>
          <h1 className="lg:text-[3.2rem] text-2xl font-poppins text-[#95C43C] font-medium">
            {data.Sustainability[2].Data?.title2}
          </h1>
        </div>
            <div className=" w-full h-[20rem] bg-[#0D340F] lg:rounded-[40px] rounded-2xl mt-5 relative ">
              <p className="text-center text-white lg:text-[1.07rem] text-sm p-8 font-[200] md:text-xl">
                {data.Sustainability[2].Data?.description}
              </p>
              {/* <Image
                src={data.Sustainability[2].Data?.leafs || ""}
                alt="leafs"
                width={55}
                className="absolute lg:top-5 -left-6 top-1"
              />
              <Image
                src={data.Sustainability[2].Data?.cup ||""}
                alt="cup"
                width={80}
                className="absolute -bottom-8 -right-9 lg:visible invisible"
                ref={cupRef}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
