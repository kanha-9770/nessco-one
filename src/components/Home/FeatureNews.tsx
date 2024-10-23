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
    <div className="max-w-screen-2xl relative mx-auto py-10 px-14 mb-12 font-poppins">
      <Image
        alt="Decorative Image"
        src={DecorativeImg1}
        className="w-[30rem] absolute  top-16 -left-3"
      />
      <Image
        alt="Decorative Image"
        src={DecorativeImg2}
        className="w-[40rem] absolute right-0 top-20"
      />
      <h2 className="text-2xl md:text-3xl text-center text-[#483d73] mb-10 font-semibold">
        Featured News
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side large article */}
        <div className="lg:col-span-1">
          <article className="bg-white relative shadow-lg rounded-2xl h-full overflow-hidden">
            <div className="p-4 relative h-[32%]">
              <h2 className="text-lg md:text-xl font-medium mb-2 pr-8">
                {newsfData[0]?.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {newsfData[0]?.description}
              </p>
              <span
                onClick={() =>
                  openModal({
                    img: newsfData[0]?.image,
                    title: newsfData[0]?.title,
                    description: newsfData[0]?.description,
                  })
                }
                className="absolute top-4 right-4 bg-black text-white w-6 h-6 rounded-full text-center leading-6 text-sm flex items-center justify-center"
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
              </span>
            </div>
            <div className="p-4 h-[68%]">
              <div className="w-full h-[20rem] relative rounded-xl overflow-hidden">
                <Image
                  src={newsfData[0].image}
                  alt={newsfData[0].alt}
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
            </div>
          </article>
        </div>
        {/* Right side smaller articles in 2x2 grid */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-6">
          {newsfData.slice(1).map((news: NewsFeatureItem, index: Key) => (
            <article
              key={index}
              className="bg-white z-20 h-[15.5rem] shadow-lg rounded-2xl overflow-hidden"
            >
              <div className="p-3 relative h-[35%]">
                <h3 className="text-sm font-medium mb-1 pr-6">{news.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {news.description}
                </p>
                <span
                  onClick={() =>
                    openModal({
                      img: news.image,
                      title: news.title,
                      description: news.description,
                    })
                  }
                  className="absolute top-3 right-3 bg-black text-white w-5 h-5 rounded-full text-center leading-5 text-xs flex items-center justify-center"
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
                </span>
              </div>
              <div className="p-4 h-[65%]">
                <div className="relative h-24 md:h-32 rounded-xl overflow-hidden">
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
        <div className="flex lg:flex-row flex-col items-center justify-center lg:space-x-4">
          <Image
            className="lg:w-[50%] rounded-3xl lg:mt-0 mt-6"
            width={400}
            height={400}
            src={modalContent.img}
            alt={modalContent.title}
          />
          <div className="lg:w-[50%] w-full">
            <h2 className="text-xl lg:text-left text-center lg:mt-0 mt-[0.5rem] mb-[0.5rem] text-[#483d73] font-medium font-poppins mr-1">
              {modalContent.title}
            </h2>
            <div className="overflow-hidden lg:h-[12.5rem] lg:pr-4 w-full h-[11rem]">
              <div className="overflow-auto h-full scrollbar-custom scrollbar">
                <p className="font-poppins lg:text-left text-center text-sm">
                  {modalContent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
