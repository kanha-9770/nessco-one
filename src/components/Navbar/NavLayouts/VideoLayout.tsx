import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavbarData } from "../types/constant";

interface VideoLayoutGridProps {
  navData: NavbarData;
  setActive?: (item: string | null) => void;
}

const VideoGrid: React.FC<VideoLayoutGridProps> = ({ navData }) => {
  const videoData = navData?.navbar[5]?.data;
  const videoDataItem = videoData?.videoDataItem || [];

  const carouselRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  useEffect(() => {
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
    }
  };

  const openModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentVideo(null);
    setModalOpen(false);
  };

  return (
    <div className="relative flex flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-2 w-full">
      <div
        className={`hidden lg:flex overflow-x-auto py-2 scroll-smooth [scrollbar-width:none] gap-6`}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {videoDataItem?.map((item, index) => (
          <div key={index} className="flex cursor-grab flex-col space-y-4">
            <div className="relative flex-shrink-0 cursor-grab w-80 h-48 bg-[#f2f2f2] rounded-3xl flex flex-col justify-center items-center">
              <div className="relative w-full h-full flex justify-center items-center cursor-pointer"
               onClick={() =>
                openModal("https://www.youtube.com/embed/AE0QMNZleJs") }
              >
                <Image
                  src="https://res.cloudinary.com/dlti4o10e/image/upload/v1732767837/about2_iihgbu.webp" // bgpic in json to be updated
                  alt={item.title}
                  fill
                  className="absolute inset-0 h-full w-full rounded-xl opacity-80" // Adding image opacity
                />
                <button
                  className="absolute bg-red-500 text-white text-lg font-bold rounded-lg w-[10rem] h-[3rem] flex items-center justify-center transition-transform duration-300 hover:scale-105"
                  onClick={() =>
                    openModal("https://www.youtube.com/embed/AE0QMNZleJs")
                  }
                >
                  Watch Video
                </button>
              </div>
            </div>
            <p className="relative font-poppins text-center mt-4 font-normal hover:text-[#483d78] hover:font-semibold text-base">
              {item?.title}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-4 max-w-5xl w-full relative h-[30rem] mt-[5rem]">
            <button
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              ✖
            </button>
            <div className="h-[27rem]">
              <iframe
                src={currentVideo || ""}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
