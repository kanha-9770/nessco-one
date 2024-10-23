import React from "react";
import { SwipeCarousel } from "./Common/slider";
import AnimatedText from "../ui/AnimatedText";
import { TestiNomialAnimation } from "../ui/testinomialAnimation";
import { HomeData } from "./types/constant";
interface TestinomialLayoutProps{
  heroData:HomeData;
}
const HomeTestimonial: React.FC<TestinomialLayoutProps> = ({heroData}) => {
  const testinomialData =heroData?.home[8]?.data;

  // Provide a fallback value for `testinomialData?.testinomial`
  const testimonialItems = testinomialData?.testinomial || [];
  return (
    <div className="flex flex-col lg:flex-row py-4 h-screen z-20 max-w-7xl mx-auto relative overflow-hidden">
      <div className="px-2 w-full h-[45%] lg:h-full lg:w-1/3 lg:flex lg:flex-col lg:items-start lg:justify-end flex flex-col">
        <h2 className="text-xl text-[#483d73] text-center lg:text-justify border-white pb-3 lg:pb-0 border-b-[1px] lg:border-none lg:ml-6 lg:text-3xl font-montserrat lg:leading-tight font-semibold">
          {testinomialData?.heading}
        </h2>
        <div className="hidden lg:flex flex-col">
          <h2 className="lg:text-5xl font-bold ml-4 mt-20">
            {testinomialData?.subheading}
          </h2>
          <h2 className="text-5xl flex flex-row font-bold ml-4 mt-6">
            {testinomialData?.secondsubheading?.substring(0, 3)}
            <span className="relative ml-1 ">
              <AnimatedText
                blockClassName="h-full rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500"
                className="text-5xl text-black font-bold"
                text={`${testinomialData?.secondsubheading?.substring(4)}`}
              />
            </span>
          </h2>
          <h3 className="mt-10 text-lg text-center font-poppins text-[#483d73]">
            {testinomialData?.description}
          </h3>
        </div>
        <div className="flex w-full mt-2 justify-between lg:hidden flex-row">
          <h4 className="text-sm w-1/2 text-center font-poppins">
            {testinomialData?.description}
          </h4>
          <div className="h-12 border-white w-1 border-l-[1px]"></div>
          <div className="flex text-center text-sm w-1/2 flex-col ">
            <div className="flex text-[#483d78] text-lg items-center justify-center flex-row">
              {" "}
              <AnimatedText text={"1000"}></AnimatedText>
              <span className="text-[#dc0e2a]">+</span>
            </div>
            {testinomialData?.thirdsubheading}
          </div>
        </div>
        <SwipeCarousel heroData={heroData} />
      </div>
      <div className="w-full h-[55%] mt-8 lg:mt-0 lg:w-2/3 relative lg:h-full">
        <div className="ml-0 lg:ml-14 h-screen mask-gradient rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          {/* Use testimonialItems instead of testinomialData?.testinomial */}
          <TestiNomialAnimation items={testimonialItems} speed="normal" />
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonial;
