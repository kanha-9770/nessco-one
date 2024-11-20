import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import ProductLayout from "@/components/Products/ProductLayout";
import { IndividualProductsData } from "@/components/Products/types/constant";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";

// Define the allowed Twitter card types

type Props = {
  params: { locale: string };
};

// Revalidate every 60 seconds (or any time period you prefer)
export const revalidate = 60;

// Fetch home data based on the locale
async function fetchIndividualProductsData(locale: string): Promise<IndividualProductsData | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/Individualproducts.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/Individualproducts.json`, {
      cache: "no-store", // Ensures no caching for the fallback as well
    });
    const data = await fallbackRes.json();
    return data;
  }
}



// // Dynamically generate metadata using the fetched SEO data
// export async function generateMetadata({
//   params: { locale },
// }: Props): Promise<Metadata> {
//   // Fallback to "en" if the locale isn't supported
//   if (!locales.includes(locale as any)) {
//     locale = "en";
//   }
//   const IndividualProductsData = await fetchIndividualProductsData(locale);
//   const countryName = await fetchCountryData(locale);

//   if (!IndividualProductsData && !countryName) {
//     return {
//       title: "Default Title",
//       description: "Default Description",
//       keywords: "default, keywords",
//       openGraph: {
//         title: "Default OG Title",
//         description: "Default OG Description",
//         images: [
//           {
//             url: "/default-image.webp",
//             alt: "Default Image Alt",
//           },
//         ],
//       },
//       robots: "index, follow",
//       alternates: {
//         canonical: "https://www.default.com",
//       },
//       twitter: {
//         card: "summary_large_image",
//         site: "@DefaultTwitter",
//         title: "Default Twitter Title",
//         description: "Default Twitter Description",
//       },
//     };
//   }

//   const seoData = IndividualProductsData?.IndividualProducts[0]?.data.homeSeoData;
//   const country = cookies().get("country")?.value || "in";

//   return {
//     title:`${seoData?.title} - ${countryName} `,
//     description: seoData?.description,
//     keywords: seoData?.keywords,
//     openGraph: {
//       title: seoData.openGraph.title,
//       description: seoData.openGraph.description,
//       url: seoData.alternates.canonical,
//       images: seoData.openGraph.images.map((image) => ({
//         url: image.url,
//         alt: image.alt,
//       })),
//     },
//     robots: seoData?.robots,
//     alternates: {
//       canonical:`https://nessco-services.vercel.app/${country}/${locale}`,
//     },
//     twitter: {
//       card: seoData.twitter.card as TwitterCardType, // Explicitly cast to TwitterCardType
//       site: seoData.twitter.site,
//       title: seoData.twitter.title,
//       description: seoData.twitter.description,
//       images: [
//         {
//           url: seoData.twitter.image,
//         },
//       ],
//     },
//   };
// }

// Home component rendering the MainLayout with fetched data
export default async function Home({ params: { locale } }: Props) {
  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch home data based on the locale
  const IndividualProductsData = await fetchIndividualProductsData(locale);

  // Fetch translations based on the locale
  const t = await getTranslations({ locale });

  if (!IndividualProductsData) {
    return <p>{t("failedToLoadData")}</p>;
  }

  return (
    <main>
      <ProductLayout IndividualProductsData={IndividualProductsData}/>
    </main>
  );
}
