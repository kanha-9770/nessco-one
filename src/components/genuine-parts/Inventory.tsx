"use client";
import React, { useState, useEffect } from "react";
import { Inventory } from "@/components/Constants/genuine-parts/genuineParts_data.json";
import Image from "next/image";

interface Part {
  title: string;
  categoryType: string;
  description: string;
  code: string;
  img: string;
  information: string;
}

const Page2 = () => {
  const [enquiryState, setEnquiryState] = useState<Record<string, boolean>>({});
  const [inventoryItems, setInventoryItems] = useState<Part[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartsModalOpen, setIsPartsModalOpen] = useState(false);
  const [isMachineModalOpen, setIsMachineModalOpen] = useState(false);
  const [machineFilters, setMachineFilters] = useState<string[]>([]);
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState("");
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const [filteredParts, setFilteredParts] = useState(Inventory.parts);

  const openModal = () => setIsPartsModalOpen(true);
  const closeModal = () => setIsPartsModalOpen(false);
  const openMachineModal = () => setIsMachineModalOpen(true);
  const closeMachineModal = () => setIsMachineModalOpen(false);

  useEffect(() => {
    filterParts();
  }, [machineFilters, headerSearchTerm]);

  const filterParts = () => {
    let filtered = Inventory.parts;
    if (machineFilters.length > 0) {
      filtered = filtered.filter((part) =>
        machineFilters.some(
          (filter) =>
            part.categoryType.toLowerCase().includes(filter.toLowerCase()) ||
            part.description.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    if (headerSearchTerm) {
      filtered = filtered.filter(
        (part) =>
          part.title.toLowerCase().includes(headerSearchTerm.toLowerCase()) ||
          part.description
            .toLowerCase()
            .includes(headerSearchTerm.toLowerCase()) ||
          part.code.toLowerCase().includes(headerSearchTerm.toLowerCase())
      );
    }

    setFilteredParts(filtered);
  };

  const handleMachineFilterChange = (filter: string) => {
    setMachineFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };
  const handleMachineFilterChangeFilter = (filter: string) => {
    setMachineFilters([filter]);
  };

  const handleSidebarSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarSearchTerm(e.target.value);
  };

  const handleHeaderSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderSearchTerm(e.target.value);
  };

  const handleButtonClick = (part: Part) => {
    setEnquiryState((prevState) => ({
      ...prevState,
      [part.code]: true,
    }));
    setInventoryItems((prevItems) => [...prevItems, part]);
  };

  const handleRemoveFromInventory = (part: Part) => {
    setInventoryItems((prevItems) =>
      prevItems.filter((item) => item.code !== part.code)
    );
    setEnquiryState((prevState) => ({
      ...prevState,
      [part.code]: false,
    }));
  };

  const handleProceedClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getInventoryCount = () => {
    return inventoryItems.length;
  };

  return (
    <div className="px-3 font-poppins font-regular flex">
      {/* Left container*/}
      <div className="w-[18%] bg-white p-2 rounded-lg mr-2 lg:block hidden">
        <h2 className="py-2 mb-2 font-medium border-b ">{Inventory.filter}</h2>
        <div className="flex items-center border border-black rounded-lg mb-4 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 ml-1"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            placeholder={Inventory.searchFilter}
            className="w-full px-2 outline-none bg-transparent text-black font-poppins text-xs"
            value={sidebarSearchTerm}
            onChange={handleSidebarSearch}
          />
        </div>
        {Inventory.machineFilter
          .filter((item) =>
            item.title.toLowerCase().includes(sidebarSearchTerm.toLowerCase())
          )
          .map((item, idx) => (
            <div key={idx} className="mb-4 flex items-center relative">
              <label htmlFor={`item-${idx}`} className="text-sm lg:w-[90%]">
                {item.title}
              </label>
              <input
                type="checkbox"
                id={`item-${idx}`}
                className="absolute right-0"
                checked={machineFilters.includes(item.title)}
                onChange={() => handleMachineFilterChange(item.title)}
              />
            </div>
          ))}
      </div>

      {/* Right container*/}
      <div className="lg:w-[82%] w-full">
        <div className="bg-white w-full rounded-lg p-2 flex items-center mb-2 space-x-2 lg:hidden">
          <button
            aria-label="Filter"
            onClick={openMachineModal}
            className="w-[50%] bg-black flex items-center rounded-md py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 ml-2 stroke-white"
            >
              <line x1="4" y1="6" x2="16" y2="6" />
              <line x1="8" y1="11" x2="20" y2="11" />
              <line x1="4" y1="16" x2="16" y2="16" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="11" r="2" />
              <circle cx="18" cy="16" r="2" />
            </svg>
            <p className="text-white w-full text-center">
              {Inventory.machinesFilter}
            </p>
          </button>
          <button
            aria-label="Filter"
            onClick={openModal}
            className="w-[50%] bg-black flex items-center rounded-md py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 ml-2 stroke-white"
            >
              <line x1="4" y1="6" x2="16" y2="6" />
              <line x1="8" y1="11" x2="20" y2="11" />
              <line x1="4" y1="16" x2="16" y2="16" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="11" r="2" />
              <circle cx="18" cy="16" r="2" />
            </svg>
            <p className="text-white w-full text-center">
              {Inventory.partsFilter}
            </p>
          </button>
        </div>
        {/* Filter section*/}
        <div className="bg-white w-full rounded-lg p-2 lg:flex items-center mb-2 hidden">
          <div className="flex items-center border border-black rounded-lg py-1 px-2 lg:visible invisible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="10" cy="10" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="search"
              placeholder={Inventory.searchParts}
              className="px-2 outline-none bg-transparent text-black font-poppins text-xs"
              value={headerSearchTerm}
              onChange={handleHeaderSearch}
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 ml-2 lg:visible invisible"
          >
            <line x1="4" y1="6" x2="16" y2="6" />
            <line x1="8" y1="11" x2="20" y2="11" />
            <line x1="4" y1="16" x2="16" y2="16" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="6" cy="11" r="2" />
            <circle cx="18" cy="16" r="2" />
          </svg>

          <div className="flex space-x-2 overflow-x-scroll scrollbar-hide px-1 lg:visible invisible">
            {Inventory.Filter.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleMachineFilterChangeFilter(item.title)}
                className="border border-black rounded-lg group hover:bg-black hover:text-white cursor-pointer flex items-center justify-center space-x-2 py-1 px-3"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-5 group-hover:invert"
                />
                <h3 className="text-sm">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:flex lg:static sticky top-14 z-50">
          {/* Inventory items */}
          <div className="bg-white lg:w-[85%] lg:h-full h-[11.4rem] rounded-lg px-4 py-2 lg:mr-2 lg:block hidden">
            <h2 className="text-sm font-medium float-left">
              {Inventory.inventory}
            </h2>
            {/* cart icon */}
            <div className="float-right flex">
              <div className="w-12 h-6 bg-black flex rounded-full">
                <div className="bg-white text-red-700 text-xs rounded-full h-4 w-4 m-1 flex items-center justify-center font-medium">
                  {getInventoryCount()}
                </div>
              </div>
              <div className="border-solid border-2 border-black bg-[#f5f5f5] p-1 flex items-center jystify-center rounded-full z-10 -ml-6 -mt-[0.095rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  onClick={handleProceedClick}
                >
                  <circle cx="9" cy="19" r="2" />
                  <circle cx="17" cy="19" r="2" />
                  <path d="M5 6h16l-1.68 7.39a2 2 0 0 1-1.96 1.61H8.34a2 2 0 0 1-1.96-1.61L5 6z" />
                  <path d="M5 6H2" />
                </svg>
              </div>
            </div>
            <div className="w-full overflow-x-scroll flex space-x-4 scrollbar-custom scrollbar py-1 min-h-[4.7rem]">
              {inventoryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f5f5f5] rounded-lg p-2 flex space-x-8 relative"
                >
                  <div>
                    <h3 className="text-xs font-medium whitespace-nowrap">
                      {item.title}
                    </h3>
                    <h3 className="text-xs font-medium whitespace-nowrap">
                      {item.description}
                    </h3>
                    <h3 className="text-xs whitespace-nowrap">{item.code}</h3>
                  </div>
                  <div className="w-16 h-12">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="w-full h-full rounded-lg"
                    />
                  </div>

                  <div
                    className="w-4 h-4 rounded-full bg-black absolute -right-2 -top-1 text-xl z-20 cursor-pointer flex items-center justify-center"
                    onClick={() => handleRemoveFromInventory(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 stroke-white"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1 bg-[#f5f5f5]  px-2 py-1 rounded-md lg:float-left flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-info w-4 h-4 mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="8"></line>
              </svg>
              <p className="text-xs text-black">{Inventory.iButton}</p>
            </div>
            {/* Proceed Button */}
            <div className="flex lg:justify-end">
              <button
                aria-label="Proceed"
                className="group text-xs mt-1 bg-black font-medium text-white lg:px-2 lg:py-1 py-2 px-3 rounded-md hover:bg-red-700 flex items-center justify-center lg:w-max w-full"
                onClick={handleProceedClick}
              >
                <p className="mr-2">{Inventory.proceed}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="w-4 h-4"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="32"
                    className="fill-white cursor-pointer"
                  />
                  <path
                    d="M25 20 L37 32 L25 44"
                    className="stroke-black group-hover:stroke-red-700 stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white lg:w-[15%] z-30 rounded-lg px-2 lg:py-4 py-2 lg:items-center lg:relative lg:mt-0 mt-2">
            <div className="flex lg:space-x-0 space-x-2 items-end">
              <div className="w-[50%] lg:hidden">
                <div className="flex">
                  <div className="w-12 h-6 bg-black flex rounded-full">
                    <div className="bg-white text-red-700 text-xs rounded-full h-4 w-4 m-1 flex items-center justify-center font-medium">
                      {getInventoryCount()}
                    </div>
                  </div>
                  <div className="border-solid border-2 border-black bg-[#f5f5f5] p-1 flex items-center jystify-center rounded-full z-10 -ml-6 -mt-[0.050rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                      onClick={handleProceedClick}
                    >
                      <circle cx="9" cy="19" r="2" />
                      <circle cx="17" cy="19" r="2" />
                      <path d="M5 6h16l-1.68 7.39a2 2 0 0 1-1.96 1.61H8.34a2 2 0 0 1-1.96-1.61L5 6z" />
                      <path d="M5 6H2" />
                    </svg>
                  </div>
                </div>
                <button
                  aria-label="Proceed"
                  className="group lg:text-xs text-sm mt-1 bg-black font-medium text-white lg:px-2 lg:py-1 py-2 px-1 lg:rounded-md rounded-lg hover:bg-red-700 flex items-center justify-center lg:w-max w-full"
                  onClick={handleProceedClick}
                >
                  <p className="mr-2">{Inventory.proceed}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="w-4 h-4"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="32"
                      className="fill-white cursor-pointer"
                    />
                    <path
                      d="M25 20 L37 32 L25 44"
                      className="stroke-black group-hover:stroke-red-700 stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                    />
                  </svg>
                </button>
              </div>
              <div className="w-[50%] lg:w-full flex flex-col lg:items-center">
                <h2 className="lg:text-[1.1rem] text-sm font-medium lg:w-[80%] text-center lg:mb-2 mb-2">
                  {Inventory.productNotFound}
                </h2>
                <button
                  aria-label="Request Spare"
                  className="lg:text-md text-sm font-medium text-white bg-gradient-to-r from-[#483d73] to-red-700 rounded-lg lg:py-3 py-2 lg:px-3 whitespace-nowrap lg:absolute lg:bottom-2"
                >
                  {Inventory.requestSpare}
                </button>
              </div>
            </div>
            {/* Search Field in Mobile  */}
            <div className="w-full lg:hidden mt-2">
              <div className="flex items-center border border-black rounded-lg py-2 px-2 h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="10" cy="10" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="search"
                  placeholder={Inventory.searchParts}
                  className="w-full px-2 outline-none bg-transparent text-black font-poppins text-sm"
                  value={headerSearchTerm}
                  onChange={handleHeaderSearch}
                />
              </div>
            </div>
          </div>
        </div>

        {/* parts section*/}
        <div className="">
          <div className="w-full mt-2 lg:max-h-[154.1vh] lg:overflow-y-scroll grid lg:grid-cols-3 gap-2 scrollbar-custom scrollbar">
            {filteredParts.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-2">
                <div className="flex relative px-1">
                  <div>
                    <h3 className="text-md font-medium whitespace-nowrap">
                      {item.title}
                    </h3>
                    <h3 className="text-md font-medium whitespace-nowrap">
                      {item.description}
                    </h3>
                    <h3 className="text-sm whitespace-nowrap">{item.code}</h3>
                  </div>
                  <div className="cursor-pointer group absolute right-0 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-info w-4 h-4 hover:stroke-red-700"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12" y2="8"></line>
                    </svg>
                    <div className="hidden group-hover:flex absolute top-5 right-0 bg-white border border-gray-300 rounded-md shadow-md px-2 py-1 h-max w-[15vw] z-20">
                      <p className="lg:text-[0.8rem] text-[0.7rem] text-black">
                        {item.information}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full my-2">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-full rounded-lg"
                  />
                </div>
                {!enquiryState[item.code] ? (
                  <button
                    aria-label="Add Enquiry"
                    className="text-white bg-black lg:hover:bg-red-700 lg:hover:border-red-700 py-1 w-full rounded-lg border border-black"
                    onClick={() => handleButtonClick(item)}
                  >
                    {Inventory.addEnquiry}
                  </button>
                ) : (
                  <label
                    onClick={() => handleRemoveFromInventory(item)}
                    className="flex items-center py-1 px-2 border border-black rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked
                      className="form-checkbox text-black"
                    />
                    <span className="text-black text-center w-full font-medium">
                      {Inventory.addedEnquiry}
                    </span>
                  </label>
                )}
              </div>
            ))}
          </div>
          <div className="lg:flex items-center justify-center bg-white rounded-lg mt-2 hidden">
            <button
              aria-label="Proceed"
              className="group text-md my-2 bg-black font-medium text-white px-4 py-2 rounded-md float-right hover:bg-red-700 flex items-center justify-center"
              onClick={handleProceedClick}
            >
              <p className="mr-2">{Inventory.proceed}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-6 h-6"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-white cursor-pointer"
                />
                <path
                  d="M25 20 L37 32 L25 44"
                  className="stroke-black group-hover:stroke-red-700 stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                />
              </svg>
            </button>
          </div>
        </div>

        {/* inventory section in mobile view */}
        <div className="bg-white lg:w-[85%] h-max custom-gradient-border rounded-lg px-4 py-2 lg:mr-2 lg:hidden my-2">
          <h2 className="text-sm font-medium float-left">
            {Inventory.inventory}
          </h2>
          {/* cart icon */}
          <div className="float-right flex">
            <div className="w-12 h-6 bg-black flex rounded-full">
              <div className="bg-white text-red-700 text-xs rounded-full h-4 w-4 m-1 flex items-center justify-center font-medium">
                {getInventoryCount()}
              </div>
            </div>
            <div className="border-solid border-2 border-black bg-[#f5f5f5] p-1 flex items-center jystify-center rounded-full z-10 -ml-6 -mt-[0.050rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                onClick={handleProceedClick}
              >
                <circle cx="9" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M5 6h16l-1.68 7.39a2 2 0 0 1-1.96 1.61H8.34a2 2 0 0 1-1.96-1.61L5 6z" />
                <path d="M5 6H2" />
              </svg>
            </div>
          </div>
          <div className="w-full overflow-x-scroll flex space-x-4  scrollbar py-1 min-h-[6.8rem]">
            {inventoryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f5f5f5] rounded-lg p-2 flex space-x-10 relative"
              >
                <div>
                  <h3 className="text-xs font-medium whitespace-nowrap">
                    {item.title}
                  </h3>
                  <h3 className="text-xs font-medium whitespace-nowrap">
                    {item.description}
                  </h3>
                  <h3 className="text-xs whitespace-nowrap">{item.code}</h3>
                </div>
                <div className="w-24 h-20">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div
                  className="w-4 h-4 rounded-full bg-black absolute -right-2 -top-1 text-xl z-20 cursor-pointer flex items-center justify-center"
                  onClick={() => handleRemoveFromInventory(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 stroke-white"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1 bg-[#f5f5f5]  px-2 py-1 rounded-md lg:float-left flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-info w-4 h-4 mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
            <p className="text-xs text-black">{Inventory.iButton}</p>
          </div>
        </div>
      </div>

      {/* Modal for Proceed */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center z-50  lg:px-0 px-4 lg:mt-14">
          <div className="bg-white rounded-lg p-4 lg:w-[60%]">
            <div className="flex relative">
              <h2 className="text-lg font-semibold mb-4 w-full text-center">
                {Inventory.inventoryItems}
              </h2>
              <button
                aria-label="Close"
                className="absolute right-0"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-6 h-6 stroke-black "
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex lg:flex-row flex-col lg:space-x-6">
              <div className="lg:w-[60%] lg:mb-0 mb-2">
                <div className="grid lg:grid-cols-2 gap-2 lg:max-h-[17rem] max-h-[10.4rem] overflow-y-auto scrollbar-custom scrollbar">
                  {inventoryItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f5f5f5] rounded-lg p-2 flex lg:flex-col"
                    >
                      <div className="flex px-1 relative">
                        <div>
                          <h3 className="text-xs font-medium whitespace-nowrap">
                            {item.title}
                          </h3>
                          <h3 className="text-xs font-medium whitespace-nowrap">
                            {item.description}
                          </h3>
                          <h3 className="text-xs whitespace-nowrap">
                            {item.code}
                          </h3>
                        </div>
                        {/* <BsFillLightningChargeFill className="absolute right-0 lg:block hidden" /> */}
                      </div>
                      <div className="w-full lg:my-2 lg:ml-0 ml-6">
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={400}
                          height={400}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-[40%]">
                <form>
                  {/* Form Fields */}
                  <div className="mb-4">
                    <label className="block text-sm mb-2 font-normal">
                      {Inventory.username}
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-[#f5f5f5] rounded-md w-full p-2 outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2 font-normal">
                      {Inventory.email}
                    </label>
                    <input
                      type="email"
                      required
                      className="bg-[#f5f5f5] rounded-md w-full p-2 outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 font-normal"
                    >
                      {Inventory.password}
                    </label>
                    <input
                      type="password"
                      required
                      className="bg-[#f5f5f5] rounded-md w-full p-2 outline-none"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-center lg:mt-4 mt-2">
              <button
                aria-label="Submit"
                className="text-sm bg-black text-white px-4 py-2 rounded-md font-normal"
              >
                {Inventory.submit}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parts Filter Modal */}
      {isPartsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white mx-4 p-4 rounded-lg w-full lg:w-[60%] max-h-[80%]">
            {/* Close button */}
            <button
              aria-label="Close"
              onClick={closeModal}
              className="flex justify-end w-full mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-6 h-6 stroke-black "
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-6 h-6 mr-2"
              >
                <line x1="4" y1="6" x2="16" y2="6" />
                <line x1="8" y1="11" x2="20" y2="11" />
                <line x1="4" y1="16" x2="16" y2="16" />
                <circle cx="18" cy="6" r="2" />
                <circle cx="6" cy="11" r="2" />
                <circle cx="18" cy="16" r="2" />
              </svg>
              <h2 className="font-semibold">{Inventory.partsFilter}</h2>
            </div>
            {/* Filter items */}
            <div className="space-y-2 overflow-y-scroll scrollbar-hide px-1">
              {Inventory.Filter.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-black rounded-lg hover:bg-black hover:text-white cursor-pointer flex items-center  space-x-2 py-1 px-3"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-5 ml-1"
                  />
                  <h3 className="text-sm w-full text-center">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Machine Filter Modal */}
      {isMachineModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white mx-4 p-4 rounded-lg w-full lg:w-[60%] max-h-[80%]">
            {/* Close button */}
            <button
              aria-label="Close"
              onClick={closeMachineModal}
              className="flex justify-end w-full mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-6 h-6 stroke-black "
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-6 h-6 mr-2"
              >
                <line x1="4" y1="6" x2="16" y2="6" />
                <line x1="8" y1="11" x2="20" y2="11" />
                <line x1="4" y1="16" x2="16" y2="16" />
                <circle cx="18" cy="6" r="2" />
                <circle cx="6" cy="11" r="2" />
                <circle cx="18" cy="16" r="2" />
              </svg>
              <h2 className="font-semibold">{Inventory.machinesFilter}</h2>
            </div>
            {Inventory.machineFilter.map((item, idx) => (
              <div key={idx} className="mb-4 flex items-center relative">
                <label htmlFor={`item-${idx}`} className="text-sm">
                  {item.title}
                </label>
                <input
                  type="checkbox"
                  id={`item-${idx}`}
                  className="absolute right-0"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page2;
