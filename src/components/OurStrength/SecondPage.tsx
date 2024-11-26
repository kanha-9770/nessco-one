'use client'

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { OurStrengthItem } from "./types/constant";

interface MainLayoutProps {
  strengthData: OurStrengthItem;
}

const baseTop = 15;
const spacing = 11;

const SecondPage: React.FC<MainLayoutProps> = ({ strengthData }) => {
  const title = strengthData?.OurStrength[2]?.OurStrengthFeature?.strengthItems;
  const component = strengthData?.OurStrength[2]?.OurStrengthFeature?.StrengthComponent;

  const containerRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentData, setComponentData] = useState(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const secondPageStart = windowHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollableHeight = documentHeight - secondPageStart;

      if (scrollTop > secondPageStart) {
        const scrolledFromSecondPage = scrollTop - secondPageStart;
        const scrolled = (scrolledFromSecondPage / scrollableHeight) * 80;
        setScrollPercent(scrolled);
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openModal = (content) => {
    setComponentData(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setComponentData(null);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      let newActiveIndex = null;

      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const index = target.dataset.index;

        if (entry.isIntersecting) {
          newActiveIndex = index;
        }
      });

      setActiveIndex(newActiveIndex);
    }, options);

    containerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      containerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div>
      <div className="relative h-screen items-center min-h-[400vh] mb-[38rem]">
        <div className="Feature sticky top-0 flex flex-col lg:items-center">
          <div className="absolute lg:-top-[6rem] text-white text-3xl">
            {/* <Image
              src="/assets/ourStrength/Line.svg"
              width={850}
              height={100}
              alt="img"
              className="lg:visible invisible"
            /> */}
          </div>
          <div
            className="absolute top-[10vh] lg:h-[40rem] h-[80rem] w-[0.15rem] lg:ml-0 ml-5"
            style={{
              background: `linear-gradient(to bottom, #76479C ${scrollPercent}%, white ${scrollPercent}%)`,
            }}
          ></div>
          {title?.map((item, index) => (
            <div
              key={index}
              className="absolute scale-75 font-poppins"
              style={{ top: `${baseTop + index * spacing}vh` }}
            >
              <div className="flex items-center justify-center">
                {index % 2 === 0 && (
                  <h1
                    className={`absolute left-[2rem] text-black text-center italic text-[1rem] transition-all duration-500 ${
                      activeIndex == index ? "font-black text-[2vw] scale-75" : ""
                    }`}
                  >
                    {item?.title}
                  </h1>
                )}
                <div
                  className={`bg-white w-5 h-5 rounded-full border-[#76479C] border-[0.3rem] transition-all duration-500 lg:ml-0 ml-3 ${
                    activeIndex == index ? "border-[0.62rem]" : ""
                  }`}
                ></div>
                {index % 2 !== 0 && (
                  <span
                    className={`absolute lg:right-[2rem] w-[10rem] -right-[10rem] text-black text-left pl-2 lg:text-center italic text-[1rem] transition-all duration-500 ${
                      activeIndex == index ? "font-black scale-75" : ""
                    }`}
                  >
                    {item?.title}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {component?.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              containerRefs.current[index] = el;
            }}
            data-index={index}
            className={`absolute -mt-[15rem] lg:mt-0 ${
              index % 2 === 0
                ? "lg:left-[2rem] left-[10rem]"
                : "lg:right-[2rem] right-[1.5rem]"
            } lg:w-[26rem] lg:h-[30rem] h-[26rem] w-[13rem] bg-white rounded-3xl transition-all duration-500`}
            style={{ top: `${50 + index * 80}vh` }}
          >
            <div className="grid lg:grid-cols-2 lg:gap-4 lg:mx-8 mx-3 mt-5">
              <div className="grid justify-items-center order-last lg:order-none">
                <h1 className="lg:text-2xl text-lg lg:mt-6 font-normal font-poppins text-center">
                  {item?.title1}
                </h1>
                <h1 className="font-poppins font-semibold lg:text-lg text-xs text-center text-[#76479C]">
                  {item?.title2}
                </h1>
              </div>
              <video
                id="background-video"
                className="w-full h-full object-cover rounded-xl bg-yellow-200"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src="https://res.cloudinary.com/dlti4o10e/video/upload/v1728990175/samples/cld-sample-video.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="lg:mx-8 mx-3 lg:mt-10 mt-3 font-poppins lg:text-sm text-xs text-center lg:text-left">
              {window.innerWidth <= 1024
                ? item?.description.split(" ").slice(0, 16).join(" ") + "..."
                : item?.description}
            </p>
            <button
              aria-label="open-button"
              className="absolute bottom-2 right-2 text-[3rem]"
              onClick={() => openModal(item)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
              </svg>
            </button>
          </div>
        ))}

        {isModalOpen && componentData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
            <div className="flex flex-col items-center justify-center lg:h-[30rem] lg:w-[60rem] w-full p-4 lg:mt-12 relative bg-[#f5f5f5] rounded-3xl">
              <div className="relative lg:w-[60rem] w-[22rem] flex justify-center items-center mt-10">
                <div className="overflow-hidden lg:w-[30rem] w-[25rem] -mt-5">
                  <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1.5}
                    loop={true}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 100,
                      depth: 50,
                      modifier: 2,
                      slideShadows: true,
                    }}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    modules={[EffectCoverflow, Navigation]}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }}
                    className="mySwiper"
                  >
                    {componentData?.modalContent?.images?.map((img, index) => (
                      <SwiperSlide key={index}>
                        <Image src="https://res.cloudinary.com/dlti4o10e/image/upload/v1728990173/samples/ecommerce/leather-bag-gray.jpg" width={300} height={300} alt="img" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div ref={prevRef} className="absolute left-[10rem] cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    height={30}
                    width={30}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div ref={nextRef} className="absolute right-[10rem] cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    height={30}
                    width={30}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <button
                aria-label="close-button"
                className="absolute right-5 top-5"
                onClick={closeModal}
              >
                <svg
                  viewBox="0 0 24 24"
                  height={40}
                  width={40}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
                      fill="#292D32"
                    ></path>
                  </g>
                </svg>
              </button>
              <h1 className="text-[#76479C] font-bold text-2xl">
                {componentData?.modalContent?.title}
              </h1>
              <p className="font-poppins text-[#76479C] font-semibold text-xs px-10 text-center">
                {componentData?.modalContent?.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondPage;