"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  title: string;
  description: string;
  image: string;
}

interface ApplicationItem {
  Application: Array<{
    Technology: {
      craftsmanshipTechnology: string;
      paragraph: string;
      container: Array<{
        [key: string]: Array<{
          title: string;
          description: string;
          craftsmanshipImg: string;
        }>;
      }>;
    };
  }>;
}

interface Page3Props {
  selectedProduct: Product;
  applicationData: ApplicationItem;
}

const Page3: React.FC<Page3Props> = ({ applicationData, selectedProduct }) => {
  const Technology = applicationData.Application[0].Technology;
  const carouselRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (borderRef.current) {
      gsap.fromTo(
        borderRef.current,
        { width: "2%" },
        {
          width: "13%",
          ease: "none",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "-40% 40%",
            end: "-10% 50%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const productItems = Technology.container[0][selectedProduct.title as keyof typeof Technology.container[0]] || [];

  return (
    <div
      className="w-full lg:mt-[8rem] mt-[3rem] lg:px-[2rem] px-[1rem] font-regular font-poppins"
      ref={carouselRef}
    >
      <div className="lg:px-[1rem] lg:mb-[3rem] mb-[2rem]">
        <h2 className="lg:text-[2.2rem] text-[1.5rem] font-semibold">
          <span className="text-[#483d73]">
            {Technology.craftsmanshipTechnology.trim().replace(/\s+\S+$/, "")}
          </span>{" "}
          <span className="text-red-700">
            {Technology.craftsmanshipTechnology.trim().match(/\S+$/)}
          </span>
        </h2>
        <div
          className="border-t-[0.2rem] border-solid border-red-700 w-[8rem] lg:mt-[1rem] mt-[0.5rem]"
          ref={borderRef}
        ></div>
        <div className="lg:w-[45rem] lg:mt-[2rem] mt-[1rem]">
          <p className="lg:text-[1rem] text-sm">{Technology.paragraph}</p>
        </div>
      </div>

      <div className="lg:space-y-3 space-y-4">
        {productItems.length > 0 ? (
          productItems.map((item, idx) => (
            <div
              key={idx}
              className="w-full lg:h-[10rem] h-full lg:space-x-3 flex lg:flex-row flex-col-reverse"
            >
              <div className="lg:w-[80%] w-full h-full bg-white lg:rounded-[0.5rem] rounded-b-[0.5rem] p-[0.5rem] lg:p-[1rem]">
                <h2 className="text-[#483d73] font-medium lg:text-[1.6rem] text-[1rem]">
                  {item.title}
                </h2>
                <div className="h-max w-full lg:pl-[2rem] lg:mt-[0.5rem] mt-[0.2rem]">
                  <p className="lg:text-[1rem] text-sm w-[98%]">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="lg:w-[20%] w-full h-full lg:rounded-[0.5rem] rounded-t-[0.5rem] overflow-hidden">
                <Image
                  className="lg:h-[10rem] h-full w-full object-cover"
                  width={300}
                  height={300}
                  src={item.craftsmanshipImg}
                  alt={item.title}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500">No items available for this product.</p>
        )}
      </div>
    </div>
  );
};

export default Page3;