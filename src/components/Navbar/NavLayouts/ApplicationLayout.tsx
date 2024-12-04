import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavbarData } from "../types/constant";
import Link from "next/link";
import { countryCODE, languageCODE } from "../nav-menue";

interface Product {
  id: string;
  link: string;
  name: string;
  description: string;
}

export const componentList = [
  "https://assets.nesscoindustries.com/public/assets/homepage/paper-lid(2).webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/paper-cup(4).webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/paper-bowl(2).webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/paper-plate.webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/paper-straw.webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/paper-bag.webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/paper-container.webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/insulating-cup-icon.webp",
  "https://assets.nesscoindustries.com/public/assets/homepage/cutlery-icon.webp",
];

interface ApplicationLayoutProps {
  navData: NavbarData;
  setActive: (item: string | null) => void;
}

export default function ApplicationLayout({
  navData,
  setActive,
}: ApplicationLayoutProps) {
  const applicationData = navData?.navbar[2]?.data?.applications;
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    console.log("i am inside application layout", applicationData);
    if (applicationData && applicationData.length > 0) {
      setActiveProduct(applicationData[0]);
    }
  }, [applicationData]);

  if (!applicationData) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full  lg:h-[24rem]">
      <div className="md:w-[70%] px-4 pt-4 relative">
        <div className="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-4 md:mb-0 md:mr-4">
          <Link
            className="flex flex-col items-center justify-center  invert-0 cursor-pointer"
            href={`/${countryCODE}/${languageCODE}/application`}
            onClick={() => setActive(null)}
          >
            <div className="h-24 w-24 bg-[#f2f2f2] rounded-xl flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dfryvystt/image/upload/v1731481264/49_vtvq7r.svg"
                className="h-16 w-auto hover:scale-90 transition-all duration-300"
                width={100}
                height={100}
              
                alt={"application link"}
              />
            </div>
            <span className="text-md font-medium text-center invert-0">
              All applications
            </span>
          </Link>
          {applicationData.map((product, index) => (
            <Link
              key={product.id}
              className="flex flex-col items-center justify-center p-2 invert-0 cursor-pointer"
              onMouseEnter={() => setActiveProduct(product)}
              href={`/${countryCODE}/${languageCODE}/application${product.link}`}
              onClick={() => setActive(null)}
            >
              <div className="h-24 w-24 bg-[#f2f2f2] rounded-xl flex items-center justify-center">
                <Image
                  className="h-16 w-auto hover:scale-90 transition-all duration-300"
                  width={100}
                  height={100}
                  src={componentList[index]}
                  alt={product.name}
                />
              </div>
              <span className="text-md font-medium text-center invert-0">
                {product.name}
              </span>
            </Link>
          ))}
        </div>
        <Link
          onClick={() => setActive(null)}
          className="flex lg:justify-end justify-center items-center pt-6 lg:pr-10"
          href={`/${countryCODE}/${languageCODE}/application`}
        >
          <div className="">
            <Button
              className="rounded-full flex items-center lg:justify-center justify-start bg-primary text-primary-foreground lg:hover:bg-white bg-red-700 border-2 group border-red-700 lg:w-[12rem] w-[8rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group relative"
              aria-label="View all items"
            >
              <span className="text-white text-start lg:group-hover:text-red-700">
                View All
              </span>
              <span className="bg-white lg:group-hover:bg-red-700 p-1 rounded-full absolute right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-red-700 lg:group-hover:stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </Link>
      </div>

      <div className="md:w-[30%] hidden  border-l p-6 lg:flex flex-col relative">
        <div className="absolute inset-0 px-8 h-[20rem] w-auto opacity-5 pointer-events-none">
          {activeProduct && (
            <Image
              src={
                componentList[
                  applicationData.findIndex((p) => p.id === activeProduct.id)
                ]
              }
              alt=""
              className="h-full w-full"
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
        <div className="relative w-full z-10">
          <h2 className="w-full text-5xl font-semibold">
            <span className="text-[#483d73]">
              {activeProduct?.name.trim().replace(/\s+\S+$/, "")}
            </span>{" "}
            <span className="text-red-700">
              {activeProduct?.name.trim().match(/\S+$/)}
            </span>
          </h2>
          <p className="pt-6 invert-0 mb-8">{activeProduct?.description}</p>
        </div>
        <Link
          href={`/${countryCODE}/${languageCODE}/application/${activeProduct?.name}`}
          onClick={() => setActive(null)}
        >
          <div className="absolute bottom-4 right-4 bg-white z-20 rounded-full hover:bg-black hover:text-white">
            <Button
              className="rounded-full relative flex items-center justify-center bg-primary text-primary-foreground hover:bg-[#483d73] border-2 group border-[#483d73] w-[12rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group"
              aria-label="View all items"
            >
              <span className="text-[#483d73] group-hover:text-white">
                Explore More
              </span>
              <span className="bg-[#483d73] group-hover:bg-white p-1 rounded-full absolute right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-white group-hover:stroke-[#483d73]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
