"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Label } from "@/components/ui/label";
import EnquiryCart from "@/components/ui/EnquiryCart";
import { ProductLayoutItem } from "./types/constant";

// Define interfaces for your component
interface MachineItem {
  h1: string;
  h2: string;
  h3: string;
  s: string;
  sInformation: string;
  img: string;
  rangeTitle: string;
  range: string;
  punchTitle: string;
  punch: string;
  weightTitle: string;
  weight: string;
  image: string;
  imageInformation: string;
  information: string;
}

interface Page2Props {
  page2machine: {
    heading: string;
    paragraph: string;
    all: {
      servoDriven: MachineItem[];
      mechanicalCam: MachineItem[];
    }[];
  };
}

interface ProductLayoutProps {
  productLayoutData: ProductLayoutItem;
}

type CombinedProps = ProductLayoutProps & Page2Props;

const Page2: React.FC<CombinedProps> = ({
  productLayoutData,
  page2machine,
}) => {
  const ProductsGrid = productLayoutData?.ProductLayout[0]?.ProductsGrid;
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "servoDriven" | "mechanicalCam"
  >("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
    null
  );
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const filterRef = useRef<HTMLHeadingElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [enquiryItems, setEnquiryItems] = useState<
    Array<{ id: string; name: string; image: string }>
  >([]);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  const handleCategoryChange = (
    category: "all" | "servoDriven" | "mechanicalCam"
  ) => {
    setSelectedCategory(category);
  };

  const toggleReadMore = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const wordLimit = isDesktop ? 80 : 20;

  const displayedParagraph = isExpanded
    ? page2machine.paragraph
    : truncateText(page2machine.paragraph, wordLimit);

  const filteredData =
    selectedCategory === "all"
      ? page2machine.all.flatMap((item) => [
          ...(Array.isArray(item.servoDriven) ? item.servoDriven : []),
          ...(Array.isArray(item.mechanicalCam) ? item.mechanicalCam : []),
        ])
      : selectedCategory === "servoDriven"
      ? page2machine.all.flatMap((item) =>
          Array.isArray(item.servoDriven) ? item.servoDriven : []
        )
      : page2machine.all.flatMap((item) =>
          Array.isArray(item.mechanicalCam) ? item.mechanicalCam : []
        );

  const searchFilteredData = filteredData.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleItemSelection = (
    itemId: string,
    itemName: string,
    itemImage: string
  ) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
        setEnquiryItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      } else {
        newSelected.add(itemId);
        setEnquiryItems((prevItems) => {
          const itemExists = prevItems.some((item) => item.id === itemId);
          if (!itemExists) {
            return [
              ...prevItems,
              { id: itemId, name: itemName, image: itemImage },
            ];
          }
          return prevItems;
        });
      }
      return newSelected;
    });
  };

  const removeEnquiryItem = (itemId: string) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(itemId);
      return newSelected;
    });
    setEnquiryItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        gsap.to(filterRef.current, {
          position: "fixed",
          backdropFilter: "blur(120px)",
          top: 96,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(filterRef.current, {
          position: "static",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const checkAndAddScroll = () => {
      if (mediaQuery.matches) {
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    checkAndAddScroll();
    mediaQuery.addEventListener("change", checkAndAddScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", checkAndAddScroll);
    };
  }, []);

  return (
    <>
      <div className="font-poppins font-regular w-full">
        <div
          ref={filterRef}
          className="py-[1rem] lg:px-[2.5rem] px-[0.8rem] z-10 w-full"
        >
          <div className="flex lg:flex-row flex-col-reverse ">
            <div className="flex lg:mt-0 mt-[1rem]">
              <div
                className={`lg:border-2 border-[0.1rem] border-solid lg:w-[6rem] w-[3rem] h-[1.5rem] lg:h-[2rem] lg:rounded-full rounded-lg flex items-center justify-center lg:mx-[0.3rem] mx-[0.2rem] lg:text-[1rem] text-[0.7rem] font-medium ${
                  selectedCategory === "all"
                    ? "text-white  font-semibold bg-red-700 bg-gradient-to-r from-[#483d73] to-red-700 border-none"
                    : "lg:hover:text-red-700 lg:hover:border-red-700 border-[#c4c3c3]"
                }`}
                aria-label="All"
                onClick={() => handleCategoryChange("all")}
              >
                <button>{ProductsGrid.all}</button>
              </div>
              <div
                className={`lg:border-2 border-[0.1rem] border-solid lg:w-[12rem] w-[7rem] h-[1.5rem] lg:h-[2rem] lg:rounded-full rounded-lg flex items-center lg:mx-[0.3rem] mx-[0.2rem] lg:text-[1rem] text-[0.7rem] font-medium ${
                  selectedCategory === "servoDriven"
                    ? "text-white border-red-700 font-semibold bg-red-700"
                    : "lg:hover:text-red-700 lg:hover:border-red-700 border-[#c4c3c3]"
                }`}
                aria-label="Servo Driven"
                onClick={() => handleCategoryChange("servoDriven")}
              >
                <div
                  className={`lg:ml-1 ml-[0.1rem] lg:w-[1.4rem] w-[1.1rem] h-[1.1rem] lg:h-[1.4rem] rounded-full flex items-center justify-center lg:text-[0.9rem] text-[0.7rem] font-semibold ${
                    selectedCategory === "servoDriven"
                      ? "text-red-700 bg-white"
                      : "text-white bg-black"
                  }`}
                >
                  S
                </div>
                <button className="lg:ml-[1.4rem] ml-[0.3rem]">
                  {ProductsGrid.servoDriven}
                </button>
              </div>
              <div
                className={`lg:border-2 border-[0.1rem] border-solid lg:w-[14rem] w-[8.5rem] h-[1.5rem] lg:h-[2rem] lg:rounded-full rounded-lg flex items-center lg:mx-[0.3rem] mx-[0.2rem] font-medium lg:text-[1rem] text-[0.7rem] ${
                  selectedCategory === "mechanicalCam"
                    ? "text-white border-red-700 font-semibold bg-red-700"
                    : "lg:hover:text-red-700 lg:hover:border-red-700 border-[#c4c3c3]"
                }`}
                aria-label="Mechanical Cam"
                onClick={() => handleCategoryChange("mechanicalCam")}
              >
                <div
                  className={`lg:ml-1 ml-[0.1rem] lg:w-[1.4rem] w-[1.1rem] h-[1.1rem] lg:h-[1.4rem] rounded-full flex items-center justify-center lg:text-[0.9rem] text-[0.6rem] font-semibold ${
                    selectedCategory === "mechanicalCam"
                      ? "text-red-700 bg-white"
                      : "text-white bg-black"
                  }`}
                >
                  M
                </div>
                <button className="lg:ml-[1.4rem] ml-[0.3rem]">
                  {ProductsGrid.mechanicalCam}
                </button>
              </div>
            </div>
            <div>
              <div className="lg:absolute lg:right-[2.5rem]">
                <div className="flex items-center lg:rounded-full rounded-lg overflow-hidden lg:w-[18rem] w-full lg:h-[2rem] h-[1.5rem] lg:border-2 border-[0.1rem] border-solid border-[#c4c3c3] bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-search ml-[0.4rem]"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>

                  <input
                    type="search"
                    placeholder={ProductsGrid.placeholder}
                    className="w-full text-[0.7rem] lg:text-[1rem] outline-none bg-transparent text-black font-poppins lg:mx-[0.4rem] mx-[0.2rem]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-[2.8rem] lg:px-20 px-4 lg:mt-[4rem]">
          {searchFilteredData.map((item, idx) => (
            <div
              key={idx}
              className={`relative w-full h-full bg-gradient-to-b from-[#fefefe] to-[#f5f5f5] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${
                hoveredCardIndex === idx ? "bg-[#f0f0f0]" : ""
              }`}
              onMouseEnter={() => isDesktop && setHoveredCardIndex(idx)}
              onMouseLeave={() => isDesktop && setHoveredCardIndex(null)}
            >
              <div className="absolute top-6 right-4 flex space-x-2">
                <div className="w-6 h-6 p-[0.2rem] bg-[#f5f5f5] border-solid border-[0.1rem] border-[#f5f5f5] hover:border-red-700 rounded-full flex items-center justify-center relative group">
                  <Image src={item.image} alt="" width={400} height={400} />
                  <div className="hidden group-hover:flex absolute bottom-7 right-0 bg-white border border-gray-300 rounded-md shadow-md p-3 h-max w-max z-20">
                    <p className="text-sm text-black">
                      {item.imageInformation}
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-[#f5f5f5] rounded-full flex items-center justify-center font-medium cursor-pointer relative group hover:text-red-700">
                  {item.s}
                  <div className="hidden group-hover:flex absolute bottom-7 right-0 bg-white border border-gray-300 rounded-md shadow-md p-3 h-max w-max z-20">
                    <p className="text-sm text-black font-normal">
                      {item.sInformation}
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-[#f5f5f5] rounded-full flex items-center justify-center cursor-pointer relative group hover:text-red-700 text-[1.1rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-info w-4 h-4 hover:stroke-red-700"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="8"></line>
                  </svg>
                  <div className="hidden group-hover:flex absolute bottom-7 right-0 bg-white border border-gray-300 rounded-md shadow-md p-3 h-max w-max z-20">
                    <p className="text-sm text-black">{item.information}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 pl-6">
                <h2 className="text-xl font-bold w-[65%]">{item.h1}</h2>
                <h3 className="text-lg font-semibold">{item.h2}</h3>
                <p className="text-sm text-gray-600">{item.h3}</p>
              </div>

              <div className="flex justify-center items-center overflow-hidden">
                <div className="mt-[1rem] lg:p-6 p-4 lg:h-[16rem] flex justify-center items-center">
                  <Image
                    src={item.img}
                    alt=""
                    priority
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="lg:mt-[1rem] mt-[0.5rem] lg:mb-0 mb-[1rem] flex lg:flex-rows flex-col items-center justify-center lg:h-[4rem]">
                {hoveredCardIndex !== idx ? (
                  <div className="flex w-full items-center justify-center px-2">
                    <div className="text-center w-[33%]">
                      <p className="font-semibold lg:text-md text-[0.9rem]">
                        {item.range}
                      </p>
                      <p className="text-gray-600 lg:text-md text-[0.8rem]">
                        {item.rangeTitle}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-[#9c9c9c]"></div>
                    <div className="text-center  w-[33%]">
                      <p className="font-semibold lg:text-md text-[0.9rem]">
                        {item.punch}
                      </p>
                      <p className="text-gray-600 lg:text-md text-[0.8rem]">
                        {item.punchTitle}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-[#9c9c9c]"></div>
                    <div className="text-center  w-[33%]">
                      <p className="font-semibold lg:text-md text-[0.9rem]">
                        {item.weight}
                      </p>
                      <p className="lg:text-md text-[0.8rem] text-gray-600">
                        {item.weightTitle}
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    aria-label="View Machine"
                    className={`mt-[0.2rem] w-[70%] h-[2.5rem] border-[0.1rem] border-solid ${
                      hoveredButtonIndex === idx
                        ? "border-black bg-black text-white"
                        : "border-[#9c9c9c] bg-transparent text-black"
                    } font-semibold rounded-lg transition-colors duration-300`}
                    onMouseEnter={() => setHoveredButtonIndex(idx)}
                    onMouseLeave={() => setHoveredButtonIndex(null)}
                  >
                    {ProductsGrid.viewMachine}
                  </button>
                )}
                <div className="flex items-center justify-center lg:hidden w-full">
                  <button
                    aria-label="View Machine"
                    className={`mt-[1rem] w-[70%] h-[2rem] border-[0.1rem] border-solid font-medium rounded-lg transition-colors duration-300 border-[#9c9c9c] hover:border-black hover:bg-black hover:text-white`}
                  >
                    {ProductsGrid.viewMachine}
                  </button>
                </div>
              </div>

              <div className="w-full h-px bg-[#9c9c9c]"></div>

              <div className="my-4 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`addToEnquiry-${idx}`}
                    className="h-4 w-4 accent-red-700"
                    checked={selectedItems.has(`${idx}`)}
                    onChange={() =>
                      handleItemSelection(`${idx}`, item.h1, item.img)
                    }
                  />
                  <Label
                    htmlFor={`addToEnquiry-${idx}`}
                    className="text-sm whitespace-nowrap"
                  >
                    {ProductsGrid.inquiry}
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-solid border-t-2 border-[#eeeded] bg-[#fcfcfc] px-[1rem] lg:px-[2rem] mt-[4rem] z-30">
        <h2 className="text-[0.9rem] my-[0.5rem]">{page2machine.heading}</h2>
        <p className="text-[0.7rem] font-light">{displayedParagraph}</p>
        <button
          onClick={toggleReadMore}
          aria-label="Read More"
          className="underline italic text-[0.7rem] hover:text-red-700 hover:not-italic my-[1rem]"
        >
          {isExpanded ? ProductsGrid.readLess : ProductsGrid.readMore}
        </button>
      </div>
      <EnquiryCart items={enquiryItems} onRemoveItem={removeEnquiryItem} />
    </>
  );
};
export default Page2;
