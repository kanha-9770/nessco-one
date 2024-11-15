"use client";

import Image from "next/image";
import DecorativeImg1 from "../../../public/assets/FeaturedNews/DecorativeImg1.svg";
import DecorativeImg2 from "../../../public/assets/FeaturedNews/DecorativeImg2.svg";
import { HomeData, NewsFeatureItem } from "./types/constant";
import { Key, useState } from "react";
import Modal from "./FeatureNewsModal";

interface FeatureNewsLayoutProps {
  heroData: HomeData;
}

export default function FeatureNews({ heroData }: FeatureNewsLayoutProps) {
  const newsfData = heroData?.home[7].data?.newsData;
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    img: "",
    title: "",
    description: "",
  });

  const openModal = (content: {
    img: string;
    title: string;
    description: string;
  }) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="max-w-screen-2xl relative mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-14 mb-8 sm:mb-12 font-poppins">
      <Image
        alt="Decorative Image"
        src={DecorativeImg1}
        className="w-48 sm:w-64 md:w-80 lg:w-[30rem] absolute top-8 sm:top-16 -left-3 opacity-50 sm:opacity-100"
      />
      <Image
        alt="Decorative Image"
        src={DecorativeImg2}
        className="w-64 sm:w-80 md:w-96 lg:w-[40rem] absolute right-0 top-10 sm:top-20 opacity-50 sm:opacity-100"
      />
      <h2 className="text-2xl md:text-3xl text-center text-[#483d73] mb-6 sm:mb-10 font-semibold relative z-10">
        Featured News
      </h2>
      <div className="grid grid-cols-1 lg:py-14 lg:grid-cols-2 gap-4 sm:gap-6 relative z-10">
        {/* Left side large article */}
        <div className="lg:col-span-1 p-2">
          <article className="bg-white relative shadow-lg rounded-xl h-full overflow-hidden flex flex-col">
            <div className="p-4 relative flex-grow">
              <h2 className="text-lg md:text-xl font-medium mb-2 pr-8">
                {newsfData[0]?.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {newsfData[0]?.description}
              </p>
              <button
                onClick={() =>
                  openModal({
                    img: newsfData[0]?.image,
                    title: newsfData[0]?.title,
                    description: newsfData[0]?.description,
                  })
                }
                className="absolute top-4 right-4 bg-black text-white w-8 h-8 rounded-full text-center leading-8 text-sm flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="Open article details"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full aspect-video relative">
              <Image
                src={newsfData[0].image}
                alt={newsfData[0].alt}
                layout="fill"
                objectFit="cover"
                className="rounded-3xl p-4"
              />
            </div>
          </article>
        </div>
        {/* Right side smaller articles in 2x2 grid */}
        <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {newsfData.slice(1).map((news: NewsFeatureItem, index: Key) => (
            <article
              key={index}
              className="bg-white z-20 shadow-lg rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="p-3 relative flex-grow">
                <h3 className="text-sm font-medium mb-1 pr-6">{news.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {news.description}
                </p>
                <button
                  onClick={() =>
                    openModal({
                      img: news.image,
                      title: news.title,
                      description: news.description,
                    })
                  }
                  className="absolute top-3 right-3 bg-black text-white w-6 h-6 rounded-full text-center leading-6 text-xs flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Open article details"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-3">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-1/2 aspect-video relative rounded-xl overflow-hidden">
            <Image
              src={modalContent.img}
              alt={modalContent.title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl text-center lg:text-left mb-2 text-[#483d73] font-medium font-poppins">
              {modalContent.title}
            </h2>
            <div className="h-48 lg:h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <p className="font-poppins text-center lg:text-left text-sm">
                {modalContent.description}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}