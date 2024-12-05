"use client";

import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import Link from "next/link";

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

  const navRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveLink(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveLink(-1);
  }, []);

  const handleClick = (ref: React.RefObject<HTMLDivElement>) => () => {
    const yOffset = -100;
    const element = ref.current;

    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = navItems.findIndex(
            (item) => item.ref.current === entry.target
          );
          setActiveLink(index);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0,
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
  }, []);

  useEffect(() => {
    if (activeLink !== -1 && mobileNavRef.current && navItemRefs.current[activeLink]) {
      const container = mobileNavRef.current;
      const activeItem = navItemRefs.current[activeLink];
      
      if (activeItem) {
        const containerRect = container.getBoundingClientRect();
        const activeItemRect = activeItem.getBoundingClientRect();

        const isItemVisible = (
          activeItemRect.left >= containerRect.left &&
          activeItemRect.right <= containerRect.right
        );

        if (!isItemVisible) {
          const scrollLeft = activeItemRect.left - containerRect.left - (containerRect.width - activeItemRect.width) / 2;
          container.scrollTo({
            left: container.scrollLeft + scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeLink]);

  return (
    <div
      ref={navRef}
      className={`sticky  lg:mt-0 mt-10 top-[3.3rem] z-40 transition-all duration-300 ${
        scrolling
          ? "bg-white"
          : type === "product"
          ? "bg-white border-none"
          : "bg-[#f2f2f2] border-none"
      }`}
    >
      {/* Mobile Navigation */}
      <div ref={mobileNavRef} className="md:hidden overflow-x-auto px-4 py-1 scrollbar-hide">
        <nav className="w-full">
          <ul className="flex space-x-4 pb-2 min-w-max">
            {navItems.map((item, index) => (
              <li 
                key={index}
                ref={(el) => {
                  navItemRefs.current[index] = el;
                }}
              >
                <button
                  className={`flex items-center justify-center w-auto h-auto px-2 py-[0.15rem] rounded-full text-sm font-medium ${
                    activeLink === index
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => {
                    handleClick(item.ref)();
                    setActiveLink(index);
                  }}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={`hidden ${
          scrolling ? "border-t-2" : "border-none"
        } md:flex flex-row flex-wrap text-base z-[99] lg:h-10 font-light font-poppins px-12 lg:mt-0 sticky space-x-2 sm:space-x-6 text-black`}
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

