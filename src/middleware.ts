// import { NextResponse, NextRequest } from "next/server";

// // List of valid ISO country codes (ISO 3166-1 alpha-2)
// const validCountryISOs = ["us", "in", "fr", "nl", "de", "es", "ta"]; // Add more as needed
// const validLocales = ["en", "fr", "nl", "de", "es", "ta"]; // Supported locales
// const defaultLocale = "en"; // Fallback language

// // Function to fetch user location based on IP address using ipinfo.io
// async function fetchUserLocation() {
//   try {
//     const res = await fetch(`https://ipinfo.io/json`);
//     if (!res.ok) throw new Error("Failed to fetch location data for IP.");
//     const data = await res.json();
//     return {
//       country: data.country?.toLowerCase() || "us", // Default to 'us' if country is unavailable
//       language: "en", // Default to 'en' as ipinfo.io does not provide language info
//     };
//   } catch (error) {
//     console.error("Error fetching user location:", error);
//     return { country: "us", language: "en" }; // Default fallback
//   }
// }

// // Middleware logic to handle redirection and validation
// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const pathParts = pathname.split("/").filter(Boolean); // Split the path and remove empty parts

//   // Extract country ISO and language code from the path
//   const userCountryISO = pathParts[0]?.toLowerCase(); // First part is country
//   const userLanguage = pathParts[1]?.toLowerCase(); // Second part is language

//   // Check if the country and language are valid
//   const isCountryValid = validCountryISOs.includes(userCountryISO);
//   const isLanguageValid = validLocales.includes(userLanguage);

//   // If the country is invalid, redirect to the detected country
//   if (!isCountryValid) {
//     const userLocation = await fetchUserLocation(); // Fetch user's actual location based on IP
//     const detectedCountry = userLocation.country;
//     const detectedLanguage = userLanguage || defaultLocale; // Use existing or fallback language

//     // Construct new URL with detected country and preserve other parts
//     const url = req.nextUrl.clone();
//     url.pathname = `/${detectedCountry}/${detectedLanguage}/${pathParts.slice(2).join("/")}`;

//     return NextResponse.redirect(url); // Redirect to valid URL
//   }

//   // If the country and language are valid, proceed
//   if (isCountryValid && isLanguageValid) {
//     return NextResponse.next(); // No redirection needed
//   }

//   // If only the language is invalid, fallback to the default language
//   const validCountry = isCountryValid ? userCountryISO : validCountryISOs[0]; // Fallback country if needed
//   const validLanguage = isLanguageValid ? userLanguage : defaultLocale; // Fallback language if needed

//   // Construct a valid URL if redirection is required
//   const url = req.nextUrl.clone();
//   url.pathname = `/${validCountry}/${validLanguage}/${pathParts.slice(2).join("/")}`;

//   return NextResponse.redirect(url); // Redirect to the corrected URL
// }

// // Define the matcher for the middleware to run only on specific routes
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api).*)", // Exclude static assets, image optimization, favicon, and API routes
//   ],
// };
import { NextResponse} from "next/server";



// // Function to fetch user location based on client IP address
// async function fetchUserLocation(req: NextRequest) {
//   try {
//     console.log("Fetching client IP address...");
//     // Attempt to get the client's IP address from request headers
//     const clientIP =
//       req.headers.get("x-forwarded-for")?.split(",")[0] ||
//       req.headers.get("x-real-ip");
//     if (!clientIP) {
//       throw new Error("Unable to detect client IP address.");
//     }
//     console.log("Detected client IP address:", clientIP);
//     // Fetch location data based on the detected client IP address
//     const res = await fetch(`https://ipinfo.io/json`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch location data for client IP.");
//     }
//     const data = await res.json();
//     console.log("Location data received:", data);

//     return {
//       country: data.country?.toLowerCase() || "us", // Default to 'us' if country is unavailable
//       language: "en", // Default to 'en' (ipinfo.io doesn't provide language info)
//     };
//   } catch (error) {
//     console.error("Error fetching user location:", error);
//     // Default to a fallback country and language in case of an error
//     return { country: "us", language: "en" };
//   }
// }

// // Middleware logic to handle redirection and validation
// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   console.log("Current path:", pathname);

//   const pathParts = pathname.split("/").filter(Boolean); // Get all parts of the path
//   const userCountryISO = pathParts[0]?.toLowerCase(); // First part is country
//   const userLanguage = pathParts[1]?.toLowerCase(); // Second part is language

//   console.log("User country ISO from URL:", userCountryISO);
//   console.log("User language from URL:", userLanguage);

//   // Check if the country and language are valid
//   const isCountryValid = validCountryISOs.includes(userCountryISO);
//   const isLanguageValid = validLocales.includes(userLanguage);

//   if (isCountryValid && isLanguageValid) {
//     console.log("Valid country and language, proceeding...");
//     return NextResponse.next(); // No redirection needed
//   }

//   // Fetch the user's actual location (country and language) based on IP
//   const userLocation = await fetchUserLocation(req);
//   const { country: detectedCountry } = userLocation;

