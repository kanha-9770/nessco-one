"use client";
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
import { FaqItem, Category } from "../Faq/types/constant";
import { useEffect } from "react";

interface ApplicationLayoutProps {
  applicationLayoutData: ApplicationLayoutItem;
  faqData: FaqItem;
  id?: string;
}

const Pages: React.FC<ApplicationLayoutProps> = ({
  applicationLayoutData,
  id,
  faqData,
}) => {
  const Header = applicationLayoutData?.ApplicationLayout[0]?.Header;
  const ScrollableComponent =
    applicationLayoutData?.ApplicationLayout[0]?.ScrollableComponent;
  const ProductGallery =
    applicationLayoutData?.ApplicationLayout[0]?.ProductGallery;
  const RelatedMachines =
    applicationLayoutData?.ApplicationLayout[0]?.RelatedMachines;
  const FAQ = applicationLayoutData?.ApplicationLayout[0]?.FAQ;
  const params = useParams() as Record<string, string | string[]> | null;

  if (!params || !params.id) {
    return notFound();
  }

  let productname = "";

  if (Array.isArray(params.id)) {
    productname = decodeURIComponent(params.id.join(" "))
      .replace(/\+/g, " ")
      .trim();
  } else if (typeof params.id === "string") {
    productname = decodeURIComponent(params.id).replace(/\+/g, " ").trim();
  }

  if (!productname) {
    return notFound();
  }

  const normalizeTitle = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-").trim();

  const normalizedProductname = normalizeTitle(productname);

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

  // Find the matching category in faqData
  const matchingCategory: Category | undefined =
    faqData.faq[0]?.searchbox?.categories?.find(
      (category) => normalizeTitle(category?.name) === normalizedProductname
    );

  // If a matching category is found, use its FAQs, otherwise use all FAQs
  const filteredFaqs = matchingCategory
    ? matchingCategory?.faqs
    : faqData?.faq[0]?.searchbox.categories.flatMap(
        (category) => category?.faqs
      );
  useEffect(() => {
    console.log("machinecategory", matchingCategory);
    console.log("machinecategory product", normalizedProductname, id);
    console.log("machinecategory product faqs:", filteredFaqs);
  }, []);
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
      <Page5
        filteredFaqs={filteredFaqs}
        categoryName={matchingCategory ? matchingCategory.name : id}
        faqTitle={faqData.faq[0].searchbox.title}
        faqSubTitle={faqData.faq[0].searchbox.Questions}
        formTitle={FAQ.formTitle}
        formPara={FAQ.formPara}
        firstName={FAQ.firstName}
        lastName={FAQ.lastName}
        emailAddress={FAQ.emailAddress}
        password={FAQ.password}
        twitterPassword={FAQ.twitterPassword}
        sendMessage={FAQ.sendMessage}
        tyler={FAQ.tyler}
        durden={FAQ.durden}
        emailPlaceholder={FAQ.emailPlaceholder}
      />
    </>
  );
};

export default Pages;
