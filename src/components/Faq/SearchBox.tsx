"use client";
import React, { useState, useEffect } from "react";
import { searchbox } from "../Constants/faq/faq.json";

interface SearchBoxProps {
  filter: string,
  byCategory:string,
  placeholder:string,
  onCategorySelect: (categories: string[]) => void;
  onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onCategorySelect,
  onSearch,
}) => {
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategories,] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };



  const displayCategories = showCategories
    ? searchbox.categories.map((cat) => cat.name)
    : searchbox.categories.map((cat) => cat.name).slice(0, 6);

  useEffect(() => {
    onCategorySelect(selectedCategories);
  }, [selectedCategories]);

  return (
    <div className=" bg-white rounded-lg p-3 mt-3 sticky ">
      <div className="lg:w-full lg:h-[29rem] lg:pr-3 lg:px-0 px-[6vw] border-[#E6E7E6] overflow-auto sticky lg:rounded-none rounded-[0.5rem]">
        <div className="flex justify-between">
          <p className="mb-2 font-poppins invisible lg:visible text-gray-500">
            {searchbox.filter}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -3.5 21 21"
            fill="#000000"
            width="30" /* Adjust size as needed */
            height="30"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>settings [#1389]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-99.000000, -760.000000)"
                  fill="#000000"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M53.5,603 C53.5,602.647 53.5756,602 53.6932,602 L43,602 L43,604 L53.6932,604 C53.5756,604 53.5,603.353 53.5,603 L53.5,603 Z M61.7068,602 C61.27315,601 60.1192,600 58.75,600 C57.01015,600 55.6,601.343 55.6,603 C55.6,604.657 57.01015,606 58.75,606 C60.1192,606 61.27315,605 61.7068,604 L64,604 L64,602 L61.7068,602 Z M53.5,611 C53.5,611.353 53.4244,611.686 53.3068,612 L64,612 L64,610 L53.3068,610 C53.4244,610 53.5,610.647 53.5,611 L53.5,611 Z M51.4,611 C51.4,612.657 49.98985,614 48.25,614 C46.8808,614 45.72685,613 45.2932,612 L43,612 L43,610 L45.2932,610 C45.72685,609 46.8808,608 48.25,608 C49.98985,608 51.4,609.343 51.4,611 L51.4,611 Z"
                      id="settings-[#1389]"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* Search Field */}
        <div className="flex rounded-[2rem] bg-white overflow-hidden border-2 border-gray-300">
          <button aria-label="search" className="relative text-black left-2 h-10 w-7 p-2"
          
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="20" /* Adjust size as needed */
              height="20"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000" /* Adjust stroke color */
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </button>
          <input
            type="search"
            placeholder={searchbox.placeholder}
            style={{ fontSize: "0.8rem"}}
            className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black font-poppins "
            value={searchTerm}
            onChange={handleSearchChange}
           
          />
        </div>
        <div className="border relative top-4 border-gray-300"></div>

        {/* By Category */}
        <div className="mt-6">
          {displayCategories.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <label
                className="font-poppins text-[#575555] my-[0.2rem]"
                htmlFor={item}
              >
                {item}
              </label>
              <input
                type="checkbox"
                id={item}
                name={item}
                value={item}
                checked={selectedCategories.includes(item)}
                onChange={() => handleCategoryChange(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
