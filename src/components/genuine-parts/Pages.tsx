import React from "react";
import Page1 from "@/components/genuine-parts/Header";
const Page2 = dynamic(() => import("@/components/genuine-parts/Inventory"));
const Page3 = dynamic(() => import("@/components/genuine-parts/Box"));
import dynamic from "next/dynamic";

const Pages = () => {
  return (
    <>
      <Page1 />
      <Page2 />
      <Page3 />
    </>
  );
};

export default Pages;
