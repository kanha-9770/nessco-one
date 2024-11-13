"use client";
import React, { useState } from "react";
import Page1 from "@/components/blogs/Filter";
import Page2 from "@/components/blogs/AllBlogs";
import Page3 from "@/components/blogs/FeaturedBlogs";
import Page4 from "@/components/blogs/ForYou";
import Page5 from "@/components/blogs/Sources";

const Pages = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    // You can add any additional logic here if needed
    console.log("Selected Categories:", categories);
  };

  return (
    <>
      <main>
        <div className="flex lg:flex-row flex-col lg:mt-0 mt-14">
          <div className="w-full sticky top-0 lg:h-[40rem] hidden lg:block">
            <Page1 onCategorySelect={handleCategorySelect} />
          </div>
          <div className="flex flex-col">
            <div className="flex lg:flex-row flex-col">
              <div id="Featured Blogs" className="lg:w-[67%]">
                <Page2 selectedCategories={selectedCategories} />
              </div>
              <div id="Featured Blogs" className="lg:w-[33%]">
                <Page3 />
              </div>
            </div>
            <div>
              <Page4 />
            </div>
            <div>
              <Page5 />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Pages;
