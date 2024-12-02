import { getBaseUrl } from "@/app/api/environment";
import Pages from "@/components/applicationLayout/Pages";
import { ApplicationLayoutItem } from "@/components/applicationLayout/types/constant";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;

type Props = {
  params: { locale: string; id: string };
};

// Revalidate every 60 seconds (or any time period you prefer)
export const revalidate = 60;

// Fetch application layout data and FAQ data based on the locale
async function fetchapplicationLayoutData(
  locale: string
): Promise<{ botData: ApplicationLayoutItem | null; faqData: any | null }> {
  try {
    const res = await fetch(`${apiUrl}${locale}/applicationlayout.json`);
    const faqRes = await fetch(`${apiUrl}${locale}/faq.json`);
    const botData = await res.json();
    const faqData = await faqRes.json();

    return { botData, faqData };
  } catch (error) {
    // Fallback to English data if the locale fails
    const fallbackRes = await fetch(`${apiUrl}en/applicationlayout.json`, {
      cache: "no-store", // Ensures no caching for the fallback as well
    });
    const fallbackFaqRes = await fetch(`${apiUrl}en/faq.json`, {
      cache: "no-store",
    });

    const botData = await fallbackRes.json();
    const faqData = await fallbackFaqRes.json();

    return { botData, faqData };
  }
}

// Dynamically generate metadata using the fetched SEO data
export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  // Fallback to "en" if the locale isn't supported
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const baseUrl = getBaseUrl();

  const { botData } = await fetchapplicationLayoutData(locale);

  if (!botData) {
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

  const seoData = botData?.ApplicationLayout[0]?.applicationLayoutSeoData;

  return {
    title: seoData?.title,
    description: seoData?.description,
    keywords: seoData?.keywords,
    openGraph: {
      title: seoData?.openGraph?.title,
      description: seoData?.openGraph?.description,
      images: seoData?.openGraph?.images?.map(
        (image: { url: string; alt: string }) => ({
          url: image.url,
          alt: image.alt,
        })
      ),
    },
    robots: seoData?.robots,
    alternates: {
      canonical:`${baseUrl}`,
    },
  };
}

// About component rendering the Pages component with fetched data
export default async function about({ params: { locale, id } }: Props) {
  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch application layout data and FAQ data based on the locale
  const { botData, faqData } = await fetchapplicationLayoutData(locale);

  // Fetch translations based on the locale
  const t = await getTranslations({ locale });

  if (!botData) {
    return <p>{t("failedToLoadData")}</p>;
  }

  return (
    <main>
      <Pages applicationLayoutData={botData} faqData={faqData} id={id} />
    </main>
  );
}
