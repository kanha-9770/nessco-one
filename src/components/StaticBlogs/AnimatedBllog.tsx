"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ImageBlock from "@/components/StaticBlogs/ImageBlock";
import TableBlock from "@/components/StaticBlogs/TableBlock";
import TextBlock from "@/components/StaticBlogs/TextBlock";
import { blogPosts } from "./data/data";
import { ContentBlock, ListContent, SectionContent } from "./types/blogs";
import ListBlock from "./ListBlock";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

interface AnimatedBlogPostProps {
  id?: string;
}

const AnimatedBlogPost: React.FC<AnimatedBlogPostProps> = ({ id }) => {
  const post = blogPosts.find((p) => p?.slug === id);
  console.log(id)
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  console.log(id) 

  const handleScroll = () => {
    if (rightContainerRef.current) {
      const { scrollTop } = rightContainerRef.current;
      setIsScrolled(scrollTop > 0);

      contentRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const containerRect =
            rightContainerRef.current!.getBoundingClientRect();

          if (
            rect.top <= containerRect.top &&
            rect.bottom >= containerRect.top
          ) {
            setActiveIndex(idx);
          }
        }
      });
    }
  };

  useEffect(() => {
    const container = rightContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleContentClick = (index: number) => {
    setActiveIndex(index);

    if (contentRefs.current[index] && rightContainerRef.current) {
      const selectedElement = contentRefs.current[index]!;
      const rightContainerTop =
        rightContainerRef.current.getBoundingClientRect().top;
      const selectedElementTop = selectedElement.getBoundingClientRect().top;

      const offset = selectedElementTop - rightContainerTop;

      rightContainerRef.current.scrollBy({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const renderContent = (block: ContentBlock) => {
    switch (block.type) {
      case "text":
        return <TextBlock block={block} />;
      case "image":
        return (
          <ImageBlock content={block.content as { src: string; alt: string }} />
        );
      case "table":
        return <TableBlock content={block.content as string[][]} />;
      case "list":
        return <ListBlock content={block.content as ListContent} />;
      case "section":
        const sectionContent = block.content as SectionContent;
        return (
          <div>
            {sectionContent.intro && <p>{sectionContent.intro}</p>}
            {sectionContent.blocks.map((subBlock, index) => (
              <div key={index}>{renderContent(subBlock)}</div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-poppins min-h-screen px-10 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full relative overflow-hidden h-[50vh] bg-black rounded-3xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          className="w-full pt-8 pb-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/path/to/texture.png')] opacity-10 mix-blend-overlay"></div>
          <h2 className="text-white lg:text-2xl text-lg lg:px-12 px-8 font-light relative z-10">
            {post?.title}
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="lg:px-[10%] px-[8%] -mt-52 mb-8 relative z-10"
      >
        <Image
          className="object-cover z-50 lg:h-[25rem] h-[12rem] w-full rounded-3xl shadow-2xl"
          width={1200}
          height={600}
          priority
          src={post?.header?.headingImage}
          alt={post?.slug || "Blog post header image"}
        />
      </motion.div>

      <div className="bg-white rounded-3xl min-h-screen w-full px-[4%] lg:py-20 py-12 font-light relative">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="flex items-center mb-8 space-x-6"
        >
          <Image
            src={post?.author?.avatar}
            alt={post?.author?.name || "Author avatar"}
            width={64}
            height={64}
            className="rounded-full shadow-lg border-2 border-gray-200"
          />
          <div>
            <span className="text-gray-800 font-semibold text-xl">
              {post?.author?.name}
            </span>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{post?.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post?.readingTime} min read</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <TagList tags={post?.tags} />
        </motion.div> */}

        <div className="w-full lg:h-[55rem] flex lg:space-x-12 mt-12 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="w-[28%] border-r-2 border-gray-200 lg:block hidden sticky top-8 self-start pr-4"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <List className="w-6 h-6 mr-2" />
                Table of Contents
              </h3>
            </div>
            <div className="space-y-4">
              {post?.content?.map((block, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => handleContentClick(idx)}
                  className="flex items-start cursor-pointer transition-all duration-300 ease-in-out group"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className={`h-2 w-2 rounded-full mr-2 mt-1.5 flex-shrink-0 transition-all duration-300 ${
                      activeIndex === idx
                        ? "bg-primary scale-150"
                        : "bg-gray-300 group-hover:bg-primary/60"
                    }`}
                    initial={false}
                    animate={
                      activeIndex === idx
                        ? { scale: 1.5, backgroundColor: "#3B82F6" }
                        : { scale: 1, backgroundColor: "#D1D5DB" }
                    }
                    transition={{ duration: 0.3 }}
                  />
                  <motion.h4
                    className={`text-sm transition-all duration-300 ${
                      activeIndex === idx
                        ? "text-primary font-semibold"
                        : "text-gray-500 group-hover:text-primary/80"
                    }`}
                  >
                    {block.heading ||
                      (block.type === "text"
                        ? (block?.content as string).slice(0, 30) + "..."
                        : block?.type)}
                  </motion.h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            ref={rightContainerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            className="lg:w-[72%] w-full space-y-10 lg:overflow-y-scroll scrollbar-hide lg:pr-8 lg:pb-[40rem] relative"
          >
            <AnimatePresence>
              {post?.content?.map((block, index) => (
                <motion.div
                  key={index}
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-6"
                >
                  {block?.heading && (
                    <h2 className="text-4xl font-bold mb-6 text-gray-800 leading-tight">
                      {block?.heading}
                    </h2>
                  )}
                  {block?.image && (
                    <div className="my-8">
                      <Image
                        src={block?.image}
                        alt={block?.heading}
                        width={800}
                        height={400}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  {block?.subheading && (
                    <h2 className="text-base font-regulars mb-6 text-gray-800 leading-tight">
                      {block?.subheading}
                    </h2>
                  )}
                  {renderContent(block)}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.div
          className={`fixed bottom-8 right-8 flex space-x-4 transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
        >
          <button
            onClick={() => handleContentClick(Math.max(0, activeIndex - 1))}
            className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-300"
            aria-label="Previous section"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() =>
              handleContentClick(
                Math.min((post?.content?.length || 1) - 1, activeIndex + 1)
              )
            }
            className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-300"
            aria-label="Next section"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedBlogPost;

