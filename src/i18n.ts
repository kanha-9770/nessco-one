import { getRequestConfig } from "next-intl/server";

export const locales = [
  "af",
  "sq",
  "am",
  "ar",
  "hy",
  "az",
  "eu",
  "be",
  "bn",
  "bs",
  "bg",
  "my",
  "ca",
  "ny",
  "zh",
  "co",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "fi",
  "fr",
  "fy",
  "gd",
  "gl",
  "ka",
  "de",
  "el",
  "gu",
  "ht",
  "ha",
  "he",
  "hi",
  "hu",
  "is",
  "ig",
  "id",
  "ga",
  "it",
  "ja",
  "jv",
  "kn",
  "kk",
  "km",
  "rw",
  "ky",
  "ko",
  "ku",
  "la",
  "lb",
  "lo",
  "lt",
  "lv",
  "mk",
  "mg",
  "ms",
  "ml",
  "mt",
  "mi",
  "mr",
  "mn",
  "ne",
  "no",
  "nb",
  "or",
  "ps",
  "fa",
  "pl",
  "pt",
  "pa",
  "ro",
  "ru",
  "sm",
  "sr",
  "sn",
  "sd",
  "si",
  "sk",
  "sl",
  "so",
  "st",
  "es",
  "su",
  "sw",
  "sv",
  "ta",
  "te",
  "tg",
  "th",
  "tk",
  "tl",
  "tr",
  "tt",
  "ug",
  "uk",
  "ur",
  "uz",
  "vi",
  "cy",
  "xh",
  "yi",
  "yo",
  "zu",
] as const;
export const LnaguageSwitcherlocales = [
  "af-Afrikaans",
  "am-አማርኛ",
  "ar-العربية",
  "az-Azərbaycan",
  "be-Беларуская",
  "bg-Български",
  "bn-বাংলা",
  "bs-Bosanski",
  "ca-Català",
  "co-Corsu",
  "cs-Čeština",
  "cy-Cymraeg",
  "da-Dansk",
  "de-Deutsch",
  "el-Ελληνικά",
  "en-English",
  "eo-Esperanto",
  "es-Español",
  "et-Eesti",
  "eu-Euskara",
  "fa-فارسی",
  "fi-Suomi",
  "fr-Français",
  "fy-Frysk",
  "ga-Gaeilge",
  "gd-Gàidhlig",
  "gl-Galego",
  "gu-ગુજરાતી",
  "ha-Hausa",
  "he-עברית",
  "hi-हिंदी",
  "hr-Hrvatski",
  "ht-Kreyòl ayisyen",
  "hu-Magyar",
  "hy-Հայերեն",
  "id-Bahasa Indonesia",
  "ig-Igbo",
  "is-Íslenska",
  "it-Italiano",
  "ja-日本語",
  "jv-ꦧꦱꦗꦮ",
  "ka-ქართული",
  "kk-Қазақша",
  "km-ភាសាខ្មែរ",
  "kn-ಕನ್ನಡ",
  "ko-한국어",
  "ku-Kurdî",
  "ky-Кыргызча",
  "lb-Lëtzebuergesch",
  "lo-ລາວ",
  "lt-Lietuvių",
  "lv-Latviešu",
  "mg-Malagasy",
  "mi-Māori",
  "mk-Македонски",
  "ml-മലയാളം",
  "mn-Монгол",
  "mr-मराठी",
  "ms-Bahasa Melayu",
  "mt-Malti",
  "my-မြန်မာစာ",
  "nb-Norsk Bokmål",
  "ne-नेपाली",
  "nl-Nederlands",
  "ny-Chichewa",
  "or-ଓଡ଼ିଆ",
  "pa-ਪੰਜਾਬੀ",
  "pl-Polski",
  "pt-Português",
  "ro-Română",
  "ru-Русский",
  "rw-Kinyarwanda",
  "sd-سنڌي",
  "si-සිංහල",
  "sk-Slovenčina",
  "sl-Slovenščina",
  "sm-Gagana Samoa",
  "sn-Shona",
  "so-Soomaali",
  "sq-Shqip",
  "sr-Српски",
  "st-Sesotho",
  "su-Basa Sunda",
  "sv-Svenska",
  "sw-Kiswahili",
  "ta-தமிழ்",
  "te-తెలుగు",
  "tg-Тоҷикӣ",
  "th-ไทย",
  "tk-Türkmen",
  "tl-Filipino",
  "tr-Türkçe",
  "tt-Татарча",
  "ug-ئۇيغۇرچە",
  "uk-Українська",
  "ur-اردو",
  "uz-Oʻzbekcha",
  "vi-Tiếng Việt",
  "xh-isiXhosa",
  "yi-ייִדיש",
  "yo-Yorùbá",
  "zh-中文",
  "zu-isiZulu",
] as const;

export default getRequestConfig(async ({ locale }) => {
  console.log("Guard is working...");

  // Define the base URL for your API
  const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";

  // If the locale isn't in the allowed list, default to English
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  try {
    // Fetch data from multiple APIs in parallel
    const [navbarRes, heroRes, footerRes] = await Promise.all([
      fetch(`${apiUrl}${locale}/navbar.json`),
      fetch(`${apiUrl}${locale}/hero.json`),
      fetch(`${apiUrl}${locale}/footer.json`),
    ]);

    // Check if all responses are successful
    if (!navbarRes.ok || !heroRes.ok || !footerRes.ok) {
      throw new Error(
        `Failed to fetch some or all resources for locale: ${locale}`
      );
    }

    // Parse the responses into JSON
    const [navbarData, heroData, footerData] = await Promise.all([
      navbarRes.json(),
      heroRes.json(),
      footerRes.json(),
    ]);

    // Log the fetched data
    console.log(`Navbar for locale ${locale}:`, navbarData);
    console.log(`Hero for locale ${locale}:`, heroData);
    console.log(`Footer for locale ${locale}:`, footerData);

    // Return the messages together as a single object
    return {
      messages: {
        navbar: navbarData,
        hero: heroData,
        footer: footerData,
      },
    };
  } catch (error) {
    console.error(`Error fetching messages for locale ${locale}:`, error);

    // Fallback to English if something goes wrong
    const [navbarFallback, heroFallback, footerFallback] = await Promise.all([
      fetch(`${apiUrl}en/navbar.json`).then((res) => res.json()),
      fetch(`${apiUrl}en/hero.json`).then((res) => res.json()),
      fetch(`${apiUrl}en/footer.json`).then((res) => res.json()),
    ]);

    // Log fallback data
    console.log(`Fallback navbar for locale en:`, navbarFallback);
    console.log(`Fallback hero for locale en:`, heroFallback);
    console.log(`Fallback footer for locale en:`, footerFallback);

    // Return fallback messages
    return {
      messages: {
        navbar: navbarFallback,
        hero: heroFallback,
        footer: footerFallback,
      },
    };
  }
});
