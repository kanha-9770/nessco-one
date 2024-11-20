"use client";
import React, { useState } from "react";
import Page1 from "@/components/application/Header";
import Page2 from "@/components/application/SelectProduct";
import Page3 from "@/components/application/Technology";
import Page4 from "@/components/application/CustomizedProjects";
import { ApplicationItem } from "./types/constant";

export interface Product {
  img: string;
  title: string;
  description: string;
  image: string;
}

interface ApplicationProps {
  applicationData: ApplicationItem;
}

const Pages: React.FC<ApplicationProps> = ({ applicationData }) => {
  const SelectProduct = applicationData?.Application[0]?.SelectProduct;
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    SelectProduct.products[0]
  );

  // Function to update the selected product
  const updateData = (newData: Product) => {
    setSelectedProduct(newData);
    console.log("selected product", selectedProduct);
  };

  return (
    <>
      <Page1 applicationData={applicationData} />
      <Page2 selectedProduct={selectedProduct} updateData={updateData} applicationData={applicationData} />
      <Page3
        selectedProduct={selectedProduct}
        applicationData={applicationData}
      />
      <Page4
        selectedProduct={selectedProduct}
        applicationData={applicationData}
      />
    </>
  );
};

export default Pages;
