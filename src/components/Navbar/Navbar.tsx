"use client";

import React, { useState } from "react";
import Link from "next/link";
import { countryCODE, languageCODE, Menu } from "./nav-menue";
import dynamic from "next/dynamic";
const MenuItem = dynamic(() => import("./nav-menue"));
const ContactForm = dynamic(() => import("../Contact/Contact"));
const SVGComponent = dynamic(() => import("./BlueLogo"));
const CountryLayout = dynamic(() => import("./NavLayouts/CountryLayout"), {
  ssr: false,
});
import AboutLayout from "@/components/Navbar/NavLayouts/AboutLayout";
import ApplicationLayout from "@/components/Navbar/NavLayouts/ApplicationLayout";
import ProductLayout from "@/components/Navbar/NavLayouts/ProductLayout";
import ResourceGrid from "@/components/Navbar/NavLayouts/ResourceLayout";
import SupportGrid from "@/components/Navbar/NavLayouts/SupportLayout";
import VideoGrid from "@/components/Navbar/NavLayouts/VideoLayout";
import { NavbarData } from "./types/constant";
import MinusSvg from "../ui/MinusSvg";
import PlusSvg from "../ui/PlusSvg";

interface NavbarItem {
  name: string;
  link: string;
  component?: React.ReactNode;
  type?: string;
  hasComponent: boolean;
}

interface navLayoutProps {
  navData: NavbarData;
}

export default function NavbarDemo({ navData }: navLayoutProps) {
  return (
    <div className="relative lg:h-auto lg:mt-0 flex items-center justify-between lg:justify-center">
      <Navbar navData={navData} className="top-0" />
    </div>
  );
}

interface NavbarProps {
  className?: string;
  navData: NavbarData;
}

function Navbar({ className, navData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setExpandedItem(null);
    }
  };

  const expandItem = (item: string) =>
    setExpandedItem(expandedItem === item ? null : item);

  const navbarItems: NavbarItem[] = [
    {
      name: `${navData?.navbar[0]?.category}`,
      link: "about",
      component: <AboutLayout navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[1]?.category}`,
      link: "products",
      component: (
        <ProductLayout
          setHoveredItem={() => {}}
          setHeading={() => {}}
          setIsVisible={() => {}}
          navData={navData}
        />
      ),
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[2]?.category}`,
      link: "application",
      component: (
        <ApplicationLayout
          navData={navData}
          setActive={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[3]?.category}`,
      link: "support",
      component: <SupportGrid navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[4]?.category}`,
      link: "resources",
      component: <ResourceGrid navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[5]?.category}`,
      link: "videos",
      component: <VideoGrid navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[6]?.category}`,
      link: "contact",
      hasComponent: false,
    },
  ];

  return (
    <div
      className={`fixed flex w-full bg-white text-black h-14 font-poppins lg:mt-0 items-center inset-x-0 mx-auto z-[999] ${className}`}
    >
      {/* Desktop Menu */}
      <div className="hidden px-12 lg:flex w-full">
        <div className="w-1/5 flex items-center">
          <Link
            href={`/${countryCODE}/${languageCODE}`}
            className="w-20 h-full flex items-center"
          >
            <SVGComponent />
          </Link>
        </div>
        <div className="w-3/5 flex items-center justify-center">
          <Menu>
            {navbarItems?.map((item) => (
              <MenuItem
                key={item?.name}
                setActive={setActive}
                active={active}
                item={item?.name}
                setPosition={() => {}}
                link={item?.link}
              >
                {item?.component}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="w-1/5 flex justify-end items-center gap-4">
          <div>
            <CountryLayout />
          </div>
          <ContactForm />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex w-full">
        <div className="lg:hidden w-full flex justify-between items-center p-4">
          <Link
            href={`${languageCODE}`}
            className="h-14 w-14  flex items-center"
          >
            <SVGComponent />
          </Link>
          <button
            className="ml-2 text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gray-300/90 backdrop-blur-[80px] h-screen shadow-lg z-50">
            <div className="flex bg-white cursor-pointer h-2/3 p-4 flex-col space-y-3">
              {navbarItems?.map((item) => (
                <div key={item?.name}>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(null);
                      expandItem(item?.name);
                    }}
                    className="flex -mt-3 justify-between items-center py-2 border-b"
                  >
                    {item?.name}
                    
                    {item.hasComponent && (
                      <button className="text-gray-500 pr-2">
                        {expandedItem === item?.name ? (
                          <MinusSvg />
                        ) : (
                          <PlusSvg />
                        )}
                      </button>
                    )}
                  </div>
                  {item.hasComponent && expandedItem === item?.name && (
                    <div className="absolute h-screen inset-0 bg-white z-50 flex flex-col">
                      <div className="flex border-b-2 bg-[#f2f2f2] justify-between items-center">
                        <span className="text-lg pl-4 text-[#483d73] font-semibold">
                          {item?.name}
                        </span>
                        <button
                          className="invert-0 p-4"
                          onClick={() => expandItem(item?.name)}
                        >
                          -
                        </button>
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm text-gray-700">
                          {item?.component}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="w-full">
                <div className="relative -mt-3 h-full flex flex-col w-full lg:hidden">
                  <div className="flex flex-row justify-between items-center gap-2 border-t-[1px] border-b-[1px] w-full p-2">
                    <div className="absolute top-20">
                      <CountryLayout />
                    </div>
                    <div className="relative"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
