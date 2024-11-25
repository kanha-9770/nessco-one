"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { HomeData } from "../types/constant";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink} from 'lucide-react';

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
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-100 transition-opacity rounded-full"
              onClick={() => openModal(video.src)}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
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

