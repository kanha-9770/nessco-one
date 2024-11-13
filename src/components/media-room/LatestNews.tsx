"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LatestNews } from "@/components/Constants/media-room/media-room_data.json";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/components/media-room/Modal"));

const Page3 = () => {
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

  return (
    <>
      <div className="bg-white h-full lg:w-[70%] lg:mb-0 mb-6 rounded-2xl font-poppins px-[1.5rem]">
        <h2 className="text-[#483d73] text-2xl my-4">{LatestNews.mainTitle}</h2>
        <div className="h-[37rem] overflow-hidden mb-4">
          <div className="overflow-y-auto scrollbar h-full space-y-4 pr-1">
            <div className="flex lg:flex-row flex-col items-center lg:space-x-6 border-b-2 pb-[1.2rem] mb-[1.2rem]">
              <div className="lg:w-[40%] lg:mb-0 mb-4">
                <Image
                  className="rounded-xl"
                  width={400}
                  height={400}
                  src={LatestNews.img}
                  alt={""}
                />
              </div>
              <div className="lg:w-[60%] space-y-2 relative">
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
                <p className="border border-black rounded-md text-center w-max px-3">
                  {LatestNews.mainTitle}
                </p>
                <h3 className="font-semibold text-lg">{LatestNews.title}</h3>
                <p className="text-sm">{LatestNews.description}</p>
                <button
                  aria-label="Open"
                  onClick={() =>
                    openModal({
                      img: LatestNews.img,
                      title: LatestNews.title,
                      dialogDescription: LatestNews.dialogDescription,
                    })
                  }
                  className="flex items-center text-[#483d73] text-sm group  bg-[#E6E7E6] hover:bg-black hover:text-white rounded-full pl-2 pr-1"
                >
                  {LatestNews.continueReading}
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
            {LatestNews.sections.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b-2 pb-[1rem] space-x-4"
              >
                <div className="lg:w-[20%] w-[30%]">
                  <Image
                    className="rounded-xl"
                    width={400}
                    height={400}
                    src={item.img}
                    alt={""}
                  />
                </div>
                <div className="lg:w-[80%] w-[70%] space-y-2 relative">
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
                  <p className="border border-black rounded-md text-center  w-max px-3">
                    {item.filter}
                  </p>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <button
                    aria-label="Open"
                    onClick={() => openModal(item)}
                    className="flex items-center group  bg-[#E6E7E6] hover:bg-black hover:text-white rounded-full pl-2 pr-1 text-[#483d73] text-sm"
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

export default Page3;
