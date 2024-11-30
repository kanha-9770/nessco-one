"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { motion } from "framer-motion";
import BreadcrumbProduct from "@/components/ui/BreadCrumbProduct";
import InfoCard from "@/components/Products/InfoCard";
import ZigzagLine from "../ZigzagLine";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(TextPlugin);

interface SpecificationImage {
  [key: string]: string;
}
interface Specification {
  title: string;
}

interface MachineProps {
  name: string;
  image: string;
  mimage: string;
  specification_image: SpecificationImage[];
  product_heading: string;
  first_name: string;
  introduction: string;
  advantages: {
    title: string;
    items: { title: string }[];
  };
  technicalSpecifications: {
    specifications: Specification[];
  };
  link?: string;
}

const Machine: React.FC<MachineProps> = ({
  name,
  image,
  mimage,
  specification_image,
  product_heading,
  first_name,
  introduction,
  advantages,
  technicalSpecifications,
  link,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const smallImageRef = useRef<HTMLImageElement>(null);
  const [fontSize, setFontSize] = useState("16px");
  const [selectedImage, setSelectedImage] = useState<string>(image);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const pathname = usePathname() || "";
  const countryCode = pathname.split("/")[1]?.toLowerCase();
  const languageCode = pathname.split("/")[2]?.toLowerCase();
  const fallBackLink = pathname.split("/")[4]?.toLocaleLowerCase();

  useEffect(() => {
    const calculateFontSize = () => {
      const charCount = introduction && introduction.length;
      let newFontSize = "0.1rem";
      if (charCount < 50) newFontSize = "1.5rem";
      else if (charCount < 180) newFontSize = "1.1rem";
      else if (charCount < 280) newFontSize = "1rem";
      else newFontSize = "0.8rem";
      setFontSize(newFontSize);
    };
    calculateFontSize();
  }, [introduction]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { text: "" },
      {
        text: advantages.title,
        duration: 0.2,
        ease: "power2.out",
        delay: 1.5,
      }
    );

    advantages?.items?.forEach((item, index) => {
      tl.fromTo(
        listItemRefs.current[index],
        { opacity: 0, text: "", "--dot-opacity": 0 },
        {
          opacity: 1,
          text: item.title,
          duration: 0.2,
          ease: "power2.out",
          onStart: () => {
            listItemRefs.current[index]?.style.setProperty(
              "--dot-opacity",
              "1"
            );
          },
        },
        "+=0.2"
      );
    });
  }, [advantages]);

  useEffect(() => {
    gsap.fromTo(
      smallImageRef.current,
      { scale: 0.8 },
      {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 1,
      }
    );
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // Include the extra image (initially selected image) in the images array
  const images = [
    image,
    ...specification_image.flatMap((img) => Object.values(img)),
  ];
  const shouldShowArrows = images.length > 1;

  const breadcrumbItems = [
    { label: "Home", href: `/${countryCode}/${languageCode}/` },
    { label: "Products", href: `/${countryCode}/${languageCode}/products` },
    {
      label: first_name,
      href: `/${countryCode}/${languageCode}/products/${link || fallBackLink}`,
    },
    { label: name, current: true },
  ];

  return (
    <div className="pt-14 lg:h-[93vh] h-full flex flex-col justify-start font-poppins">
      <div className="bg-white w-full py-2 lg:px-10 px-4">
        <BreadcrumbProduct items={breadcrumbItems} />
      </div>
      <div className="lg:h-[68%] h-full lg:px-10 px-4 z-30 lg:flex flex-col lg:flex-row bg-white">
        <div className="font-poppins lg:w-[75%] w-full">
          <div className="flex flex-col lg:flex-row w-full h-full">
            <div className="flex flex-col lg:flex-row items-start relative w-full">
              <div className="lg:w-[50%] w-full h-full flex flex-col">
                <h1 className="lg:text-4xl text-[1.7rem] py-2 font-poppins">
                  <span className="bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent font-semibold block pb-1">
                    {first_name}
                  </span>
                </h1>
                <div className="lg:h-[38%] h-full my-2 flex items-center break-words">
                  <p
                    className="text-black leading-[1.5em] font-normal"
                    style={{ fontSize }}
                  >
                    {introduction}
                  </p>
                </div>
                <div className="flex flex-row-reverse justify-between  lg:flex-col">
                  <h2 className="lg:pl-2 lg:text-[2.8rem] text-[1.8rem] font-bold font-poppins text-[#424242] text-left italic">
                    {name}
                  </h2>
                  <div className="w-max rounded-full group">
                    <Button className="bg-[#483d73] rounded-full text-white py-1 pl-6 text-lg group-hover:bg-gradient-to-r transition-all duration-300 group-hover:from-[#483d73] group-hover:to-red-700 font-medium flex items-center">
                      Book Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="lg:w-6 w-5 lg:h-6 h-5 mx-2"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="32"
                          className="fill-[#ffffff] cursor-pointer"
                        />
                        <path
                          d="M25 20 L37 32 L25 44"
                          className="stroke-[#483d73] stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="lg:w-[50%] w-full h-full flex relative mt-4 lg:mt-0">
                <div className="lg:block hidden">
                  <ZigzagLine />
                </div>
                <div className="w-full h-[90%] flex relative">
                  <div className="h-[18rem] overflow-hidden">
                    <Image
                      ref={smallImageRef}
                      src={selectedImage}
                      height={800}
                      width={400}
                      alt={product_heading}
                      className="object-contain w-full h-[24rem] -mt-10"
                    />
                  </div>
                  <div className="absolute top-0 right-0 p-2">
                    <Image
                      src={mimage}
                      height={60}
                      width={60}
                      alt="Small Image"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:flex lg:w-[25%]  lg:justify-end flex-col items-start mt-4 lg:mt-0">
          <div className="text-black mb-4">
            <h3 ref={titleRef} className="font-bold text-md mb-2">
              {advantages?.title}
            </h3>
            <ul className="text-sm font-regular list-none">
              {advantages?.items?.map((advantage, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    if (el) listItemRefs.current[index] = el;
                  }}
                  className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-black"
                >
                  {advantage?.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative h-auto lg:h-[32%] border-t-2 border-gray-300 flex flex-col-reverse lg:flex-row items-center">
        <div className="text-left text-xs font-medium text-gray-500 uppercase lg:w-[55%] w-full mt-4 lg:mt-0">
          <InfoCard
            sizeRange={
              technicalSpecifications?.specifications[2]?.title || "N/A"
            }
            speedRoundShapes={
              technicalSpecifications?.specifications[0]?.title || "N/A"
            }
            maxCups={
              Number(
                technicalSpecifications?.specifications[0]?.title?.match(
                  /\d+/
                )?.[0]
              ) || 0
            }
            bmp100Compact={
              technicalSpecifications?.specifications[2]?.title || "N/A"
            }
            bmp100Super={
              technicalSpecifications?.specifications[2]?.title || "N/A"
            }
          />
        </div>
        <div className="flex lg:w-[45%] w-full h-full items-center justify-center lg:my-0 my-4">
          <div className="bg-white rounded-2xl lg:w-[35rem] w-full max-w-[24rem] z-40 flex flex-row items-center justify-center p-4">
            {shouldShowArrows && (
              <button
                className="w-6 h-6 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center mr-2 flex-shrink-0"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
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
            )}
            <div
              className={`flex overflow-x-auto ${
                shouldShowArrows ? "scroll-smooth" : ""
              } [scrollbar-width:none] gap-3`}
              ref={carouselRef}
              onScroll={checkScrollability}
            >
              {images?.map((image, index) => (
                <div key={index} className="flex flex-col">
                  <motion.div
                    className={`relative flex-shrink-0 w-[8.4rem] h-24 border-2 rounded-2xl p-1 flex flex-col ${
                      selectedImage === image ? "border-[#483d73]" : ""
                    }`}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative w-full h-full flex">
                      <Image
                        src={image}
                        alt={`Image ${index}`}
                        width={196}
                        height={196}
                        className="object-contain w-full h-full cursor-pointer"
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            {shouldShowArrows && (
              <button
                className="w-6 h-6 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center ml-2 flex-shrink-0"
                onClick={scrollRight}
                disabled={!canScrollRight}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machine;
