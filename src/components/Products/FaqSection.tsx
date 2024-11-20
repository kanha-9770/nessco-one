import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";
import { FAQType } from "./types/constant";


interface FaqSectionProps{
  faqData:FAQType
}
const FaqSection: React.FC<FaqSectionProps> = ({faqData}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const faqListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (faqListRef.current) {
      gsap.to(faqListRef.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: faqListRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }
  }, []);

  const handleFaqClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex overflow-hidden h-max flex-col w-full lg:flex-row lg:space-x-8 p-6  mx-auto bg-white rounded-xl">
      {/* Questions Section */}
      <div className="w-full bg-white mx-[1rem] border-4 border-solid border-[#e8e5e5] h-full rounded-[2rem] flex items-center justify-center py-[0.5rem]">
        <div className="w-[50%] h-[27rem] mr-[0.5rem] overflow-hidden rounded-[1.5rem]">
          <div className="overflow-auto h-full scrollbar-hide" ref={faqListRef}>
            {faqData?.questions?.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleFaqClick(idx)}
                className={`h-max py-[1rem] border-b-2 border-solid border-[#e8e5e5] flex items-center cursor-pointer ${
                  activeIndex === idx
                    ? "text-red-700 font-semibold"
                    : "text-[#575555]"
                }`}
              >
                <p className="text-[1.2rem] font-poppins w-[75%] mx-[1.5rem]">
                  {item.que}
                </p>
                <p className="text-[2rem] font-poppins ml-[3rem] mr-[1rem]">
                  {activeIndex === idx ? "−" : "+"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Answers Section */}
        <div className="w-[50%] h-[27rem] mx-[0.5rem] rounded-[1.5rem] border-2 border-solid border-[#e8e5e5] overflow-hidden">
          <div className="overflow-auto h-full scrollbar-hide">
            {faqData?.questions.map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-center transition-all duration-300 ${
                  activeIndex === idx ? "block" : "hidden"
                }`}
              >
                <p className="my-[2.5rem] w-[16vw] text-[1.2rem] text-center text-[#575555]">
                  {item.ans}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
