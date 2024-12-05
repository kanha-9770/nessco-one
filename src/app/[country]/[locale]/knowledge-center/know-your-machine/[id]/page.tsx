import {unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { KnowYourMachine } from "@/components/types";
import AnimatedBlogPost from "@/components/StaticBlogs/AnimatedBllog";
import { getBaseUrl } from "@/app/api/environment";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

export const revalidate = 60;

async function fetchKnowYourMachineData(locale: string): Promise<KnowYourMachine | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/knowyourmachine.json`);
    const data: KnowYourMachine = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/knowyourmachine.json`, {
      cache: "no-store",
    });
    const data: KnowYourMachine = await fallbackRes.json();
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

  const knowYourMachineData = await fetchKnowYourMachineData(locale);
  const countryName = await fetchCountryData(locale);

  if (!knowYourMachineData || !countryName) {
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

  const seoData = knowYourMachineData.KnowYourMachine[0].knowYourMachineSeoData;

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
      canonical:`${getBaseUrl}`,
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

export default async function KnowYourMachinePage({ params: { locale,id} }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  return <AnimatedBlogPost id={id}/>;
}

