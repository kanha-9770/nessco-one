"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProductItem } from "./types/constant";
import { gsap } from "gsap";

interface ProductProps {
  productData: ProductItem;
}

const Carousal: React.FC<ProductProps> = ({ productData }) => {
  const Header = productData?.Product[0]?.Header;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const autoSlideInterval = 3000; // Interval time in milliseconds
  const slideRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // For touch events
  const [startX, setStartX] = useState<number>(0);
  const [endX, setEndX] = useState<number>(0);

  // GSAP animation for slide transitions
  const animateSlide = (direction: string) => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: direction === "next" ? 500 : -500 }, // Change the starting position
        { opacity: 1, x: 0, duration: 0.5 }
      );
    }
  };

  const prevSlide = (): void => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? Header?.products?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
    animateSlide("prev");
  };

  const nextSlide = (): void => {
    const isLastSlide = currentIndex === Header?.products?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    animateSlide("next"); // Trigger GSAP animation for the next slide
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(() => {
        nextSlide();
      }, autoSlideInterval);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [currentIndex, isHovered]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      // Swiped left
      nextSlide();
    } else if (endX - startX > 50) {
      // Swiped right
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full mx-auto h-max group font-regular font-poppins overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart} // Handle touch start
      onTouchMove={handleTouchMove} // Handle touch move
      onTouchEnd={handleTouchEnd} // Handle touch end
    >
      <div className="flex w-full h-max" ref={slideRef}>
        {/* Slide content */}
        <div className="lg:w-[50%] lg:pl-[1rem]">
          <h1 className="lg:text-4xl text-[1.4rem] font-bold italic text-[#483d73] mb-[0.5rem]">
            {Header?.products[currentIndex]?.machineName}
          </h1>
          <p className="lg:text-[0.9rem] text-black text-[0.7rem] lg:w-[20rem] md:w-[30rem] w-[9rem]">
            {Header?.products[currentIndex]?.description}
          </p>
        </div>
        <div className="lg:w-[50%] flex">
          <Image
            src={Header?.products[currentIndex]?.machineImg}
            alt={Header?.products[currentIndex]?.machineName}
            width={400}
            height={400}
            priority
            className="lg:w-[19rem] md:w-[12rem] h-max w-[20rem] lg:mt-0 md:-mt-[2rem] mt-[5rem]"
          />

          <Image
            src={Header?.products[currentIndex]?.productImg}
            alt={Header?.products[currentIndex]?.machineName}
            width={400}
            height={400}
            className="lg:w-[5rem] w-[4rem] lg:-mt-[6.5rem] -mt-[8rem] lg:-ml-2 md:ml-2 -ml-[4rem]"
          />
        </div>
      </div>
      <div className="flex lg:pl-[1rem] lg:py-4 pt-4 space-x-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="lg:w-6 w-5 lg:h-6 h-5"
          onClick={prevSlide}
        >
          <circle
            cx="32"
            cy="32"
            r="32"
            className="fill-[#9e9c9c] hover:fill-red-700 cursor-pointer"
          />
          <path
            d="M39 20 L27 32 L39 44"
            className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="lg:w-6 w-5 lg:h-6 h-5"
          onClick={nextSlide}
        >
          <circle
            cx="32"
            cy="32"
            r="32"
            className="fill-[#9e9c9c] hover:fill-red-700 cursor-pointer"
          />
          <path
            d="M25 20 L37 32 L25 44"
            className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
          />
        </svg>
      </div>
      <div className="absolute lg:bottom-4 bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Header?.products?.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-black" : "bg-[#9e9c9c]"
            } cursor-pointer`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};
export default Carousal;
