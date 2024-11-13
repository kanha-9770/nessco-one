"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Constants/media-room/media-room_data.json";

const Page1 = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); //first Modal state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search field state
  const [searchQuery, setSearchQuery] = useState(""); // Track search input

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true); // Close the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to toggle the dropdown
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to toggle search field
  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Function to update search input
  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const date = new Date();

    // Get the day name (e.g., Monday, Tuesday)
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const day = String(date.getDate()).padStart(2, "0");

    // Get the month abbreviation (e.g., Jan, Feb)
    const month = date.toLocaleString("en-US", { month: "short" });

    // Get the year
    const year = date.getFullYear();

    // Format date as DD/Mon/YYYY
    const formattedDate = `${day}/${month}/${year}`;

    // Combine day and date
    setCurrentDate(`${dayName} ${formattedDate}`);
  }, []);

  return (
    <>
      <div className="bg-white h-[9rem] mt-14 w-full mb-12 font-regular font-poppins lg:px-[2rem] px-[1.5rem]">
        <h1 className="text-4xl font-medium py-[1rem]">{Header.title}</h1>
        <div className="flex items-center justify-center mt-[1rem]">
          <h2 className="w-[6rem] text-center lg:text-sm text-xs lg:mr-[2rem] mr-[1rem] font-normal">
            {currentDate}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-6 h-6 ml-2 stroke-black mr-[0.5rem] lg:hidden"
            onClick={handleOpenModal}
          >
            <line x1="4" y1="6" x2="16" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="16" y2="18" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
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
            className="feather feather-search lg:mr-[2rem] mr-[1rem] cursor-pointer"
            onClick={handleToggleSearch}
          >
            <circle cx="10" cy="10" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <div className="flex lg:space-x-8 space-x-4 lg:mr-[2rem] mr-[1rem] w-[75%] overflow-x-scroll scrollbar-hide">
            {Header.filters.map((item, index) => (
              <div key={index} className="">
                <p className="lg:text-lg text-sm font-normal">{item.title}</p>
              </div>
            ))}
          </div>
          {/* Button to toggle dropdown */}
          <div className="bg-black w-7 h-7 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer fill-white"
              onClick={handleToggleDropdown}
            >
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </div>
        </div>

        {/* Conditionally render the search input */}
        {isSearchOpen && (
          <div className="lg:mt-6 mt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="lg:w-[14.5rem] w-full h-[2rem] lg:-ml-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483d73]"
            />
          </div>
        )}
        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute lg:right-[3rem] right-[1rem] mt-2 bg-white shadow-xl rounded-md z-50 w-[8rem] h-[15rem] overflow-y-scroll scrollbar">
            <ul className="p-2">
              {Header.filters.map((item, index) => (
                <li key={index} className="py-2 px-4 hover:bg-gray-100">
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#f5f5f5] bg-opacity-50 backdrop-blur z-50 flex items-center justify-center lg:mt-14">
            <div className="bg-white lg:w-[30%] w-full h-[28rem] mx-[1rem] p-[1rem] rounded-lg shadow-lg">
              <div className="w-full h-[3rem] flex items-center border-b-2 border-solid border-[#E6E7E6]">
                <div className="flex justify-center items-center h-full w-[50%] border-r-2 border-solid border-[#E6E7E6] mb-[0.5rem] font-poppins font-medium">
                  <button onClick={handleCloseModal} aria-label="Cancel" className="text-[#838282]">
                    {Header.cancel}
                  </button>
                </div>
                <div className="flex justify-center items-center w-[50%] mb-[0.5rem] font-poppins font-medium">
                  <button aria-label="Apply" className="text-red-700">{Header.apply}</button>
                </div>
              </div>

              <div className="h-[22rem] mt-4 p-[1rem] bg-[#f5f5f5] rounded-lg">
                {/* By Category */}
                <div className="h-[14rem] overflow-y-scroll scrollbar-hide">
                  {Header.categories.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <label
                        className="font-poppins my-[0.2rem]"
                        htmlFor={item.title}
                      >
                        {item.title}
                      </label>
                      <input
                        type="checkbox"
                        id={item.title}
                        name={item.title}
                        value={item.title}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page1;
