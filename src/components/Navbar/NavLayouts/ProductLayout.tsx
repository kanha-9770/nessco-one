"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BlurImage from "../../ui/BlurImage";
import Link from "next/link";
import { NavbarData } from "../types/constant";
import { countryCODE, languageCODE } from "../nav-menue";
import SvgDownArrow from "@/components/ui/svgDownArrow";
import SvgUpArrow from "@/components/ui/svgUpArrow";

interface Machine {
  link: string;
  name: string;
  image: string;
  mimage: string;
  category: string;
}

interface Link {
  link: string;
  name: string;
  icon: string;
}

interface ProductLayoutProps {
  setHoveredItem: (item: string | null) => void;
  setHeading: (heading: string | null) => void;
  setIsVisible: (visible: boolean) => void;
  navData: NavbarData;
  setActive?: (item: string | null) => void;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({
  setHoveredItem,
  setHeading,
  setIsVisible,
  navData,
  setActive,
}) => {
  const productData = navData?.navbar[1]?.data;
  const navLeftData: Machine[] = productData?.Machines || [];
  const navRightData: Link[] = productData?.SidebarLinks || [];
  const [hoveredCategory, setHoveredCategory] = useState<string>(
    navRightData[0]?.name || ""
  );
  const [machineLink, setMachineLink] = useState<string>(
    navRightData[0]?.link || ""
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarIndex, setSidebarIndex] = useState(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() || "";
  const countryCode = pathname.split("/")[1]?.toLowerCase();
  const componentCode = pathname.split("/")[2]?.toLowerCase();

  const filteredMachines = navLeftData.filter((machine) =>
    hoveredCategory ? machine.category.includes(hoveredCategory) : false
  );

  const totalVisible = 6;

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + totalVisible, filteredMachines.length - totalVisible)
    );
  }, [filteredMachines.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - totalVisible, 0));
  }, []);

  const handleSidebarNext = useCallback(() => {
    setSidebarIndex((prevIndex) =>
      Math.min(prevIndex + 1, navRightData.length - 8)
    );
  }, [navRightData.length]);

  const handleSidebarPrev = useCallback(() => {
    setSidebarIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory("");
    setCurrentIndex(0);
    setHoveredItem(null);
    setHeading(null);
    setIsVisible(true);
  }, [setHoveredItem, setHeading, setIsVisible]);

  const handleCategoryClick = useCallback(
    (linkName: string, heading: string) => {
      setHoveredCategory(linkName);
      setHoveredItem(linkName);
      setHeading(heading);
      setIsVisible(false);
    },
    [setHoveredItem, setHeading, setIsVisible]
  );

  const expandItem = useCallback(
    (item: string) => {
      setExpandedItem((prev) => (prev === item ? null : item));
      setHoveredCategory(item);
      setMachineLink(
        navRightData.find((link) => link.name === item)?.link || ""
      );
    },
    [navRightData]
  );

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseLeave]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [hoveredCategory]);

  const renderMachineItem = useCallback(
    (machine: Machine) => (
      <div className="text-center relative w-1/3 p-2" key={machine.name}>
        <Link
          className="flex flex-col items-center"
          href={`/${countryCODE}/${languageCODE}/products${machineLink}/${machine?.link}`}
          onClick={() => setActive && setActive(null)}
        >
          <div className="flex h-[10rem] overflow-hidden">
            <Image
              src={machine.image}
              alt={machine.name}
              className="object-contain lg:hover:scale-80 transform transition-transform duration-300 rounded-3xl relative z-10 h-[14rem] -mt-10"
              width={200}
              height={150}
              loading="lazy"
            />
          </div>
          <h3
            className={`${
              componentCode === "knowledge-center"
                ? "lg:hover:text-[#bfb3f0]"
                : "lg:hover:text-[#483d78]"
            } text-base font-normal mt-2 lg:hover:font-semibold invert-0 relative z-20`}
          >
            {machine.name}
          </h3>
        </Link>
      </div>
    ),
    [countryCode, languageCODE, machineLink, componentCode, setActive]
  );

  const renderSidebarItem = useCallback(
    (link: Link) => (
      <div
        key={link?.name}
        onMouseEnter={() => {
          setHoveredCategory(link?.name);
          setMachineLink(link?.link);
          setCurrentIndex(0);
        }}
        onClick={() => handleCategoryClick(link?.name, link?.name)}
        className={`flex items-center space-x-4 text-base font-normal transition-colors duration-300 cursor-pointer ${
          componentCode === "knowledge-center"
            ? "lg:hover:text-[#bfb3f0] lg:hover:font-semibold"
            : "lg:hover:text-[#483d78] lg:hover:font-semibold"
        } `}
      >
        <Link
          className="flex w-full gap-2 flex-row"
          href={`/${countryCODE}/${languageCODE}/products${link.link}`}
          onClick={() => setActive && setActive(null)}
        >
          <div className="flex items-center justify-center cursor-pointer">
            <BlurImage
              className="h-6 w-6 transform transition-transform duration-200 object-cover"
              src={link?.icon}
              alt={link?.name}
              width={24}
              height={24}
              loading="lazy"
            />
          </div>
          <p className="w-60">{link?.name}</p>
        </Link>
      </div>
    ),
    [countryCode, languageCODE, handleCategoryClick, componentCode, setActive]
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex max-w-screen-2xl mx-auto items-start justify-center font-light"
    >
      {/* Desktop View */}
      <div className="w-full hidden lg:flex flex-col gap-10 lg:flex-row rounded-lg overflow-hidden">
        <div className="flex justify-center w-full md:w-[75%] relative">
          {filteredMachines?.length > totalVisible && (
            <button
              onClick={handlePrev}
              className={`absolute invert-0 left-0 h-6 w-6 sm:h-8 sm:w-8 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center ${
                currentIndex === 0 ? "opacity-20" : "opacity-100"
              }`}
              style={{ top: "50%", transform: "translateY(-50%)" }}
              disabled={currentIndex === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          <div className="flex flex-wrap justify-start pl-14 items-start overflow-hidden w-full">
            {filteredMachines?.length <= totalVisible
              ? filteredMachines?.map(renderMachineItem)
              : filteredMachines
                  .slice(currentIndex, currentIndex + totalVisible)
                  .map(renderMachineItem)}
          </div>

          {filteredMachines?.length > totalVisible && (
            <button
              onClick={handleNext}
              className={`absolute invert-0 text-3xl right-0 z-10 h-6 w-6 sm:h-8 sm:w-8 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center ${
                currentIndex + totalVisible >= filteredMachines?.length
                  ? "opacity-20"
                  : "opacity-100"
              }`}
              style={{ top: "50%", transform: "translateY(-50%)" }}
              disabled={currentIndex + totalVisible >= filteredMachines?.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 stroke-white"
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
        <div className="w-full border-l lg:w-80 h-full flex flex-col items-center relative">
          <div className="w-full h-full">
            {sidebarIndex > 0 && (
              <button
                className="absolute -top-2 left-0 right-10 mx-auto z-10 text-2xl rounded-full p-0 transition-all transform hover:scale-125 -rotate-90"
                style={{ width: "40px", height: "40px" }}
                onClick={handleSidebarPrev}
              >
                <SvgUpArrow />
              </button>
            )}

            <div className="overflow-hidden flex flex-col space-y-5 items-center justify-start w-full py-10 h-full">
              {navRightData
                .slice(sidebarIndex, sidebarIndex + 8)
                .map(renderSidebarItem)}
            </div>

            {sidebarIndex + 8 < navRightData?.length && (
              <button
                className="absolute left-0 -bottom-2 right-10 mx-auto text-2xl rounded-full p-0 transition-all transform hover:scale-125 rotate-90"
                style={{ width: "40px", height: "40px" }}
                onClick={handleSidebarNext}
              >
                <SvgDownArrow />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden w-full h-screen overflow-hidden">
        <div className="h-full overflow-y-auto">
          {navRightData.map((link, index) => (
            <div
              key={index}
              className="border-b-[1px] text-lg font-poppins text-[#483d78] font-semimedium"
            >
              <div
                onClick={() => expandItem(link?.name)}
                className="flex items-center justify-between p-4 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <BlurImage
                    className="h-6 w-6 object-cover"
                    src={link?.icon}
                    alt={link?.name}
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                  <Link
                    className={
                      expandedItem === link?.name
                        ? "text-[#483d73]"
                        : "text-gray-500"
                    }
                    href={`/${countryCODE}/${languageCODE}/products${link.link}`}
                    onClick={() => setActive(null)}
                  >
                    {link?.name}
                  </Link>
                </div>
                <span className="text-gray-500 text-2xl">
                  {expandedItem === link?.name ? "-" : "+"}
                </span>
              </div>

              {expandedItem === link?.name && (
                <div className="bg-white p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {filteredMachines
                      .filter((machine) =>
                        machine.category.includes(link?.name)
                      )
                      .map((machine, machineIndex) => (
                        <Link
                          key={`${machine?.name}-${machineIndex}`}
                          href={`/${countryCODE}/${languageCODE}/products${link.link}/${machine?.link}`}
                          onClick={() => setActive(null)}
                          className="flex flex-col items-center"
                        >
                          <div className="border rounded-xl h-24 w-full overflow-hidden">
                            <BlurImage
                              src={machine?.image}
                              alt={machine?.name}
                              className="object-contain h-full w-full"
                              width={200}
                              height={150}
                              loading="lazy"
                            />
                          </div>
                          <h4 className="text-sm font-bold mt-2 text-center">
                            {machine?.name}
                          </h4>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
