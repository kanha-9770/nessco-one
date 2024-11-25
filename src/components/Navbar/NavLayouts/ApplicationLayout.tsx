import { useEffect, useState } from "react";
const HandBurgerBox = dynamic(() => import("../../Icons/HandBurgerBox"), {
  ssr: false,
});
const LunchBox = dynamic(() => import("../../Icons/LunchBox"), { ssr: false });
const PaperBlank = dynamic(() => import("../../Icons/PaperBlank"), {
  ssr: false,
});
const PaperBowl = dynamic(() => import("../../Icons/PaperBowl"), {
  ssr: false,
});
const PaperCup = dynamic(() => import("../../Icons/PaperCup"), { ssr: false });
const PaperCupWithLid = dynamic(() => import("../../Icons/PaperCupWithLid"), {
  ssr: false,
});
const PaperCupWithSleeve = dynamic(
  () => import("../../Icons/PaperCupWithSleeve"),
  { ssr: false }
);
const PaperCutlery = dynamic(() => import("../../Icons/PaperCutlery"), {
  ssr: false,
});
const PaperPlate = dynamic(() => import("../../Icons/PaperPlate"), {
  ssr: false,
});
const PaperRoll = dynamic(() => import("../../Icons/PaperRoll"), {
  ssr: false,
});
const PaperStraw = dynamic(() => import("../../Icons/PaperStraw"), {
  ssr: false,
});
const PopcornTub = dynamic(() => import("../../Icons/PopcornTub"), {
  ssr: false,
});

import { Button } from "../../ui/button";
import dynamic from "next/dynamic";
import { NavbarData } from "../types/constant";
import Link from "next/link";
import { countryCODE, languageCODE } from "../nav-menue";
interface Product {
  id: string;
  link:string;
  name: string;
  description: string;
}

export const componentList = [
  PaperCutlery,
  PaperCupWithSleeve,
  PaperCupWithLid,
  PaperCup,
  PopcornTub,
  LunchBox,
  PaperStraw,
  PaperRoll,
  PaperPlate,
  PaperBowl,
  PaperBlank,
  HandBurgerBox,
];
interface ApplicationLayoutProps {
  navData: NavbarData;
}
export default function ApplicationLayout({ navData }: ApplicationLayoutProps) {
  const applicationData = navData?.navbar[2]?.data?.applications;
  useEffect(() => {
    console.log("i am inside applciation alyout", applicationData);
  });
  const [activeProduct, setActiveProduct] = useState<Product>(
    applicationData[0]
  );
  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4">
      <div className="relative md:w-[70%] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-4 md:mb-0 md:mr-4">
        {applicationData?.map((product, index) => {
          const IconComponent = componentList[index];
          return (
            <Link
              key={product?.id}
              className="flex flex-col items-center justify-center p-2 invert-0 cursor-pointer"
              onMouseEnter={() => setActiveProduct(product)}
              href={`/${countryCODE}/${languageCODE}/application${product.link}`}
            >
              <div className=" h-20 w-20 flex items-center justify-center">
                <IconComponent />
              </div>
              <span className="text-xs text-center invert-0">
                {product?.name}
              </span>
            </Link>
          );
        })}

        <Link href={`/${countryCODE}/${languageCODE}/application`}>
          <div className="absolute bottom-4 right-4">
            <Button
              className="rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-red-700 border-2 group border-red-700 w-[12rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group relative"
              aria-label="View all items"
            >
              <span className="text-red-700 text-start group-hover:text-white">
                View Machine
              </span>
              <span className="bg-red-700 group-hover:bg-white p-1 rounded-full absolute right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-white group-hover:stroke-red-700"
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

      <div className="md:w-[30%] border-l p-6 flex flex-col  relative">
        <div className="absolute inset-0 px-8  h-full w-full opacity-5 pointer-events-none">
          {(() => {
            const ActiveIconComponent =
              componentList[
                applicationData?.findIndex((p) => p?.id === activeProduct?.id)
              ];
            return <ActiveIconComponent width={"100%"} />;
          })()}
        </div>
        <div className="relative w-full  z-10">
          <h2 className="w-full text-5xl font-semibold">
            <span className="text-[#483d73]">
              {activeProduct?.name.trim().replace(/\s+\S+$/, "")}
            </span>{" "}
            <span className="text-red-700">
              {activeProduct?.name.trim().match(/\S+$/)}
            </span>
          </h2>
          <p className="pt-6 invert-0 mb-4">{activeProduct?.description}</p>
        </div>
        <Link
          href={`/${countryCODE}/${languageCODE}/application/${activeProduct?.name}`}
        >
          <div className="absolute bottom-6 border right-8 z-20 rounded-full bg-white hover:bg-black hover:text-white">
            <Button
              className="rounded-full relative flex items-center justify-center bg-primary text-primary-foreground hover:bg-[#483d73] border-2 group border-[#483d73] w-[12rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group"
              aria-label="View all items"
            >
              <span className="text-[#483d73] group-hover:text-white">
                Explore All
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
