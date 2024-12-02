"use client";

import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import ContentCard from "./ContentCard";
import { FaqItem } from "./types/constant";

interface MainLayoutProps {
  faqData: FaqItem;
}

const FAQ: React.FC<MainLayoutProps> = ({ faqData }) => {
  const faqsearchdata = faqData?.faq[0]?.searchbox;

  const [filteredQuestions, setFilteredQuestions] = useState(
    faqsearchdata?.categories
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    console.log("FAQ data:", faqsearchdata);
  }, [faqsearchdata]);

  const handleFilter = () => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = faqsearchdata.categories
      .filter(
        (category) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(category.name)
      )
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            category.name.toLowerCase().includes(lowercaseSearchTerm) ||
            faq.que.toLowerCase().includes(lowercaseSearchTerm)
        ),
      }))
      .filter((category) => category.faqs.length > 0);

    setFilteredQuestions(filtered);
  };

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    handleFilter();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    handleFilter();
  };

  return (
    <div className="h-[45rem] z-40 w-full overflow-hidden">
      <h1 className="text-5xl font-poppins bg-gradient-to-r from-[#483d73] via-red-700 to-red-700 bg-clip-text text-transparent relative mt-20 left-7 font-extrabold">
        FAQs
      </h1>
      <div className="lg:flex lg:flex-row flex flex-col lg:top-10 relative lg:-space-x-4">
        <div className="sticky lg:top-[10rem] lg:w-1/5 lg:px-4 p-1 lg:overflow-auto h-[37rem] no-scrollbar">
          <SearchBox
            onCategorySelect={handleCategorySelect}
            onSearch={handleSearch}
            filter={faqsearchdata?.filter}
            byCategory={faqsearchdata?.byCategory}
            placeholder={faqsearchdata?.placeholder}
            categories={faqsearchdata?.categories}
          />
        </div>
        <div className="lg:w-[80%] w-full lg:h-[30.5rem] h-[calc(100vh-150px)] md:h-[50rem] overflow-auto relative lg:top-4 no-scrollbar -top-[18rem]">
          <ContentCard categories={filteredQuestions} />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
