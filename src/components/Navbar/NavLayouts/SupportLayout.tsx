import React, { useEffect, useRef, useState } from "react";
import bgPick from "../../../../public/assets/nav_support/BgMapImage.png";
import { NavbarData } from "../types/constant";
import { countryCODE, languageCODE } from "../nav-menue";
import Link from "next/link";
import LottieAnimation from "@/components/ui/LottieAnimation";
import Image from "next/image";

type SupportItem = {
  title: string;
  link: string;
  image: string;
};

interface SupportGridProps {
  navData: NavbarData;
  setActive?: (item: string | null) => void;
}

const SupportGrid: React.FC<SupportGridProps> = ({ navData, setActive }) => {
  // Extracting support items and ensuring it's an array
  const supportData = navData?.navbar[3]?.data;
  const supportItems = Array.isArray(supportData?.supportItem)
    ? supportData?.supportItem
    : [];
  const mobileItem = supportData?.SupportMobile || {
    mobileFirst: "+91 93584 04366",
    mobileSecond: "+91 78499 04966",
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    console.log("i am in support comp", supportItems); // Logging the support items
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  // Determine whether arrows should be shown based on item count
  const shouldShowArrows = supportItems.length > 4;

  // Function to chunk items into groups of 4
  const chunkItems = (arr: SupportItem[], size: number): SupportItem[][] =>
    arr.length
      ? [arr.slice(0, size), ...chunkItems(arr.slice(size), size)]
      : [];

  const paginatedItems = chunkItems(supportItems, 4);

  return (
    <div className="relative flex flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-2 w-full">
      {/* desktop view */}
      {shouldShowArrows && (
        <button
          className="h-12 w-20 z-20 rounded-full flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        ></button>
      )}
      <div
        className={`hidden lg:flex overflow-x-auto py-8 ${
          shouldShowArrows ? "scroll-smooth" : ""
        } [scrollbar-width:none] gap-8`}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {supportItems?.map((item, index) => {
          return (
            <Link
              key={index}
              onClick={() => setActive(null)}
              className="flex flex-col space-y-4"
              href={`/${countryCODE}/${languageCODE}/support/${item.link}`}
            >
              <div
                className="flex-shrink-0 w-72 h-40 rounded-3xl p-4 flex flex-col justify-center items-center bg-cover bg-center bg-[#bbabf949]"
                // style={{ backgroundImage: `url(${bgPick.src})` }}
              >
                <LottieAnimation
                  className="h-32"
                  animationData={item?.image}
                ></LottieAnimation>
              </div>
              <p className="relative font-poppins text-center mt-4 invert-0 font-normal hover:text-[#483d78] hover:font-semibold text-base">
                {item?.title}
              </p>
            </Link>
          );
        })}
      </div>
      {shouldShowArrows && (
        <button
          className="h-12 w-20 z-20 rounded-full flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        ></button>
      )}
      {/* mobile view */}

      <div className="relative p-1 h-full flex lg:hidden flex-col items-center">
        <div
          className="w-full py-2"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row gap-2">
            {paginatedItems?.map((group, groupIndex) => (
              <div
                key={`slide-${groupIndex}`}
                className="min-w-full p-1 grid grid-cols-2 grid-rows-2 gap-4"
              >
                {group?.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="relative w-40 h-36 border-[1px] bg-white rounded-xl  flex flex-col justify-start items-center p-2"
                  >
                    <div className="relative w-full bg-white rounded-xl border-[1px] h-24 flex justify-center items-center">
                      <LottieAnimation
                        className="h-24"
                        animationData={item?.image}
                      ></LottieAnimation>
                    </div>
                    <p className="relative font-poppins text-center mt-4 invert-0 font-medium hover:text-[#483d78] hover:font-bold text-16">
                      {item?.title}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {shouldShowArrows && (
          <div className="flex h-[5%] justify-center w-full ">
            <button
              className="h-12 w-12 rounded-full flex items-start justify-center disabled:opacity-50"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            ></button>
            <button
              className="h-12 w-12 rounded-full flex items-start justify-center disabled:opacity-50"
              onClick={scrollRight}
              disabled={!canScrollRight}
            ></button>
          </div>
        )}
        <div className="flex lg:hidden flex-col w-full mt-4 relative">
          <p className="invert-0 pl-4 text-lg font-poppins font-medium">
            Give us a Call:
          </p>
          <Image
            src="https://assets.nesscoindustries.com/public/assets/contact/contact-icon.webp"
            alt="Phone"
            width={400}
            height={400}
            className="rounded-xl h-6 w-6 absolute top-[4.2rem]"
          />
          <div className="flex items-center border-b-2 h-20 flex-row pt-6">
            <div className="flex items-center justify-center w-1/2">
              <p
                className="invert-0 text-md -ml-16 w-12 h-12 whitespace-nowrap flex flex-row gap-2 items-center"
                style={{
                  backgroundImage:
                    "url('https://assets.nesscoindustries.com/public/assets/navbar-images/contact-india.webp')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                {mobileItem?.mobileFirst}
              </p>
            </div>
            <div className="w-1 h-14 border-l-2"></div>

            <div className="flex items-center justify-center w-1/2">
              <p
                className="invert-0 text-md -ml-16 whitespace-nowrap w-16 h-16 flex flex-row gap-2 items-center"
                style={{
                  backgroundImage:
                    "url('https://assets.nesscoindustries.com/public/assets/navbar-images/contact-world.webp')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                {mobileItem?.mobileSecond}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:hidden w-full mt-4">
          <Image
            src="https://assets.nesscoindustries.com/public/assets/contact/email-icon.webp"
            alt="email"
            width={400}
            height={400}
            className="rounded-xl h-6 w-6 mr-2"
          />
          <p>support@nesscoindia.com</p>
        </div>
      </div>
    </div>
  );
};

export default SupportGrid;
