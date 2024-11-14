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
  name: string;
  description: string;
}

const componentList = [
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
  const applicationData = navData?.navbar[2].data?.applications;
  useEffect(() => {
    console.log("i am inside applciation alyout", applicationData);
  });
  const [activeProduct, setActiveProduct] = useState<Product>(
    applicationData[0]
  );
  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4">
      <div className="relative md:w-[70%] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-4 md:mb-0 md:mr-4">
        {applicationData.map((product, index) => {
          const IconComponent = componentList[index];
          return (
            <Link
              key={product.id}
              className="flex flex-col items-center justify-center p-2 invert-0 cursor-pointer"
              onMouseEnter={() => setActiveProduct(product)}
              href={`/${countryCODE}/${languageCODE}/application/${product?.name}`}
            >
              <div className=" h-20 w-20 flex items-center justify-center">
                <IconComponent />
              </div>
              <span className="text-xs text-center invert-0">
                {product.name}
              </span>
            </Link>
          );
        })}

        <Link href={`/${countryCODE}/${languageCODE}/application`}>
          <div className="absolute bottom-4 right-4">
            <Button className="rounded-full flex items-center bg-primary text-primary-foreground hover:bg-black hover:text-black border border-black px-1 py-2 text-base font-regular group">
              <span className="flex-grow ml-2 text-center group-hover:text-white">View All</span>
              <span className="ml-2 rounded-full p-1 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="lg:w-6 w-5 lg:h-6 h-5"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="32"
                    className="fill-black group-hover:fill-white cursor-pointer"
                  />
                  <path
                    d="M25 20 L37 32 L25 44"
                    className="stroke-white group-hover:stroke-black stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                  />
                </svg>{" "}
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
                applicationData.findIndex((p) => p.id === activeProduct.id)
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
          <p className="pt-6 invert-0 mb-4">{activeProduct.description}</p>
        </div>
        <Link href={`/${countryCODE}/${languageCODE}/application`}>
          <div className="absolute bottom-6 right-8 z-20 rounded-full bg-white hover:bg-black hover:text-white">
            <Button>Explore More</Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
