import { Metadata } from "next";
import Pages from "@/components/Sustainability/Pages";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { cookies } from "next/headers"; // Server-side (Next.js app directory)
import { getBaseUrl } from "@/app/api/environment";

import { SustainabilityData } from "@/components/Sustainability/types/constant";
const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string; country: string };
};
// Revalidate every 60 seconds (or any time period you prefer)
export const revalidate = 60;
// Fetch home data based on the locale
async function fetchsustainabilityData(locale: string): Promise<SustainabilityData | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/sustainability.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/sustainability.json`, {
      cache: "no-store", // Ensures no caching for the fallback as well
    });
    const data = await fallbackRes.json();
    return data;
  }
}

type CountryNames = {
  [locale: string]: string; // Each locale key maps directly to the country name
};

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  console.log("countryname", country);

  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    const countryData: CountryNames = await res.json();

    // Return the country name for the provided locale
    return countryData[locale] || countryData["en"]; // Fallback to English if the locale isn't available
  } catch (error) {
    const fallbackRes = await fetch(`${countryUrl}in.json`);
    const fallbackData: CountryNames = await fallbackRes.json();

    // Handle fallback case, also fallback to English if locale not available
    return fallbackData[locale] || fallbackData["en"];
  }
}


// Dynamically generate metadata using the fetched SEO data
export async function generateMetadata({
  params: { locale, country },
}: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  // Fallback to "en" if the locale isn't supported
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const countryName = await fetchCountryData(locale);
  const sustainData = await fetchsustainabilityData(locale);


  if (!sustainData ) {
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
        canonical: `${baseUrl}/${country}/${locale}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@DefaultTwitter",
        title: "Default Twitter Title",
        description: "Default Twitter Description",
      },
    };
  }


 
  const seoData = sustainData?.Sustainability[0]?.SustainabilitySeoData;  

  return {
    title: `${seoData?.title} - ${countryName} `,
    description: seoData?.description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}/${country}/${locale}`,
    },
    openGraph: {
      type: "website",
      title: seoData?.openGraph?.title,
      siteName: "Nessco Industries",
      url: `${baseUrl}/${country}/${locale}`,
      description: seoData?.openGraph?.description,
      images: seoData?.openGraph?.image,
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

// Home component rendering the MainLayout with fetched data
export default async function sustain({ params: { locale } }: Props) {

  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch home data based on the locale
  const sustainData = await fetchsustainabilityData(locale);

  // Fetch translations based on the locale
  const t = await getTranslations({ locale });

  if (!sustainData) {
    return <p>{t("failedToLoadData")}</p>;
  }
  

  return (
    <main>
      <Pages sustainData={sustainData}/>
    </main>
  );
}
