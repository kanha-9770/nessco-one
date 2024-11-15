import React from "react";
import Page1 from "@/components/genuine-parts/Header";
const Page2 = dynamic(() => import("@/components/genuine-parts/Inventory"));
const Page3 = dynamic(() => import("@/components/genuine-parts/Box"));
import dynamic from "next/dynamic";
import { GenuinePartsItem } from "./types/constant";

interface GenuinePartsProps {
  genuinePartsData: GenuinePartsItem;
}

const Pages: React.FC<GenuinePartsProps> = ({ genuinePartsData }) => {
  return (
    <>
      <Page1 genuinePartsData={genuinePartsData} />
      <Page2 genuinePartsData={genuinePartsData} />
      <Page3 genuinePartsData={genuinePartsData} />
    </>
  );
};

export default Pages;