//   // Get browser's preferred language from accept-language header
//   const browserLanguage = getBrowserLanguage(req);

//   console.log("Detected user country:", detectedCountry);
//   console.log("Browser language:", browserLanguage);

//   // If the user is already on the correct URL, don't redirect
//   if (userCountryISO === detectedCountry && userLanguage === browserLanguage) {
//     console.log("User is already on the correct URL, proceeding...");
//     return NextResponse.next(); // No redirection needed
//   }

//   // Construct the new valid URL using detected country and browser language
//   const url = req.nextUrl.clone();
//   url.pathname = `/${detectedCountry}/${browserLanguage}${pathname.replace(
//     `/${userCountryISO}/${userLanguage}/`,
//     ""
//   )}`;
//   return NextResponse.redirect(url);
// }

// // Define the matcher for the middleware to run only on specific routes
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api).*)", // Exclude static assets, image optimization, favicon, and API routes
//   ],
// };

// // Helper function to get the browser language from the 'accept-language' header
// function getBrowserLanguage(req: NextRequest) {
//   const acceptLanguageHeader = req.headers.get("accept-language");
//   if (!acceptLanguageHeader) return defaultLocale;

//   // Extract the first preferred language from the 'accept-language' header
//   const browserLanguage = acceptLanguageHeader.split(",")[0]?.split("-")[0]; // Just the language code
//   console.log("Browser language detected:", browserLanguage);

//   return validLocales.includes(browserLanguage)
//     ? browserLanguage
//     : defaultLocale;
// }
// // List of valid ISO country codes and locales
// const validLocales = ["en", "fr", "nl", "de", "es", "ta", "hi"];
// const defaultLocale = "en";
// Function to fetch user location based on client IP address using ipwhois.app
// Detect initial language from `accept-language` header
function getInitialLanguage(req) {
  const acceptLanguageHeader = req.headers.get("accept-language");
  if (!acceptLanguageHeader) return defaultLocale;
  const browserLanguage = acceptLanguageHeader.split(",")[0]?.split("-")[0];
  return validLocales.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

// Set cookies for language and country
function setCookie(name, value, options) {
  const { res, path = "/" } = options;
  res.cookies.set(name, value, { path });
}

// Asynchronously fetch the user's location without blocking rendering
async function fetchUserLocationAsync(req) {
  console.log("Fetching client IP address...");
  const myip = "106.219.68.189"; // For development
  const isDevelopment = false;

  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip");
  const newClientIp = isDevelopment ? myip : clientIP;

  if (!newClientIp) {
    console.error("Unable to detect client IP address.");
    return { country: "us", language: "en" };
  }
  console.log("Detected client IP address:", newClientIp);

  const nesscoUrl = `https://countrygeoapi.nesscoindustries.com/geoip/${newClientIp}/`;
  try {
    const nesscoResponse = await fetch(nesscoUrl);
    if (nesscoResponse.ok) {
      const data = await nesscoResponse.json();
      return { country: data.country?.toLowerCase() || "us", language: "en" };
    }
  } catch (error) {
    console.error("Nessco Industries API failed:", error);
  }

  const fallbackServices = [
    `https://ipinfo.io/${newClientIp}/json/`,
    `https://ipwhois.app/json/${newClientIp}`,
  ];

  for (const service of fallbackServices) {
    try {
      const response = await fetch(service);
      if (response.ok) {
        const data = await response.json();
        return { country: data.country?.toLowerCase() || "us", language: "en" };
      }
    } catch (error) {
      console.warn(`Service ${service} failed:`, error);
    }
  }

  console.error("All IP services failed, using default location.");
  return { country: "us", language: "en" };
}

// Middleware for language-based initial load and async location fetch
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const pathParts = pathname.split("/").filter(Boolean);
  const userCountryISO = pathParts[0]?.toLowerCase();
  const userLanguage = pathParts[1]?.toLowerCase();

  const isCountryValid = ["us", "in", "ca", "uk", "au"].includes(userCountryISO); // Adjust valid countries
  const isLanguageValid = validLocales.includes(userLanguage);
  const initialLanguage = getInitialLanguage(req);

  const res = NextResponse.next();

  if (isCountryValid && isLanguageValid) {
    setCookie("country", userCountryISO, { res, path: "/" });
    setCookie("language", userLanguage, { res, path: "/" });
    return res;
  }

  setCookie("language", initialLanguage, { res, path: "/" });

  fetchUserLocationAsync(req).then((userLocation) => {
    const { country: detectedCountry } = userLocation;
    setCookie("country", detectedCountry, { res, path: "/" });

    if (detectedCountry && detectedCountry !== userCountryISO) {
      const url = req.nextUrl.clone();
      url.pathname = `/${detectedCountry}/${initialLanguage}`;
      return NextResponse.redirect(url); // Soft redirect to new URL without reloading content
    }
  });

  return res;
}

// Define the matcher for the middleware to run only on specific routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)", // Exclude static assets, image optimization, favicon, and API routes
  ],
};
const validLocales = ["en", "fr", "nl", "de", "es", "ta", "hi"];
const defaultLocale = "en";
