"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { locales } from "@/i18n";

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".locale-switcher")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);
  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      const country = Array.isArray(params.country) ? params.country[0] : params.country;
      const currentLocale = Array.isArray(params.locale) ? params.locale[0] : params.locale;
  
      // Split the pathname into segments
      let pathSegments = pathname.split("/").filter(Boolean);
  
      // Ensure we correctly replace the locale part of the URL
      if (pathSegments[0] === currentLocale) {
        pathSegments[0] = nextLocale;
      } else if (pathSegments[1] === currentLocale) {
        pathSegments[1] = nextLocale;
      }
  
      // Rebuild the new path ensuring correct country and language placement
      const newUrl = `/${country}/${nextLocale}/${pathSegments.slice(2).join("/")}`;
  
      router.replace(newUrl);
    });
  
    setIsOpen(false);
  };
  
  const filteredLocales = locales.filter((loc) =>
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="locale-switcher relative inline-block text-left">
      <button
        type="button"
        className={`inline-flex items-center justify-between w-full rounded-full px-4 py-1 bg-white text-sm font-medium text-gray-700 border border-gray-200 ${
          isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className="mr-2 text-xl" aria-hidden="true">
            🌐
          </span>
          <span className="font-semibold">{locale.toUpperCase()}</span>
        </span>
        <svg
          className={`ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-3xl bg-white border border-gray-200 focus:outline-none overflow-hidden transition-all duration-200 ease-in-out transform origin-top-right"
          style={{ animation: "fadeInScale 0.2s ease-out forwards" }}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="p-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out"
                  placeholder="search language"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label={t("searchLanguages")}
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar">
              {filteredLocales.map((cur) => (
                <button
                  key={cur}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
                    cur === locale
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  role="menuitem"
                  onClick={() => onSelectChange(cur)}
                >
                  <span>{cur.toUpperCase()}</span>
                  {cur === locale && (
                    <span className="text-blue-500">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}
