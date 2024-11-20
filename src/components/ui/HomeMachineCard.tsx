"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import Breadcrumb from "./Breadcrumb";
import BlurImage from "./BlurImage";

type Card = {
  firstLink: string;
  secondLink: string;
  unit: string;
  speed: number;
  description: string;
  items: { className: string; text: string }[];
  firstname: string;
  secondname: string;
  image: string;
  title: string;
  icon: string;
  category: string;
  content?: React.ReactNode;
};

const Card = ({ card, activeStep }: { card: Card; activeStep: string }) => {
  function formatString(input) {
    if (!input) return ""; // Return an empty string if input is undefined or null
    return input
      .replace(/-/g, " ") // Replace all '-' with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize every word's first letter
  }
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label: activeStep === "All paper Products" ? formatString(card.secondLink)  : activeStep,
      href: `/products/${
        activeStep === "All paper Products" ? card.secondLink : card.secondLink
      }`,
    },
    { label: card.firstname },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-48 rounded-3xl bg-white font-poppins p-1 lg:p-2 w-40 lg:h-[16rem] md:w-56 overflow-hidden flex flex-col items-start justify-start relative z-10">
          <div className="relative p-2 h-full w-full">
            <div className="absolute flex bg-white h-14 lg:h-16 w-28 lg:w-32 flex-row top-0 space-x-2 -mr-4 right-0 z-40 rounded-bl-xl">
              <div className="flex flex-row items-center justify-center">
                <div className="h-full ml-2 w-12 lg:h-16 lg:w-full flex items-center justify-center">
                  <Image
                    src={card.icon}
                    alt="icon"
                    height={100}
                    width={100}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-10 w-10 lg:h-12 lg:w-12 -mr-4  border-2 border-[#483d78] rounded-full bg-white inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs lg:text-base font-bold text-red-700">
                      {card?.speed}
                    </span>
                    <span className="text-[0.3rem] lg:text-[0.4rem] lg:-mt-2 lg:w-[2rem] w-[1.6rem] h-[0.8rem] lg:h-[1.2rem] font-bold text-[#483d78] whitespace-normal break-words">{card?.unit}</span>
                  </div>
                </div>
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 mt-14 lg:mt-16 mr-4"
                >
                  <path
                    d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>

            <Image
              src={card.image}
              alt={card.title}
              height={640}
              width={480}
              className="border-2 bg-[#f2f2f2] rounded-[1.5rem] absolute h-full object-contain z-10 inset-0"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute -mb-2 font-poppins left-0 right-0 bottom-0 z-40 p-4">
              <Link
                className="text-black font-poppins text-sm md:text-sm  text-center line-clamp-2 font-regular "
                href={`/${countryCODE}/${languageCODE}/products/${
                  activeStep === "All paper Products"
                    ? card?.secondLink
                    : card.secondLink
                }/${card.firstLink}`}
              >
                {card.title}
              </Link>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[78rem] p-0 z-[99999]">
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 font-poppins font-regular md:p-8 rounded-3xl relative">
          <DialogClose className="absolute right-4 top-4"></DialogClose>
          <Breadcrumb items={breadcrumbItems} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col items-center ml-20">
              <Link
                className=""
                href={`/${countryCODE}/${languageCODE}/products/${
                  activeStep === "All paper Products"
                    ? card.secondLink
                    : card.secondLink
                }/${card.firstLink}`}
              >
                <BlurImage
                  src={card.image}
                  alt={card.title}
                  width={600}
                  height={400}
                  className="rounded-2xl object-fill lg:object-contain h-[20rem]"
                />
              </Link>
              <div className="flex items-center space-x-8 justify-center w-full">
                <div className="flex w-1/2 items-center space-x-2 lg:space-x-8 justify-center mt-8">
                  <Link
                    className="ml-1"
                    href={`/${countryCODE}/${languageCODE}/products/${
                      activeStep === "All paper Products"
                        ? card.secondLink
                        : card.secondLink
                    }/${card.firstLink}`}
                  >
                    <Button
                      className="rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-red-700 border-2 group border-red-700 w-[14rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group relative"
                      aria-label="View all items"
                    >
                      <span className="text-red-700 group-hover:text-white">
                        View Machine
                      </span>
                      <span className="bg-red-700 group-hover:bg-white p-1 rounded-full absolute right-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-white group-hover:stroke-red-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
                <div className="flex w-1/2 items-center space-x-2 lg:space-x-8 justify-center mt-8">
                  <Link
                    className="ml-1"
                    href={`/${countryCODE}/${languageCODE}/products/${
                      activeStep === "All paper Products"
                        ? card.secondLink
                        : card.secondLink
                    }/`}
                  >
                    <Button
                      className="rounded-full relative flex items-center justify-center bg-primary text-primary-foreground hover:bg-[#483d73] border-2 group border-[#483d73] w-[14rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group"
                      aria-label="View all items"
                    >
                      <span className="text-[#483d73] group-hover:text-white">
                        View All
                      </span>
                      <span className="bg-[#483d73] group-hover:bg-white p-1 rounded-full absolute right-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-white group-hover:stroke-[#483d73]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="pr-16">
              <div className="text-justify">
                <h2 className="text-xl lg:text-3xl font-semibold lg:font-bold mb-4">
                  <div className="bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent w-max">
                    {card.secondname}
                  </div>
                  <span className="bg-[#483d78] bg-clip-text  text-transparent ">
                    {card.firstname}
                  </span>
                </h2>
              </div>
              <p className="text-gray-700 text-justify  text-sm font-regular py-4">
                {card.description}
              </p>
              <ul className="list-none grid grid-cols-2 gap-4 text-gray-700 py-4 rounded-lg">
                {card.items.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4"
                      fill="#b01e23"
                      viewBox="0 0 256 256"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#b01e23"
                    >
                      <g stroke-width="0" />
                      <g stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M236 139.313 139.313 236a16.02 16.02 0 0 1-22.627 0L20 139.313a16.02 16.02 0 0 1 0-22.627L116.687 20a16.02 16.02 0 0 1 22.627 0L236 116.687a16.02 16.02 0 0 1 0 22.626Z" />
                    </svg>

                    <span className="text-sm font-medium text-start">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex w-full space-x-2 lg:space-x-8 justify-end mt-2">
                <Link
                  className="ml-1"
                  href={`/${countryCODE}/${languageCODE}/contact`}
                >
                  <Button
                    className="rounded-full  flex items-center justify-center bg-gradient-to-r from-[#483d73] to-red-700 pl-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group bg-clip-border custom-gradient-border"
                    aria-label="View all items"
                  >
                    <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700">
                      Get a Quote
                    </span>
                    <span className="bg-white group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700 p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-4 h-4 group-hover:stroke-white stroke-[#483d73]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
