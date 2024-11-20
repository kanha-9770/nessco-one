"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { HomeData } from "../types/constant";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

interface ImageSliderLayoutProps {
  heroData: HomeData;
}

export const SwipeCarousel: React.FC<ImageSliderLayoutProps> = ({
  heroData,
}) => {
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");
  const testinomialData = heroData?.home[8]?.data;
  const testimonialItems = testinomialData?.Testinomialvideos || [];
  const dragX = useMotionValue(0);

  const scrollLeft = useCallback(() => {
    if (videoIndex > 0) {
      setVideoIndex((prevIndex) => prevIndex - 1);
    }
  }, [videoIndex]);

  const scrollRight = useCallback(() => {
    if (videoIndex < testimonialItems.length - 1) {
      setVideoIndex((prevIndex) => prevIndex + 1);
    }
  }, [videoIndex, testimonialItems.length]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setVideoIndex((pv) =>
          pv === testimonialItems.length - 1 ? 0 : pv + 1
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX, testimonialItems.length]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && videoIndex < testimonialItems.length - 1) {
      setVideoIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && videoIndex > 0) {
      setVideoIndex((pv) => pv - 1);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoLink("");
  };

  return (
    <div className="relative h-full w-auto mt-6 overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${videoIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        {testimonialItems.map((video, idx) => (
          <motion.div
            key={idx}
            animate={{ scale: videoIndex === idx ? 0.95 : 0.85 }}
            transition={SPRING_OPTIONS}
            className="relative h-full w-full flex-shrink-0 rounded-xl bg-black"
          >
            <video
              src={video.src}
              autoPlay={videoIndex === idx}
              loop
              muted
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="flex space-x-2 items-center justify-end mt-2 mr-4">
        <div className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4 stroke-white"
            onClick={scrollLeft}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4 stroke-white"
            onClick={scrollRight}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9995]">
          <div className="relative bg-white rounded-xl overflow-hidden max-w-3xl w-full">
            <button
              aria-label="CloseModal"
              onClick={closeModal}
              className="absolute top-0 right-0 bg-white p-1 rounded-full text-black z-50"
            ></button>
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src={currentVideoLink}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
