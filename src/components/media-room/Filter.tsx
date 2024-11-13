"use client";
import React from "react";
import { Header } from "@/components/Constants/media-room/media-room_data.json";

const Filter = () => {
  return (
    <>
      <div className="font-regular font-poppins">
        <div className="w-full h-[57rem] pr-8 border-r-2">
          <p className="mb-2 font-poppins invisible lg:visible">
            {Header.filter}
          </p>
          <p className="mb-2 font-poppins">{Header.byCategory}</p>

          {/* Search Field */}
          <div className="flex rounded-[1rem]  bg-white overflow-hidden">
            <input
              arial-label="Search"
              type="search"
              placeholder={Header.placeholder}
              className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black font-poppins"
            />
            <button className="mr-[0.5rem] text-black" arial-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-search"
              >
                <circle cx="10" cy="10" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* By Category */}
          <div className="mt-3 lg:h-full h-[14rem] lg:overflow-auto overflow-y-scroll scrollbar-custom scrollbar">
            {Header.categories.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <label className="font-poppins my-[0.2rem]" htmlFor={item.title}>
                  {item.title}
                </label>
                <input
                  arial-label="Checkbox"
                  type="checkbox"
                  id={item.title}
                  name={item.title}
                  value={item.title}
                  className="mr-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
