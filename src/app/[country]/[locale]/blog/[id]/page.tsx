// import { BlogsLayoutItem } from "@/components/blogsLayout/types/constant";
// import { Metadata } from "next";
// import { cookies } from "next/headers"; // Server-side (Next.js app directory)

// import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
// import React from "react";
// import BlogGeneric from "@/components/StaticBlogs/Blog/BlogGeneric";
// const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
// const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
// const countryUrl = "https://countryjson.nesscoindustries.com/";

// type Props = {
//   params: { locale: string; id: string };
// };
// // Revalidate every 60 seconds (or any time period you prefer)
// export const revalidate = 60;
// // Fetch home data based on the locale
// async function fetchblogsLayoutData(
//   locale: string
// ): Promise<BlogsLayoutItem | null> {
//   try {
//     const res = await fetch(`${apiUrl}${locale}/blogsLayout.json`);
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     const fallbackRes = await fetch(`${apiUrl}en/blogsLayout.json`, {
//       cache: "no-store", // Ensures no caching for the fallback as well
//     });
//     const data = await fallbackRes.json();
//     return data;
//   }
// }

// type CountryNames = {
//   [locale: string]: string; // Each locale key maps directly to the country name
// };

// async function fetchCountryData(locale: string): Promise<string> {
//   const country = cookies().get("country")?.value || "in";
//   console.log("countryname", country);

//   try {
//     const res = await fetch(`${countryUrl}${country}.json`);
//     const countryData: CountryNames = await res.json();

//     // Return the country name for the provided locale
//     return countryData[locale] || countryData["en"]; // Fallback to English if the locale isn't available
//   } catch (error) {
//     const fallbackRes = await fetch(`${countryUrl}in.json`);
//     const fallbackData: CountryNames = await fallbackRes.json();

//     // Handle fallback case, also fallback to English if locale not available
//     return fallbackData[locale] || fallbackData["en"];
//   }
// }

// // Dynamically generate metadata using the fetched SEO data
// export async function generateMetadata({
//   params: { locale },
// }: Props): Promise<Metadata> {
//   // Fallback to "en" if the locale isn't supported
//   if (!locales.includes(locale as any)) {
//     locale = "en";
//   }

//   const countryName = await fetchCountryData(locale);

//   const blogsLayoutData = await fetchblogsLayoutData(locale);

//   if (!blogsLayoutData && !countryName) {
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

//   const seoData = blogsLayoutData?.blogsLayout[0]?.blogsLayoutSeoData;

//   return {
//     title: `${seoData?.title} - ${countryName} `,
//     description: seoData?.description,
//     viewport: "width=device-width, initial-scale=1",
//     alternates: {
//       canonical: `https://nessco-two.vercel.app/${countryName}/${locale}`,
//     },
//     openGraph: {
//       type: "website",
//       title: seoData?.openGraph?.title,
//       siteName: "Nessco Industries",
//       url: `https://nessco-two.vercel.app/${countryName}/${locale}`,
//       description: seoData?.openGraph?.description,
//       images: seoData?.openGraph?.images,
//     },
//     twitter: {
//       card: "summary_large_image",
//       site: "@NesscoIndia",
//       title: seoData?.twitter?.title,
//       description: seoData?.twitter?.description,
//       images: seoData?.twitter?.image,
//     },
//     robots: {
//       index: true,
//       follow: true,
//     },
//   };
// }

// // Home component rendering the MainLayout with fetched data
// export default async function about({ params: { locale,id } }: Props) {
//   // Set default locale if not in supported list
//   if (!locales.includes(locale as any)) {
//     locale = "en"; // Fallback to English
//   }

//   // Set the locale for the request
//   unstable_setRequestLocale(locale);

//   // Fetch home data based on the locale
//   const blogsLayoutData = await fetchblogsLayoutData(locale);

//   // Fetch translations based on the locale
//   const t = await getTranslations({ locale });

//   if (!blogsLayoutData) {
//     return <p>{t("failedToLoadData")}</p>;
//   }

//   return (
//     <main>
//       <BlogGeneric id={id} />
//     </main>
//   );
// }
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import BlogGeneric from "@/components/StaticBlogs/Blog/BlogGeneric";
import { blogPosts } from "@/components/StaticBlogs/data/data2";
import { getBaseUrl } from "@/app/api/environment";

const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string; country: string; id: string };
};

export const revalidate = 60;

type CountryNames = {
  [locale: string]: string;
};

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  console.log("countryname", country);

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

function formatString(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function getDescription(content: any): string {
  if (typeof content === "string") {
    return content.slice(0, 160);
  }
  if (typeof content === "object" && content !== null) {
    if (typeof content.content === "string") {
      return content.content.slice(0, 160);
    }
    if (
      Array.isArray(content) &&
      content.length > 0 &&
      typeof content[0] === "string"
    ) {
      return content[0].slice(0, 160);
    }
  }
  return "";
}

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();

  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  const countryName = await fetchCountryData(locale);
  const post = blogPosts.find(
    (p) => formatString(p?.slug) === formatString(id)
  );

  if (!countryName || !post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      openGraph: {
        type: "website",
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
        images: [
          {
            url: "/default-image.webp",
            alt: "Default Image Alt",
          },
        ],
      },
      robots: "noindex, nofollow",
      alternates: {
        canonical: `${baseUrl}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@NesscoIndia",
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      },
    };
  }

  const description = post.excerpt || getDescription(post.content[0]);
  return {
    title: `${post.title} - ${countryName}`,
    description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      siteName: "Nessco Industries",
      url: `${baseUrl}`,
      description,
      images: [
        {
          url: post.header?.headingImage || "",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author?.name || ""],
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: post.title,
      description,
      images: [post.header?.headingImage || ""],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPost({ params: { locale, id } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale });

  const post = blogPosts.find(
    (p) => formatString(p?.slug) === formatString(id)
  );

  if (!post) {
    return <p>{t("blogPostNotFound")}</p>;
  }

  return (
    <main>
      <BlogGeneric id={id} />
    </main>
  );
}
