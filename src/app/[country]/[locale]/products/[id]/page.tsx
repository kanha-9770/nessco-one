import Pages from "@/components/productLayout/Pages";
import { ProductLayout } from "@/components/productLayout/types/constant";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { cookies } from "next/headers";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";


// Revalidate every 60 seconds
export const revalidate = 60;

// Fetch product layout data based on locale
async function fetchProductLayoutData(
  locale: string
): Promise<ProductLayout | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/productlayout.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/productlayout.json`, {
      cache: "no-store",
    });
    const data = await fallbackRes.json();
    return data;
  }
}

type CountryNames = {
  [locale: string]: string; 
};

// Fetch country data based on locale
async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";

  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    const countryData: CountryNames = await res.json();
    return countryData[locale] || countryData["en"];
  } catch (error) {
    const fallbackRes = await fetch(`${countryUrl}in.json`);
    const fallbackData: CountryNames = await fallbackRes.json();
    return fallbackData[locale] || fallbackData["en"];
  }
}

// Dynamically generate metadata
export async function generateMetadata({
  params: { locale, id },
}: { params: { locale: string; id: string } }): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  const productLayoutData = await fetchProductLayoutData(locale);
  const countryName = await fetchCountryData(locale);

  if (!productLayoutData && !countryName) {
    return {
      title: "Default Title",
      description: "Default Description",
      keywords: "default, keywords",
      openGraph: {
        title: "Default OG Title",
        description: "Default OG Description",
        images: [
          {
            url: "/default-image.webp",
            alt: "Default Image Alt",
          },
        ],
      },
      robots: "index, follow",
      alternates: {
        canonical: "https://www.default.com",
      },
      twitter: {
        card: "summary_large_image",
        site: "@DefaultTwitter",
        title: "Default Twitter Title",
        description: "Default Twitter Description",
      },
    };
  }

  const seoData = productLayoutData?.ProductLayout[0]?.productLayoutSeoData;

  return {
    title: `${seoData?.title} - ${countryName} `,
    description: seoData?.description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `https://nessco-two.vercel.app/${countryName}/${locale}/products/${id}`,
    },
    openGraph: {
      type: "website",
      title: seoData?.openGraph?.title,
      siteName: "Nessco Industries",
      url: `https://nessco-two.vercel.app/${countryName}/${locale}/products/${id}`,
      description: seoData?.openGraph?.description,
      images: seoData?.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: seoData?.twitter?.title,
      description: seoData?.twitter?.description,
      images: seoData?.twitter?.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Home component rendering
export default async function about({
  params: { locale},
}: { params: { locale: string; id: string } }) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const productLayoutData = await fetchProductLayoutData(locale);
  const t = await getTranslations({ locale });

  if (!productLayoutData) {
    return <p>{t("failedToLoadData")}</p>;
  }

  return (
    <main>
      <Pages productLayoutData={productLayoutData} />
    </main>
  );
}
