"use client";
import React from "react";
import Page1 from "@/components/applicationLayout/Header";
import { notFound, useParams } from "next/navigation";
import Page2 from "@/components/applicationLayout/ScrollableComponent";
const Page3 = dynamic(
  () => import("@/components/applicationLayout/ProductGallery")
);
const Page4 = dynamic(
  () => import("@/components/applicationLayout/RelatedMachines")
);
const Page5 = dynamic(() => import("@/components/applicationLayout/FAQ"));
import dynamic from "next/dynamic";
import { ApplicationLayoutItem } from "./types/constant";

interface ApplicationLayoutProps {
  applicationLayoutData: ApplicationLayoutItem;
}

const Pages: React.FC<ApplicationLayoutProps> = ({ applicationLayoutData }) => {
  const Header = applicationLayoutData?.ApplicationLayout[0]?.Header;
  const ScrollableComponent =
    applicationLayoutData?.ApplicationLayout[0]?.ScrollableComponent;
  const ProductGallery =
    applicationLayoutData?.ApplicationLayout[0]?.ProductGallery;
  const RelatedMachines =
    applicationLayoutData?.ApplicationLayout[0]?.RelatedMachines;
  const params = useParams() as Record<string, string | string[]> | null;

  if (!params || !params.id) {
    return notFound();
  }

  let productname = "";

  if (Array.isArray(params.id)) {
    // Join array elements into a single string and normalize spaces
    productname = decodeURIComponent(params.id.join(" "))
      .replace(/\+/g, " ")
      .trim();
  } else if (typeof params.id === "string") {
    // Decode and normalize the single string
    productname = decodeURIComponent(params.id).replace(/\+/g, " ").trim();
  }

  if (!productname) {
    return notFound();
  }

  // Helper function to normalize title for comparison
  const normalizeTitle = (title: string) =>
    title
      .toLowerCase()          // Convert to lowercase
      .replace(/\s+/g, "-")    // Replace spaces (and multiple spaces) with hyphens
      .trim();                 // Remove leading or trailing spaces
  

  // Find the product by its normalized title
  const normalizedProductname = productname;
  // alert(normalizedProductname);
  const page1product = Header.icons.find(
    (m) => normalizeTitle(m.title) === normalizedProductname
  );
  const page2product = ScrollableComponent.products.find(
    (m) => normalizeTitle(m.title) === normalizedProductname
  );
  const page3product = ProductGallery.images.find(
    (m) => normalizeTitle(m.title) === normalizedProductname
  );
  const page4product = RelatedMachines.imageDescription.find(
    (m) => normalizeTitle(m.title) === normalizedProductname
  );

  if (!page1product || !page2product || !page3product || !page4product) {
    return notFound();
  }

  return (
    <>
      <Page1
        page1product={page1product}
        applicationLayoutData={applicationLayoutData}
      />
      <Page2 page2product={page2product} />
      <Page4
        page4product={page4product}
        applicationLayoutData={applicationLayoutData}
      />
      <Page3
        page3product={page3product}
        applicationLayoutData={applicationLayoutData}
      />
      <Page5 applicationLayoutData={applicationLayoutData} />
    </>
  );
};

export default Pages;
