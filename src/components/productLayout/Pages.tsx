"use client";
import React from "react";
import Page1 from "@/components/productLayout/Header";
import Page2 from "@/components/productLayout/ProductsGrid";
import { notFound, useParams } from "next/navigation";
import { ProductLayout } from "./types/constant";

interface ProductLayoutProps {
  productLayoutData: ProductLayout;
}

const Page: React.FC<ProductLayoutProps> = ({ productLayoutData }) => {
  const Header = productLayoutData?.ProductLayout[0]?.Header;
  const ProductsGrid = productLayoutData?.ProductLayout[0]?.ProductsGrid;
  const params = useParams() as Record<string, string | string[]> | null;

  if (!params || !params.id) {
    return notFound();
  }

  let machinename = "";

  if (Array.isArray(params.id)) {
    // Join array elements into a single string and normalize spaces
    machinename = decodeURIComponent(params.id.join(" "))
      .replace(/\+/g, " ")
      .trim();
  } else if (typeof params.id === "string") {
    // Decode and normalize the single string
    machinename = decodeURIComponent(params.id).replace(/\+/g, " ").trim();
  }

  if (!machinename) {
    return notFound();
  }

  // Helper function to normalize title for comparison
  const normalizeTitle = (title: string) =>
    title.toLowerCase().replace(/\s+/g, " ").trim();

  // Find the product by its normalized title
  const normalizedMachinename = normalizeTitle(machinename);

  const page1machine = Header.data.find(
    (m) => normalizeTitle(m.title) === normalizedMachinename
  );
  const page2machine = ProductsGrid.data.find(
    (m) => normalizeTitle(m.title) === normalizedMachinename
  );

  if (!page1machine || !page2machine) {
    return notFound();
  }

  return (
    <>
      <Page1 page1machine={page1machine} />
      <Page2 page2machine={page2machine} productLayoutData={productLayoutData} />
    </>
  );
};

export default Page;
