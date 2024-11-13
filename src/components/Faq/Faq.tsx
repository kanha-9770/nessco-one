"use client";

import React, { useState } from "react";
import SearchBox from "./SearchBox";
import ContentCard from "./ContentCard";
import { searchbox } from "../Constants/faq/faq.json";

const FAQ: React.FC = () => {
  const [filteredQuestions, setFilteredQuestions] = useState(searchbox.categories);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategorySelect = (selectedCategories: string[]) => {
    if (selectedCategories.length === 0 && searchTerm === "") {
      setFilteredQuestions(searchbox.categories);
    } else {
      const filtered = searchbox.categories
        .filter((category) =>
          selectedCategories.length === 0 || selectedCategories.includes(category.name)
        )
        .map((category) => {
          return {
            ...category,
            faqs: category.faqs.filter((faq) =>
              faq.que.toLowerCase().includes(searchTerm.toLowerCase())
            )
          };
        });
      setFilteredQuestions(filtered);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    handleCategorySelect([]);
  };

  return (
    <div className=" h-[45rem] w-full overflow-hidden">
        <h1 className="text-5xl font-poppins bg-gradient-to-r from-[#483d73] from-2% via-red-700 via-20% to-red-700 bg-clip-text text-transparent relative mt-20 left-7 font-extrabold ">{searchbox.title}</h1>
        <div className="lg:flex lg:flex-row flex flex-col   lg:top-10 relative lg:-space-x-4 ">
      <div className="sticky lg:top-[10rem] lg:w-1/5  lg:px-4 p-1 lg:overflow-auto h-[37rem] no-scrollbar ">
        <SearchBox onCategorySelect={handleCategorySelect} onSearch={handleSearch} filter={""} byCategory={""} placeholder={""} />
      </div>
      <div className="lg:w-[80%] w-full lg:h-[30.5rem] h-[calc(100vh-150px)] md:h-[50rem] md:-top-52 overflow-auto relative lg:top-4 no-scrollbar -top-[18rem] ">
        <ContentCard categories={filteredQuestions} />
      </div>
      </div>
    </div>
  
  );
};

export default FAQ;
