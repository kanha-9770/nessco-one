"use client";
import React, { useState } from "react";
import { VideosItem } from "./types/constant";

interface VideosProps {
  videosData: VideosItem;
}

const Header: React.FC<VideosProps> = ({ videosData }) => {
  const Header = videosData?.Videos[0]?.Header;
  const [showApplications, setShowApplications] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Categories",
  ]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([
    "All Categories",
  ]);
  const [searchTerm] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [applicationSearch, setApplicationSearch] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
  };

  const filterItems = (items: any[], search: string) => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const displayApplications = filterItems(
    showApplications
      ? Header.applications
      : Header.applications.slice(0, 3),
    applicationSearch
  );

  const displayCategories = filterItems(
    showCategories
      ? Header.categories
      : Header.categories.slice(0, 3),
    categorySearch
  );

  const filteredVideos = Header.VideosRef.filter((video) => {
    const categoryMatch =
      selectedCategories.includes("All Categories") ||
      selectedCategories.includes(video.tag);
    const applicationMatch =
      selectedApplications.includes("All Categories") ||
      selectedApplications.includes(video.tag);
    const searchMatch = video.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatch && applicationMatch && searchMatch;
  });

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    allOption: string
  ) => {
    const { name, checked } = event.target;
    setSelected((prev) => {
      if (name === allOption) {
        return checked ? [allOption] : [];
      } else {
        const withoutAll = prev.filter((item) => item !== allOption);
        if (checked) {
          return [...withoutAll, name];
        } else {
          const newSelection = withoutAll.filter((item) => item !== name);
          return newSelection.length === 0 ? [allOption] : newSelection;
        }
      }
    });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectionChange(event, setSelectedCategories, "All Categories");
  };

  const handleApplicationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleSelectionChange(event, setSelectedApplications, "All Categories");
  };

  return (
    <div className="mt-[5.2rem] my-10 lg:mx-10 mx-5 font-poppins">
      <div className="lg:flex lg:space-x-10">
        {/* Filter Section */}
        <div className="w-[18%] lg:block hidden h-[82vh] pr-5 border-r-2 border-[#E6E7E6] overflow-auto sticky top-[5.2rem] scrollbar-hide">
          <p className="mb-2">{Header.filter}</p>
          <p className="font-medium mb-2">
            {Header.byCategory}
          </p>

          {/* Category Search Field */}
          <div className="flex rounded-[1rem] bg-white overflow-hidden">
            <input
              type="search"
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black"
            />
            <button className="mr-[0.8rem] text-[#9CA3AF]">
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
            </button>
          </div>

          {/* By Category */}
          <div className="mt-5">
            {displayCategories.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <label
                  className="font-montserrat my-[0.2rem]"
                  htmlFor={item.title}
                >
                  {item.title}
                </label>
                <input
                  type="checkbox"
                  id={item.title}
                  name={item.title}
                  checked={selectedCategories.includes(item.title)}
                  onChange={handleCategoryChange}
                  className="ml-2"
                />
              </div>
            ))}
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="text-red-600 font-montserrat mt-1"
            >
              {showCategories ? "Less" : "Expand"}
            </button>
          </div>

          <p className="font-medium mb-2 mt-9">
            {Header.byApplications}
          </p>

          {/* Application Search Field */}
          <div className="flex rounded-[1rem] bg-white overflow-hidden">
            <input
              type="search"
              placeholder="Search applications..."
              value={applicationSearch}
              onChange={(e) => setApplicationSearch(e.target.value)}
              className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black"
            />
            <button className="mr-[0.8rem] text-[#9CA3AF]">
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
            </button>
          </div>

          {/* By Application */}
          <div className="mt-5">
            {displayApplications.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <label
                  className="font-montserrat my-[0.2rem]"
                  htmlFor={item.title}
                >
                  {item.title}
                </label>
                <input
                  type="checkbox"
                  id={item.title}
                  name={item.title}
                  checked={selectedApplications.includes(item.title)}
                  onChange={handleApplicationChange}
                  className="ml-2"
                />
              </div>
            ))}
            <button
              onClick={() => setShowApplications(!showApplications)}
              className="text-red-600 font-montserrat mt-1"
            >
              {showApplications ? "Less" : "Expand"}
            </button>
          </div>
        </div>

        {/* Filter in mobile */}
        <div className="w-full bg-white h-[3rem] rounded-t-2xl relative flex items-center justify-center lg:hidden border-solid border-b-2 border-[#E6E7E6] text-[#483d73] cursor-pointer">
          <p className="font-poppins text-[1.3rem] absolute left-4">
            {Header.filter}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 stroke-black absolute right-4"
            onClick={handleOpenFilter}
          >
            <line x1="4" y1="6" x2="16" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="16" y2="18" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
        </div>

        {/* Videos Section */}
        <div className="lg:w-[82%] w-full bg-white rounded-b-2xl lg:rounded-t-2xl py-5 px-10">
          <h1 className="text-[#483d73] text-2xl font-poppins font-medium">
            {Header.title}
          </h1>
          {/* <div className="my-4">
            <input
              type="search"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 my-4 gap-8">
            {filteredVideos.map((item, idx) => (
              <div key={idx} className="w-full h-full">
                <iframe
                  className="w-full h-full rounded-lg shadow-lg"
                  src={item.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Modal in Mobile */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-[#f5f5f5] bg-opacity-50 backdrop-blur z-50 flex items-center justify-center lg:mt-14">
          <div className="bg-white lg:w-[30%] w-full h-[28rem] mx-[1rem] p-[1rem] rounded-lg shadow-lg">
            <div className="w-full h-[3rem] flex items-center border-b-2 border-solid border-[#E6E7E6]">
              <div className="flex justify-center items-center h-full w-[50%] border-r-2 border-solid border-[#E6E7E6] mb-[0.5rem] font-poppins font-medium">
                <button onClick={handleCloseFilter} className="text-[#838282]">
                  {Header.cancel}
                </button>
              </div>
              <div className="flex justify-center items-center w-[50%] mb-[0.5rem] font-poppins font-medium">
                <button onClick={handleCloseFilter} className="text-red-700">
                  {Header.apply}
                </button>
              </div>
            </div>

            <div className="h-[22rem] mt-4 p-[1rem] bg-[#f5f5f5] rounded-lg overflow-y-auto">
              <p className="font-medium mb-2">
                {Header.byCategory}
              </p>
              <input
                type="search"
                placeholder="Search categories..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              {filterItems(
                Header.categories,
                categorySearch
              ).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <label
                    className="font-poppins my-[0.2rem]"
                    htmlFor={`mobile-category-${item.title}`}
                  >
                    {item.title}
                  </label>
                  <input
                    type="checkbox"
                    id={`mobile-category-${item.title}`}
                    name={item.title}
                    checked={selectedCategories.includes(item.title)}
                    onChange={handleCategoryChange}
                  />
                </div>
              ))}

              <p className="font-medium mb-2 mt-4">
                {Header.byApplications}
              </p>
              <input
                type="search"
                placeholder="Search applications..."
                value={applicationSearch}
                onChange={(e) => setApplicationSearch(e.target.value)}
                className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              {filterItems(
                Header.applications,
                applicationSearch
              ).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <label
                    className="font-poppins my-[0.2rem]"
                    htmlFor={`mobile-application-${item.title}`}
                  >
                    {item.title}
                  </label>
                  <input
                    type="checkbox"
                    id={`mobile-application-${item.title}`}
                    name={item.title}
                    checked={selectedApplications.includes(item.title)}
                    onChange={handleApplicationChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
