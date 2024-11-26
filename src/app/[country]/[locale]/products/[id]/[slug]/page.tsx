import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import ProductLayout from "@/components/Products/ProductLayout";
import { IndividualProductsData } from "@/components/Products/types/constant";
import { Metadata } from "next";
import { cookies } from "next/headers";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: {
    locale: string;
    id: string;
    slug: string;
  };
};

// Revalidate every 60 seconds
export const revalidate = 60;

async function fetchIndividualProductsData(
  locale: string
): Promise<IndividualProductsData | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/Individualproducts.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/Individualproducts.json`, {
      cache: "no-store",
    });
    const data = await fallbackRes.json();
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
  params: { locale, slug },
}: Props): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  const IndividualProductsData = await fetchIndividualProductsData(locale);
  const countryName = await fetchCountryData(locale);

  if (!IndividualProductsData && !countryName) {
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

  const seoData =
    IndividualProductsData?.IndividualProducts[0]?.data?.Machines?.find(
      (m) => m?.name === slug.toUpperCase()
    );

  if (!seoData) {
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

  return {
    title: `${seoData?.name}-${seoData?.first_name} - ${countryName}`,
    description: seoData?.introduction,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `https://nessco-two.vercel.app/${locale}/${slug}`,
    },
    openGraph: {
      type: "website",
      title: `${seoData?.name}-${seoData?.first_name}`,
      description: seoData?.introduction,
      url: `https://nessco-two.vercel.app/${locale}/${slug}`,
      siteName: "Nessco Industries",
      images: [
        {
          url: seoData?.mimage || "https://example.com/default-image.jpg",
          width: 1920,
          height: 1080,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${seoData?.name}-${seoData?.first_name}`,
      description: seoData?.introduction,
      images: [
        seoData?.mimage || "https://example.com/default-twitter-image.jpg",
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home({ params: { locale, slug } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const IndividualProductsData = await fetchIndividualProductsData(locale);
  const machine =
    IndividualProductsData?.IndividualProducts[0]?.data?.Machines?.find(
      (m) => m?.name === slug.toUpperCase()
    );

  const t = await getTranslations({ locale });

  if (!IndividualProductsData) {
    return <p>{t("failedToLoadData")}</p>;
  }

  return (
    <main>
      <ProductLayout IndividualProductsData={machine} />
    </main>
  );
}
