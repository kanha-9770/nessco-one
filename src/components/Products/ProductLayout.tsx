"use client";
import React, { useRef } from "react";
import NavLinksDemo from "@/components/Home/NavLinks";
import { notFound, useParams } from "next/navigation";
import Machine from "@/components/Products/machine/MachineHome";
import ProductDescription from "@/components/Products/ProductDescription";
import CupFormactionProcess from "@/components/Products/CupFormactionProcess";
import { SignupFormDemoProduct } from "@/components/Contact/CustomProductForm";
import ProductApplication from "@/components/Products/ProductApplication";
import RelatedProducts from "@/components/Products/RelatedProducts";
import ProcessFlow from "@/components/Products/ProcessFlow";
import { MachineType } from "./types/constant";
import TechnicalSpecifications from "./TechnicalSpecification";
import FaqProducts from "./FaqSection";

interface IndividualProductsDataProps {
  IndividualProductsData: MachineType;
}

const ProductLayout: React.FC<IndividualProductsDataProps> = ({
  IndividualProductsData,
}) => {
  const params = useParams();

  // Extract the last two slugs from the params
  const slugs = Object.values(params).filter(Boolean);
  const machineName =
    slugs.length > 1
      ? decodeURIComponent(slugs[slugs.length - 2] as string)
      : "";
  const machineId =
    slugs.length > 0
      ? decodeURIComponent(slugs[slugs.length - 1] as string)
      : "";
  // alert(machineId)

  // Use machineId for finding the machine in the data
  const machine = IndividualProductsData;

  const overviewRef = useRef<HTMLDivElement>(null);
  const productDescriptionRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const applicationRef = useRef<HTMLDivElement>(null);
  const technicalSpecificationsRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const relatedProductsRef = useRef<HTMLDivElement>(null);

  if (!machineName || !machineId || !machine) {
    return notFound();
  }

  const navLinks = [
    { text: "Overview", ref: overviewRef },
    { text: "Product Description", ref: productDescriptionRef },
    { text: "Process", ref: processRef },
    { text: "Application", ref: applicationRef },
    { text: "Technical Specifications", ref: technicalSpecificationsRef },
    { text: "FAQs", ref: faqsRef },
    { text: "Related Products", ref: relatedProductsRef },
  ];

  return (
    <main className="bg-[#f2f2f2] w-full h-full">
      <Machine
        name={machine?.name}
        image={machine?.image}
        mimage={machine?.mimage}
        product_heading={machine?.product_heading}
        first_name={machine?.first_name}
        specification_image={machine?.specification_image}
        advantages={machine?.advantages}
        introduction={machine?.introduction}
        technicalSpecifications={machine?.technicalSpecifications}
      />
      <NavLinksDemo type="product" navItems={navLinks} />

      <div className="h-full lg:px-10 px-4 mt-16 gap-4 flex lg:flex-row flex-col-reverse w-full">
        <div className="lg:w-[66.2%] ">
          <div className=" " ref={productDescriptionRef}>
            <ProductDescription machine={machine} />
          </div>
          <div className="h-auto  mt-10" ref={processRef}>
            {machine?.drawingImage && <CupFormactionProcess />}

            <ProcessFlow page4Data={machine?.Page4Data} />
          </div>
          <div className="mt-10" ref={applicationRef}>
            <ProductApplication applicationData={machine?.applicationData} />
          </div>
          <div
            className="mt-10 lg:block hidden"
            ref={technicalSpecificationsRef}
          >
            <TechnicalSpecifications
              technicalSpecification={
                machine?.TechnicalSpecificationComponentData
              }
            />
          </div>
          <div className="mt-10" ref={faqsRef}>
            <FaqProducts faqData={machine?.FAQ} />
          </div>
        </div>
        <div className="lg:w-[33%] sticky">
          <SignupFormDemoProduct related_product={machine?.related_product} />
        </div>
      </div>

      <div className="lg:hidden px-4 pt-10">
        <SignupFormDemoProduct related_product={machine?.related_product} />
      </div>
      <div className="lg:mt-24 -mt-44" ref={relatedProductsRef}>
        <RelatedProducts related_product={machine?.related_product} />
      </div>
    </main>
  );
};

export default ProductLayout;
