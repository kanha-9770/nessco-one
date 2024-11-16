"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HomeData } from "./types/constant";
const HomeMachineCarousel = dynamic(
  () => import("./Common/HomeMachineCarousel")
);
const Stepper = dynamic(() => import("../ui/Stepper"));
// Define the type for each card item
type CardItem = {
  category: string;
  firstname: string;
  secondname: string;
  description: string;
  image: string;
  title: string;
  speed: number;
  unit: string;
  icon: string;
  items: { className: string; text: string }[];
};
interface HomeMachineLayoutProps {
  heroData: HomeData;
}
const HomeMachine: React.FC<HomeMachineLayoutProps> = ({ heroData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const categories = heroData?.home[2]?.data.stepperFilter;

  // Access the product data from the 'ProductSection'
  const productData = heroData?.home[2]?.data?.products;

  if (!productData) {
    return <div>No products available</div>;
  }

  // Filter products based on the active step (category)
  const filteredCardsData: CardItem[] =
    categories[activeStep] === `${categories[0].name}`
      ? productData
      : productData.filter(
          (card: CardItem) => card.category === categories[activeStep]
        );
        useEffect(() => {
          console.log("categories", filteredCardsData);
        }, []);
  return (
    <div className="h-full w-full max-w-screen-2xl mx-auto ">
      {/* Stepper to switch between categories */}
      <Stepper categories={categories} onStepChange={setActiveStep} />
      {/* Carousel displaying the filtered products */}
      <div className="h-[90%] mt-4">
        <HomeMachineCarousel filteredCardsData={filteredCardsData} />
      </div>
    </div>
  );
};

export default HomeMachine;
