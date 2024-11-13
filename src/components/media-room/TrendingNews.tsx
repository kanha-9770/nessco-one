"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { TrendingNews } from "@/components/Constants/media-room/media-room_data.json";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/components/media-room/Modal"));

const Page2 = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    img: "",
    title: "",
    dialogDescription: "",
  });

  const openModal = (content: {
    img: string;
    title: string;
    dialogDescription: string;
  }) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const scrollbarLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollbarRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-white h-full w-full rounded-2xl font-poppins px-[1.5rem] pb-2">
        <h2 className="text-[#483d73] text-2xl py-4">{TrendingNews.title}</h2>

        <div
          ref={carouselRef}
          className="flex overflow-x-scroll space-x-4 scrollbar pb-2"
        >
          {TrendingNews.sections.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border-r-2 pr-1"
            >
              <div className="lg:w-[8rem] w-[6rem]">
                <Image
                  className="rounded-xl"
                  width={400}
                  height={400}
                  src={item.img}
                  alt={""}
                />
              </div>
              <div className="lg:w-[18rem] w-[10rem] relative">
                <div className="absolute top-0 right-0 text-lg hover:bg-[#E6E7E6] rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </div>
                <p className="border border-black rounded-md text-center w-max px-2 lg:text-md text-sm">
                  {item.filter}
                </p>
                <h3 className="font-medium lg:text-lg text-md">{item.title}</h3>
                <button
                  aria-label="Open"
                  onClick={() => openModal(item)}
                  className="flex items-center text-[#483d73] text-sm group bg-[#E6E7E6] hover:bg-black hover:text-white rounded-full pl-2 pr-1"
                >
                  {item.continueReading}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-4 h-4 ml-2 stroke-black group-hover:stroke-white"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-2 justify-end lg:text-3xl text-2xl z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="lg:w-6 w-5 lg:h-6 h-5 mr-2"
            onClick={scrollbarLeft}
          >
            <circle
              cx="32"
              cy="32"
              r="32"
              className="fill-black hover:fill-red-700 cursor-pointer"
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
            onClick={scrollbarRight}
          >
            <circle
              cx="32"
              cy="32"
              r="32"
              className="fill-black hover:fill-red-700 cursor-pointer"
            />
            <path
              d="M25 20 L37 32 L25 44"
              className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
            />
          </svg>
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
            <h2 className="text-xl lg:text-left text-center lg:mt-0 mt-[0.5rem] mb-[0.5rem] text-[#483d73] font-medium font-poppins">
              {modalContent.title}
            </h2>
            <div className="overflow-hidden lg:h-[12rem] lg:pr-4 w-full h-[11rem]">
              <div className="overflow-auto h-full scrollbar-custom scrollbar">
                <p className="font-poppins lg:text-left text-center text-sm">
                  {modalContent.dialogDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Page2;
