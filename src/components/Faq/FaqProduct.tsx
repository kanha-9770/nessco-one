"use client";
import React, { useState, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FaqProductsData = {
  title: "Frequently Asked Questions",
  subTitle: "FAQs",
  questions: [
    {
      que: "What is the best way to use paper cups?",
      ans: "The best way to use paper cups is to ensure they are used for their intended purpose, such as for serving beverages. Avoid using them for food items that require prolonged heat or moisture, as paper cups are primarily designed for single-use beverage applications.",
    },
    {
      que: "Are paper cups eco-friendly?",
      ans: "Paper cups are generally considered more eco-friendly than plastic cups due to their biodegradability and recyclable nature. However, their environmental impact can vary depending on the type of paper used and whether they are coated with plastic.",
    },
    {
      que: "Can paper cups be recycled?",
      ans: "Yes, paper cups can be recycled, but they often require specialized recycling facilities due to the plastic lining used to make them waterproof. It's important to check local recycling guidelines to ensure proper disposal.",
    },
    {
      que: "Can I use paper cups for hot beverages?",
      ans: "Yes, paper cups are often designed to handle hot beverages. However, make sure to use double-walled or insulated paper cups to avoid discomfort from the heat when holding them.",
    },
    {
      que: "How long can I use a paper cup for a cold drink?",
      ans: "Paper cups are designed for single use and can hold cold beverages for a reasonable period of time. However, over prolonged periods, moisture may cause the paper to weaken, so it's best to use them within a short time frame.",
    },
    {
      que: "Are there paper cups that are fully biodegradable?",
      ans: "Yes, there are paper cups made from fully biodegradable materials, including plant-based linings. These cups break down more easily in composting environments compared to traditional paper cups with plastic linings.",
    },
    {
      que: "Can I microwave paper cups?",
      ans: "It is generally not recommended to microwave paper cups, especially those with plastic linings. Microwaving can weaken the structure of the cup and potentially cause the lining to melt.",
    },
    {
      que: "What is the environmental impact of paper cups?",
      ans: "While paper cups are often touted as eco-friendly, their production involves the use of trees, water, and energy. Additionally, most paper cups are lined with plastic, making them more difficult to recycle. However, compostable and biodegradable alternatives are reducing this impact.",
    },
    {
      que: "Are paper cups safe for children?",
      ans: "Yes, paper cups are generally safe for children to use for cold beverages. For hot drinks, ensure they use double-walled or insulated cups to avoid burns.",
    },
    {
      que: "Why do some paper cups have a wax or plastic lining?",
      ans: "The wax or plastic lining is used to make paper cups waterproof, preventing the liquid from soaking into the paper. This lining allows the cup to hold both hot and cold beverages without leakage.",
    },
  ],
};

const FaqProducts: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpansion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full h-[82vh] bg-white rounded-2xl  font-poppins">
      <div className="flex p-6">
        <h1 className="font-poppins font-semibold text-3xl">
          <span className="text-[#9e9c9c]">
            {FaqProductsData.title.split(" ").slice(0, -1).join(" ")}
          </span>{" "}
          <span className="text-red-700">
            {FaqProductsData.title.split(" ").slice(-1)}
          </span>
        </h1>
      </div>
      <div
        className="w-full flex justify-center items-center px-[3vw]"
        ref={carouselRef}
      >
        <div className="lg:w-full bg-white ">
          <div>
            <h2 className="font-semibold lg:text-[1.5rem] mt-6  text-[1.2rem]">
              {FaqProductsData.subTitle}
            </h2>
            <div className="lg:border-t-[2px] border-t-2 border-solid border-red-700 lg:w-[6vw] w-[18vw] mt-[0.6rem]"></div>
          </div>
          <div className="h-[55vh] w-full overflow-hidden">
            <div className="h-full overflow-auto scrollbar-hide">
              {FaqProductsData.questions.map((item, idx) => (
                <div key={idx} className="w-full lg:pt-[3vh] pt-[1vh]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpansion(idx)}
                  >
                    <h2 className="lg:text-[1.1rem] w-[70%] text-[0.9rem] font-medium font-poppins">
                      {item.que}
                    </h2>
                    {expandedIndex === idx ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30" /* Size similar to BsDashLg */
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black font-bold"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="2" /* Thickness for bold effect */
                          fill="black" /* Set color to bold black */
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30" /* Size similar to BsPlusLg */
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black"
                      >
                        <line
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19"
                          stroke="black" /* Color set to black */
                          strokeWidth="2" /* Line thickness for bold effect */
                          strokeLinecap="round"
                        />
                        <line
                          x1="5"
                          y1="12"
                          x2="19"
                          y2="12"
                          stroke="black" /* Color set to black */
                          strokeWidth="2" /* Line thickness for bold effect */
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="lg:border-t-[1px] border-[#d3d2d2] border-t-[1px] border-solid mt-[0.5vh] lg:w-[70%] w-[80%]"></div>

                  {expandedIndex === idx && (
                    <div className="ml-[2vw] text-[#9e9c9c] py-[1vh] lg:text-[1rem] text-[0.8rem] w-[90%]">
                      <p>{item.ans}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqProducts;
