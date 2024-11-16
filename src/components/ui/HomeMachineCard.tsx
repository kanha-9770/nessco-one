"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import Breadcrumb from "./Breadcrumb";
import BlurImage from "./BlurImage";

type Card = {
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

const Card = ({ card }: { card: Card}) => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: card.title, current: true },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-48 rounded-3xl bg-white font-poppins p-1 lg:p-2 w-40 lg:h-[16rem] md:w-56 overflow-hidden flex flex-col items-start justify-start relative z-10">
          <div className="relative p-2 h-full w-full">
            <div className="absolute flex bg-white h-14 lg:h-16 w-24 lg:w-32 flex-row top-0 space-x-2 -mr-4 right-0 z-40 rounded-bl-xl">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 -ml-4 mt-0"
                >
                  <path
                    d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-row h-14 w-12 lg:w-20 items-center justify-center">
                <div className="h-full w-16 lg:h-20 lg:w-20 flex items-center justify-center">
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
                  <div className="relative h-8 w-8 lg:h-12 lg:w-12 -mr-4  border-2 border-[#483d78] rounded-full bg-white inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg lg:text-base font-bold text-[#dc0e2a]">
                      70
                    </span>
                    <span className="text-5 text-[#483d78]">PCM/MIN</span>
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
              <Link className="text-black font-poppins text-sm md:text-base font-regular text-left" href={`/${countryCODE}/${languageCODE}/product/${card.title}`}>
                {card.title}
              </Link>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[78rem] h-[90vh] p-0 z-[99999]">
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 font-poppins font-regular md:p-14 h-full rounded-3xl relative">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <Breadcrumb items={breadcrumbItems} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col items-center">
              <Link
                className=""
                href={`/${countryCODE}/${languageCODE}/product`}
              >
                <BlurImage
                  src={card.image}
                  alt={card.title}
                  width={600}
                  height={400}
                  className="rounded-2xl object-fill lg:object-contain h-[350px]"
                />
              </Link>
              <div className="flex w-[60%] lg:-ml-14 space-x-2 lg:space-x-8 justify-center mt-8">
                <Link
                  className="ml-1"
                  href={`/${countryCODE}/${languageCODE}/product`}
                >
                  <Button
                    className="rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-white hover:text-primary border-2 border-primary px-6 py-2 text-base font-medium transition-all duration-300 ease-in-out group"
                    aria-label="View all items"
                  >
                    <span className="mr-2">View All</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform transition-transform duration-300 ease-in-out -rotate-45 group-hover:rotate-0 group-hover:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-xl lg:text-3xl font-semibold lg:font-bold mb-4">
                <span className="text-red-600">{card.firstname}</span>
                <span className="text-[#483d78] ml-2">{card.secondname}</span>
              </h2>
              <p className="text-gray-700 text-sm font-regular mb-4">
                {card.description}
              </p>
              <ul className="list-none grid grid-cols-2 gap-4 text-gray-700">
                {card.items.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-sm font-regular">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Card;