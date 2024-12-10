"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { HomeData } from "../types/constant";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';

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
    if (videoIndex < testimonialItems?.length - 1) {
      setVideoIndex((prevIndex) => prevIndex + 1);
    }
  }, [videoIndex, testimonialItems?.length]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setVideoIndex((pv) =>
          pv === testimonialItems?.length - 1 ? 0 : pv + 1
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX, testimonialItems?.length]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && videoIndex < testimonialItems?.length - 1) {
      setVideoIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && videoIndex > 0) {
      setVideoIndex((pv) => pv - 1);
    }
  };

  const openModal = (videoSrc: string) => {
    setIsModalOpen(true);
    setCurrentVideoLink(videoSrc);
  };

  const RipplePlayButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="ripple-block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full overflow-hidden"
    >
      <Play className="absolute left-1/2 top-1/2 z-10 size-8 -translate-x-1/2 -translate-y-1/2 text-white transition-colors duration-300 group-hover:text-white/90" />
      <AnimatePresence>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute left-0 top-0 size-full rounded-full bg-white/30"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: [0.2, 4],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: (i - 1) * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );

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
        {testimonialItems?.map((video, idx) => (
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
            <div className="absolute inset-0 rounded-xl bg-black bg-opacity-20"></div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 to-transparent"></div>
            <RipplePlayButton onClick={() => openModal(video.src)} />
          </motion.div>
        ))}
      </motion.div>
      <div className="flex space-x-2 items-center justify-end mt-2 mr-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={scrollLeft}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={scrollRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[720px] p-0 overflow-hidden rounded-xl">
          <div className="relative w-full pt-[56.25%] bg-black">
            <video
              src={currentVideoLink}
              controls
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <DialogClose className="absolute top-2 right-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

