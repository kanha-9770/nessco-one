// FooterLayout.tsx (Server-Side Fetching in Next.js App Router)
import FooterNew from "./FooterNews";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"; // For translations
import { Metadata } from "next"; // Importing metadata if needed

// Revalidate every 60 seconds
export const revalidate = 60;

// Supported locales
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;

// Function to fetch footer data based on locale
async function fetchFooterData(locale: string) {
  const apiUrl = `https://jsondatafromhostingertosheet.nesscoindustries.com/${locale}/footer.json`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" }); // Ensures fresh data fetch
    const data = await response.json();
    return data.Footer[0].footerContent; // Return relevant footer content
  } catch (error) {
    console.error("Failed to fetch footer data:", error);

    // Fallback to English if fetching with specified locale fails
    try {
      const fallbackResponse = await fetch(
        "https://jsondatafromhostingertosheet.nesscoindustries.com/en/footer.json",
        { cache: "no-store" }
      );
      const fallbackData = await fallbackResponse.json();
      return fallbackData.Footer[0].footerContent;
    } catch (fallbackError) {
      console.error("Failed to fetch fallback footer data:", fallbackError);
      return null;
    }
  }
}

type Props = {
  params: { locale: string };
};

// FooterLayout component with SSR and localization support
export default async function FooterLayout({ params: { locale } }: Props) {
  // Validate locale, default to "en" if unsupported
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch footer data based on the locale
  const footerData = await fetchFooterData(locale);

  // Fetch translations based on the locale
  const t = await getTranslations({ locale });

  // Handle case where data fetching fails
  if (!footerData) {
    return <div>{t("failedToLoadFooterData")}</div>; // Translated error message
  }

  return (
    <div>
      <FooterNew footerData={footerData} />
    </div>
  );
}
