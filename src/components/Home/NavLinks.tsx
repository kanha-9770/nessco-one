"use client";
import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkProps {
  text: string;
  index: number;
  activeLink: number;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = memo(
  ({
    text,
    index,
    activeLink,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  }) => (
    <Link
      href="#"
      scroll={false}
      className={`text-black text-base font-light flex-flex-row py-1 ${
        activeLink === index ? "border-b-2 border-red-600 text-[#f2f2f2]" : ""
      }`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {text}
    </Link>
  )
);

NavLink.displayName = "NavLink";

interface NavLinksDemoProps {
  type?: string;
  navItems: { text: string; ref: React.RefObject<HTMLDivElement> }[];
}

const NavLinksDemo: React.FC<NavLinksDemoProps> = ({ type, navItems }) => {
  const [activeLink, setActiveLink] = useState<number>(-1);
  const [scrolling, setScrolling] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [activeLinkText, setActiveLinkText] = useState<string>("Overview");

  const navRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveLink(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveLink(-1);
  }, []);

  const handleClick = (ref: React.RefObject<HTMLDivElement>) => () => {
    const yOffset = -100; // Adjust this value to your desired offset
    const element = ref.current;

    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setMenuExpanded(false); // Collapse the menu on any section click
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = navItems.findIndex(
            (item) => item.ref.current === entry.target
          );
          setActiveLink(index);
          setActiveLinkText(navItems[index].text);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    navItems.forEach((item) => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    });

    return () => {
      navItems.forEach((item) => {
        if (item.ref.current) {
          observer.unobserve(item.ref.current);
        }
      });
    };
  }, [navItems]);

  useEffect(() => {
    const handleScroll = () => {
      const navTop = navRef.current?.getBoundingClientRect().top || 0;
      if (navTop <= 56) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolling]);

  const toggleMenu = () => {
    setMenuExpanded((prev) => !prev);
  };

  return (
    <div
      ref={navRef}
      className={`sticky top-14 z-40 transition-all duration-300 ${
        scrolling
          ? "bg-white"
          : type === "product"
          ? "bg-white border-none"
          : "bg-[#f2f2f2] border-none"
      }`}
    >
      <div className="flex justify-between mt-4 items-center px-2 py-2 md:hidden">
        <button
          onClick={toggleMenu}
          className="text-black px-2 text-sm font-bold"
        >
          {menuExpanded ? `${activeLinkText} ▲` : `${activeLinkText} ▼`}
        </button>
      </div>

      <AnimatePresence>
        {menuExpanded && (
          <motion.div
            initial={{ y: "0", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "0", opacity: 0 }}
            transition={{ duration: 0, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#f2f2f2] rouded-3xl flex flex-col items-start h-[45vh] w-full px-6 py-4 md:hidden"
          >
            <nav className="w-full">
              <button
                onClick={toggleMenu}
                className="text-black text-sm font-bold mb-4"
              >
                {activeLinkText} ▲
              </button>
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className="mb-4">
                    <NavLink
                      text={item.text}
                      index={index}
                      activeLink={activeLink}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      handleClick={handleClick(item.ref)}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <nav
        className={`hidden ${
          scrolling ? "border-t-2" : "border-none"
        } md:flex  flex-row flex-wrap text-base  z-[99] lg:h-10 font-light font-poppins px-20 lg:mt-0 sticky  space-x-2 sm:space-x-6 text-black `}
      >
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            text={item.text}
            index={index}
            activeLink={activeLink}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick(item.ref)}
          />
        ))}
      </nav>
    </div>
  );
};

export default NavLinksDemo;
