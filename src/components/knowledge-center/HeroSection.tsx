"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "./style.css";
import { gsap } from "gsap";
import { KnowledgeCenterItem } from "./types/constant";

interface KnowledgeCenterProps {
  knowledgeCenterData: KnowledgeCenterItem;
}

const HeroSection: React.FC<KnowledgeCenterProps> = ({ knowledgeCenterData }) => {
  const Hero = knowledgeCenterData?.knowledgeCenter[0]?.Hero;
  const glowRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Apply GSAP animation to each Light SVG using their index
    glowRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0.5 }, // Start partially visible
          {
            opacity: 1, // Fade to full opacity
            duration: 1, // Slightly increase duration for each index
            repeat: -1, // Repeat indefinitely
            yoyo: true, // Reverse the animation on repeat
            ease: "power2.inOut",
          }
        );
      }
    });

    // Cleanup animation on component unmount
    return () => {
      glowRefs.current.forEach((ref) => {
        if (ref) {
          gsap.killTweensOf(ref);
        }
      });
    };
  }, []);

  return (
    <div className="flex pt-24 bg-black h-screen w-full flex-col font-regular font-poppins">
      <div className="h-[10%]">
        <p className="text-5xl px-10 font-poppins font-semibold  text-white">
          {Hero.title}
        </p>
      </div>
      <div className="h-[90%] flex w-full">
        <div className="w-1/2 ">
          <Image
            src="https://res.cloudinary.com/dfryvystt/image/upload/v1729658363/Giphy_jnwcn8.webp"
            className="h-full w-full object-contain"
            height={600}
            width={600}
            priority
            alt={"knowldege-hero"}
          />
        </div>
        <div className="w-1/2 pr-4">
          {/* start */}
          <div className="text-white py-20 w-[95%]">
            <p className="text-left text-3xl font-medium mb-10">
              {Hero.subtitle
                .split(" ")
                .slice(0, -1)
                .join(" ")}{" "}
              <span className="text-[#8c52ff]">
                {Hero.subtitle.split(" ").slice(-1)}
              </span>
            </p>
            <div className="flex justify-center gap-10">
              {Hero.section.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="relative  flex flex-col items-center justify-center">
                    {/* SVG Bulb Icon with Glow */}
                    <div className="">
                      <Image
                        src="https://res.cloudinary.com/dfryvystt/image/upload/v1731488577/Bulb_fxxa88.svg"
                        width={400}
                        height={400}
                        className="h-16 light-bulb w-16 glow"
                        alt={""}
                      />
                    </div>
                    <Image
                      ref={(el) => {
                        glowRefs.current[idx] = el;
                      }}
                      src="https://res.cloudinary.com/dfryvystt/image/upload/v1731488576/Light_mcxsno.svg"
                      width={400}
                      height={400}
                      className="absolute -top-[1.8rem] h-full w-full"
                      alt={""}
                    />
                    <div className="flex flex-col items-center justify-center mt-20 gap-2">
                      <Image
                        src={item.img}
                        className="w-16"
                        alt={""}
                        width={400}
                        height={400}
                      />
                      <h2 className="text-2xl font-normal">{item.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
