import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import Pages from "@/components/knowledge-center/Pages";
import {
  KnowledgeCenterItem,
  Props,
} from "@/components/knowledge-center/types/constant";
import { getBaseUrl } from "@/app/api/environment";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

export const revalidate = 60;

async function fetchKnowledgeCenterData(
  locale: string
): Promise<KnowledgeCenterItem | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/knowledgecenter.json`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching knowledge center data:", error);
    const fallbackRes = await fetch(`${apiUrl}en/knowledgecenter.json`, {
      cache: "no-store",
    });
    if (!fallbackRes.ok) throw new Error("Failed to fetch fallback");
    return await fallbackRes.json();
  }
}

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    if (!res.ok) throw new Error("Failed to fetch country data");
    const countryData: Record<string, string> = await res.json();
    return countryData[locale] || countryData["en"];
  } catch (error) {
    console.error("Error fetching country data:", error);
    const fallbackRes = await fetch(`${countryUrl}in.json`);
    if (!fallbackRes.ok)
      throw new Error("Failed to fetch fallback country data");
    const fallbackData: Record<string, string> = await fallbackRes.json();
    return fallbackData[locale] || fallbackData["en"];
  }
}

export async function generateMetadata({
  params: { locale, country },
}: Props): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const baseUrl = getBaseUrl();

  const countryName = await fetchCountryData(locale);
  const knowledgeCenterData = await fetchKnowledgeCenterData(locale);
  // console.log("i am seo data", knowledgeCenterData.knowledgeCenter[0].knowLedgeCenterSeoData);
  
  if (!knowledgeCenterData || !knowledgeCenterData.knowledgeCenter || knowledgeCenterData.knowledgeCenter.length === 0) {
    return {
      title: "Knowledge Center - Nessco Industries",
      description:
        "Explore our Knowledge Center for valuable insights and information.",
    };
  }

  const seoData = knowledgeCenterData.knowledgeCenter[0].knowLedgeCenterSeoData;

  if (!seoData) {
    return {
      title: "Knowledge Center - Nessco Industries",
      description:
        "Explore our Knowledge Center for valuable insights and information.",
    };
  }

  return {
    title: `${seoData.title} - ${countryName}`,
    description: seoData.description,
    keywords: seoData.keywords,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}/${country}/${locale}`,
    },
    openGraph: {
      type: "website",
      title: seoData.openGraph.title,
      siteName: "Nessco Industries",
      url: `${baseUrl}/${country}/${locale}`,
      description: seoData.openGraph.description,
      images: seoData.openGraph.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: seoData.twitter.title,
      description: seoData.twitter.description,
      images: seoData.twitter.image,
    },
    robots: seoData.robots,
  };
}

export default async function KnowledgeCenter({ params: { locale } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const knowledgeCenterData = await fetchKnowledgeCenterData(locale);
  const t = await getTranslations({ locale });

  if (!knowledgeCenterData) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{t("knowledgeCenter")}</h1>
        <p className="text-red-500">{t("failedToLoadData")}</p>
      </main>
    );
  }

  return (
    <main>
      <Pages knowledgeCenterData={knowledgeCenterData} />
    </main>
  );
}

