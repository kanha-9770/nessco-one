"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import DecorativeImg1 from "../../../public/assets/OurExpertise/DecorativeImg1.svg";
import DecorativeImg2 from "../../../public/assets/OurExpertise/DecorativeImg2.svg";
import BackgroundSvg from "../../../public/assets/OurExpertise/BackgroundSvg.svg";
import { HomeData } from "./types/constant";

interface KnowMoreLayoutProps {
  heroData: HomeData;
}

export default function Component({ heroData }: KnowMoreLayoutProps) {
  const knowMoreData = heroData?.home[6]?.data?.knowmore;
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 3000); // Adjust this value as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative container h-full mb-60 mt-10 mx-auto py-8 px-14">
      <Image
        alt="Decorative Image"
        src={DecorativeImg1}
        className="w-40 absolute top-20 right-16"
      />
      <Image
        alt="Decorative Image"
        src={DecorativeImg2}
        className="w-40 absolute -bottom-48 left-12"
      />
      <Image
        alt="Decorative Image"
        src={BackgroundSvg}
        className="w-full scale-80 opacity-10 absolute top-10 left-0 right-0"
      />
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-[#483d73]">
          {heroData?.home[6]?.category}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {knowMoreData?.map((item, index) => (
          <div
            key={index}
            className={`group  relative transition-transform duration-500 ease-in-out ${
              isScrolled && index % 2 !== 0 ? "translate-y-20" : ""
            }`} // This will move the second component down on scroll
          >
            <Dialog
              open={openModal === index}
              onOpenChange={(isOpen) => setOpenModal(isOpen ? index : null)}
            >
              <DialogTrigger asChild>
                {index % 2 !== 0 && (
                  <div className="group-hover:shadow-2xl bg-white max-w-[300px] mx-auto  p-2 rounded-[1.2rem] shadow-lg transition-all duration-300">
                    <div className="flex justify-between  items-center">
                      <h3 className="text-sm ml-4 w-[12.5rem]">{item?.title}</h3>

                      {item?.description?.split(" ").length > 20 && (
                        <Dialog
                          open={openModal === index}
                          onOpenChange={(isOpen) =>
                            setOpenModal(isOpen ? index : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <svg
                              className="h-10 w-10 bg-black p-1.5 rounded-full text-white transform transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:bg-[#483d73]"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 17L17 7M17 7H8M17 7V16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </DialogTrigger>
                          <DialogContent>
                            <div className="rounded-2xl">
                              <DialogHeader>
                                <DialogTitle>{item?.title}</DialogTitle>
                              </DialogHeader>
                              <p className="text-sm text-gray-600">
                                {item?.description}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                )}
              </DialogTrigger>
            </Dialog>
            <Card
              className={`group-hover:shadow-2xl  transition-all duration-300 rounded-3xl shadow-md w-full max-w-[300px] h-[320px] mx-auto relative bg-white ${
                index % 2 !== 0 ? "mt-6" : ""
              }`}
            >
              <CardContent>
                {index % 2 === 0 ? (
                  <Dialog
                    open={openModal === index}
                    onOpenChange={(isOpen) =>
                      setOpenModal(isOpen ? index : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <div className="p-3 rounded-3xl bg-white h-full lg:mt-0 mt-28">
                        <Image
                          src={item?.src}
                          alt={item?.title}
                          width={200}
                          height={200}
                          className="w-full h-36 object-cover rounded-2xl"
                        />
                        <div className="p-1">
                          <p className="text-sm text-center lg:text-left text-gray-600 line-clamp-6">
                            {item?.description}
                          </p>
                          {item?.description?.split(" ").length > 20 && (
                            <Dialog
                              open={openModal === index}
                              onOpenChange={(isOpen) =>
                                setOpenModal(isOpen ? index : null)
                              }
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="link"
                                  className="mt-1 p-0 h-auto hover:text-[#483d73] text-center lg:text-left w-full lg:w-max"
                                >
                                  Read More
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <div className="bg-white rounded-2xl">
                                  <DialogHeader>
                                    <DialogTitle>{item?.title}</DialogTitle>
                                  </DialogHeader>
                                  <p className="text-sm text-gray-600 text-center lg:text-left">
                                    {item?.description}
                                  </p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </DialogTrigger>
                  </Dialog>
                ) : (
                  <Dialog
                    open={openModal === index}
                    onOpenChange={(isOpen) =>
                      setOpenModal(isOpen ? index : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <div className="p-3 rounded-3xl bg-white h-full">
                        <p className="text-sm text-gray-600 line-clamp-6 text-center lg:text-left">
                          {item?.description}
                        </p>
                        {item?.description?.split(" ").length > 40 && (
                          <Dialog
                            open={openModal === index}
                            onOpenChange={(isOpen) =>
                              setOpenModal(isOpen ? index : null)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="link"
                                className="mt-1 p-0 h-auto hover:text-[#483d73] lg:text-left text-center w-full lg:w-max"
                              >
                                Read More
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white sm:max-w-[900px] rounded-2xl flex lg:flex-row flex-col items-center justify-center">
                              <div className="lg:w-1/2 w-full">
                                <Image
                                  src={item?.src}
                                  alt={item?.title}
                                  width={200}
                                  height={200}
                                  className="w-full object-cover rounded-2xl"
                                />
                              </div>
                              <div className="lg:w-1/2 w-full">
                                <DialogHeader>
                                  <DialogTitle>{item?.title}</DialogTitle>
                                </DialogHeader>
                                <p className="text-sm text-gray-600 text-center lg:text-left">
                                  {item?.description}
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Image
                          src={item?.src}
                          alt={item?.title}
                          width={200}
                          height={200}
                          className="w-full h-36 object-cover rounded-2xl mt-2"
                        />
                      </div>
                    </DialogTrigger>
                  </Dialog>
                )}
              </CardContent>
            </Card>
            {index % 2 === 0 && (
              <div className="mt-6 group-hover:shadow-2xl max-w-[300px] mx-auto text-black rounded-[1.2rem] shadow-lg">
                <Dialog
                  open={openModal === index}
                  onOpenChange={(isOpen) => setOpenModal(isOpen ? index : null)}
                >
                  <DialogTrigger asChild>
                    <div className="flex items-center justify-between p-2 bg-white rounded-[1.2rem] shadow-2xl">
                      <h3 className="text-sm w-[12.5rem] ml-4">{item?.title}</h3>

                      {item?.description?.split(" ").length > 40 && (
                        <Dialog
                          open={openModal === index}
                          onOpenChange={(isOpen) =>
                            setOpenModal(isOpen ? index : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <svg
                              className="h-10 w-10 bg-black p-1.5 rounded-full text-white transform transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:bg-[#483d73]"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 17L17 7M17 7H8M17 7V16"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </DialogTrigger>
                          <DialogContent className="bg-white sm:max-w-[900px] rounded-2xl flex lg:flex-row flex-col items-center justify-center">
                            <div className="lg:w-1/2 w-full">
                              <Image
                                src={item?.src}
                                alt={item?.title}
                                width={200}
                                height={200}
                                className="w-full object-cover rounded-2xl"
                              />
                            </div>
                            <div className="lg:w-1/2 w-full">
                              <DialogHeader>
                                <DialogTitle>{item?.title}</DialogTitle>
                              </DialogHeader>
                              <p className="text-sm text-gray-600 text-center lg:text-left">
                                {item?.description}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </DialogTrigger>
                </Dialog>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
