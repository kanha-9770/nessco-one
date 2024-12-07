"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FormFields, { FormValues } from "../Contact/FormFileds";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  que: string;
  ans: string;
}

interface Page5Props {
  filteredFaqs: FaqItem[];
  categoryName: string;
  faqTitle: string;
  faqSubTitle: string;
  formTitle: string;
  formPara: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  twitterPassword: string;
  sendMessage: string;
  tyler: string;
  durden: string;
  emailPlaceholder: string;
}

const Page5: React.FC<Page5Props> = ({
  filteredFaqs,
  categoryName,
  faqTitle,
  faqSubTitle,
  formTitle,
  formPara,
  password,
  twitterPassword,
  sendMessage,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });

  const toggleExpansion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (borderRef.current) {
      gsap.fromTo(
        borderRef.current,
        { width: "10%" },
        {
          width: "95%",
          ease: "none",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "-60% 80%",
            end: "60% 85%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <>
      <div className="w-full h-max lg:mt-[2rem] mt-[5rem] mb-[3rem] font-poppins">
        <div
          ref={borderRef}
          className="border-t-[0.1rem] border-solid border-[#6f6f6f] w-[10%] lg:mx-[2rem] mx-[1rem]"
        ></div>
        <div className="flex lg:pt-[3rem] pt-[1.5rem] lg:pb-[2rem] pb-[1.6rem] lg:px-[2rem] px-[1rem]">
          <h1 className="font-poppins font-semibold lg:text-[2.2rem] text-[1.4rem]">
            <span className="text-red-700">
              {faqTitle.trim().match(/\S+$/)}
            </span>
          </h1>
        </div>
        <div
          className="w-full flex justify-center items-center lg:px-[3rem] px-[1.5rem]"
          ref={carouselRef}
        >
          <div className="lg:w-[72%] w-full bg-white lg:mx-[1.5rem] lg:py-[2.5rem] py-[1rem] lg:px-[2rem] px-[1rem] rounded-[0.5rem]">
            <div>
              <h2 className="font-semibold lg:text-[1.5rem] text-[1.2rem]">
                <span className="text-[#483d73]">{faqSubTitle}</span>
                <span className="text-red-700 ml-2">{categoryName}</span>
              </h2>
              <div className="border-t-2 border-solid border-red-700 lg:w-[5.5rem] w-[4rem] mt-[0.6rem]"></div>
            </div>
            <div className="h-[15.5rem] w-full mt-[1rem] overflow-hidden">
              <div className="h-full overflow-auto scrollbar-hide">
                {filteredFaqs.map((item, idx) => (
                  <div key={idx} className="w-full lg:pt-[1rem] pt-[0.5rem]">
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
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-6 h-6 stroke-red-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                    </div>
                    <div className=" border-[#d3d2d2] border-t-2 border-solid  mt-[0.2rem] lg:w-[70%] w-[80%]"></div>

                    {expandedIndex === idx && (
                      <div className="ml-[1.5rem] text-[#9e9c9c] py-[0.5rem] lg:text-[1rem] text-[0.8rem] w-[90%]">
                        <p>{item.ans}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[28%] lg:block hidden  mx-[1.5rem] bg-white rounded-[0.5rem] px-[0.5rem] py-[0.5rem]">
            <div className="px-[1rem] py-[0.5rem]">
              <div className="font-poppins mb-[0.7rem]">
                <div className="flex">
                  <h3 className="text-[1.1rem] font-semibold">{formTitle}</h3>
                </div>
                <p className="text-[#727272] text-[0.9rem]">{formPara}</p>
              </div>
              <form className="font-poppins">
                <FormFields
                  onChange={setFormValues}
                  values={formValues}
                  inline={false}
                />

                <button
                  className="border-2 py-[0.5rem] px-[0.5rem] text-[0.8rem] rounded-[0.5rem] bg-[#483d73] text-white w-full mt-[1.8vh]"
                  aria-label="Send Message"
                >
                  {sendMessage}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page5;
