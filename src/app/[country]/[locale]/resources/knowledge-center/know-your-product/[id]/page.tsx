import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import { Metadata } from "next";
import { cookies } from "next/headers";
import KnowYourComponent from "@/components/KnowYourProductComponent";
import { KnowYourProduct } from "@/components/types";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

export const revalidate = 60;

async function fetchKnowYourProductData(locale: string): Promise<KnowYourProduct | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/knowyourproduct.json`);
    const data: KnowYourProduct = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/knowyourproduct.json`, {
      cache: "no-store",
    });
    const data: KnowYourProduct = await fallbackRes.json();
    return data;
  }
}

type CountryNames = {
  [locale: string]: string;
};

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

export async function generateMetadata({
  params: { locale},
}: Props): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  const knowYourProductData = await fetchKnowYourProductData(locale);
  const countryName = await fetchCountryData(locale);

  if (!knowYourProductData || !countryName) {
    return {
      title: "Default Title",
      description: "Default Description",
      openGraph: {
        title: "Default OG Title",
        description: "Default OG Description",
        url: "https://example.com",
        images: [],
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  }

  const seoData = knowYourProductData.KnowYourProduct[0].knowYourProductSeoData;

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      type: "website",
      title: seoData.openGraph.title,
      siteName: "Nessco Industries",
      url: `https://nessco-two.vercel.app/${countryName}/${locale}`,
      description: seoData.openGraph.description,
      images: seoData.openGraph.images,
    },
    alternates: {
      canonical: seoData.alternates.canonical,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: seoData.twitter.title,
      description: seoData.twitter.description,
      images: [seoData.twitter.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function KnowYourProductPage({ params: { locale} }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);
  const knowYourProductData = await fetchKnowYourProductData(locale);

  return <KnowYourComponent data={knowYourProductData} />;
}
