"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { locales, LnaguageSwitcherlocales } from "@/i18n";

const getFullLanguageName = (code: string) => {
  const fullName = LnaguageSwitcherlocales.find((loc) =>
    loc.startsWith(code + "-")
  );
  return fullName ? fullName.split("-")[1] : code.toUpperCase();
};

export default function LocaleSwitcher({
  type = "default",
}: {
  type?: "default" | "footer";
}) {
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
      const country = Array.isArray(params.country)
        ? params.country[0]
        : params.country;
      const currentLocale = Array.isArray(params.locale)
        ? params.locale[0]
        : params.locale;

      const pathSegments = pathname.split("/").filter(Boolean);

      if (pathSegments[0] === currentLocale) {
        pathSegments[0] = nextLocale;
      } else if (pathSegments[1] === currentLocale) {
        pathSegments[1] = nextLocale;
      }

      const newUrl = `/${country}/${nextLocale}/${pathSegments
        .slice(2)
        .join("/")}`;

      router.replace(newUrl);
    });

    setIsOpen(false);
  };

  const filteredLocales = locales.filter((loc) =>
    getFullLanguageName(loc).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`locale-switcher relative inline-block text-left ${
        type === "footer" ? "footer-switcher" : ""
      }`}
    >
      <button
        type="button"
        className={`switcher-button type === "footer" ? "footer-dropdown" : "" ${isPending ? "pending" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className="globe-icon" aria-hidden="true">
            🌐
          </span>
          <span className="locale-text">{locale.toUpperCase()}</span>
        </span>
        <svg
          className={`arrow-icon ${isOpen ? "open" : ""}`}
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
          className={`dropdown-menu ${
            type === "footer" ? "footer-dropdown" : ""
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="dropdown-content">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="search your language"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t("searchLanguages")}
              />
              <svg
                className="search-icon"
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
            <div className="locales-grid">
              {filteredLocales.map((cur) => (
                <button
                  key={cur}
                  className={`locale-option ${cur === locale ? "active" : ""}`}
                  role="menuitem"
                  onClick={() => onSelectChange(cur)}
                >
                  <span>{getFullLanguageName(cur)}</span>
                  {cur === locale && (
                    <span className="check-icon">
                      <svg
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
        .locale-switcher {
          font-family: "Georgia", serif;
        }
        .footer-switcher .dropdown-menu {
          bottom: 100%;
          top: auto;
          margin-bottom: 8px;
        }
        .switcher-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 110px;
          padding: 2px 14px;
          background-color: #f8f8f8;
          border: 2px solid #d1d1d1;
          border-radius: 24px;
          font-size: 14px;
          color: #333;
          transition: all 0.3s ease;
        }
        .switcher-button-footer {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 110px;
          padding: 2px 14px;
          background-color: #f8f8f8;
          border: 2px solid #d1d1d1;
          border-radius: 24px;
          font-size: 14px;
          color: #333;
          transition: all 0.3s ease;
        }

        .switcher-button:hover {
          background-color: #e8e8e8;
          border-color: #b1b1b1;
        }

        .switcher-button.pending {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .globe-icon {
          font-size: 18px;
          margin-right: 8px;
        }

        .locale-text {
          font-weight: 600;
        }

        .arrow-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .arrow-icon.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          margin-top: 8px;
          width: 300px;
          background-color: #ffffff;
          border: 2px solid #d1d1d1;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 10;
          animation: fadeInScale 0.2s ease-out forwards;
        }

        .footer-dropdown {
          bottom: 100%;
          top: auto;
          margin-bottom: 8px;
          left: 30%;
          margin-top: 0;
        }

        .dropdown-content {
          padding: 16px;
        }

        .search-container {
          position: relative;
          margin-bottom: 16px;
        }

        .search-input {
          width: 100%;
          padding: 8px 32px 8px 12px;
          border: 1px solid #d1d1d1;
          border-radius: 20px;
          font-size: 14px;
          color: #333;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #007bff;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #888;
        }

        .locales-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          max-height: 200px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .locales-grid::-webkit-scrollbar {
          width: 8px;
        }

        .locales-grid::-webkit-scrollbar-track {
          background: #f8f8f8;
          border-radius: 10px;
        }

        .locales-grid::-webkit-scrollbar-thumb {
          background-color: #007bff;
          border-radius: 10px;
          border: 2px solid #f8f8f8;
        }

        .locales-grid::-webkit-scrollbar-thumb:hover {
          background-color: #0056b3;
        }

        .locales-grid {
          scrollbar-width: thin;
          scrollbar-color: #007bff #f8f8f8;
        }

        .locale-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 8px 12px;
          background-color: #f8f8f8;
          border: 1px solid #e1e1e1;
          border-radius: 12px;
          font-size: 14px;
          color: #333;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .locale-option:hover {
          background-color: #007bff;
          color: #ffffff;
          border-color: #007bff;
        }

        .locale-option.active {
          background-color: #007bff;
          color: #ffffff;
          border-color: #007bff;
        }

        .check-icon {
          width: 16px;
          height: 16px;
          color: #ffffff;
        }

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
      `}</style>
    </div>
  );
}
