"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Calendar, List } from "lucide-react";
import { blogPosts } from "../data/data2";
import { ContentBlock, ListContent, SectionContent } from "../types/blogs";
import ImageBlock from "@/components/StaticBlogs/ImageBlock";
import TableBlock from "@/components/StaticBlogs/TableBlock";
import TagList from "@/components/StaticBlogs/TagList";
import TextBlock from "@/components/StaticBlogs/TextBlock";
import ListBlock from "../ListBlock";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface BlogGenericProps {
  id?: string;
}

const BlogGeneric: React.FC<BlogGenericProps> = ({ id }) => {
  const formatString = (input: string) => {
    return input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const post = blogPosts.find(
    (p) => formatString(p?.slug) === formatString(id)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 300);

      contentRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveIndex(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContentClick = (index: number) => {
    setActiveIndex(index);
    const element = contentRefs.current[index];
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Header Image Section */}
      <div className="relative mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full relative overflow-hidden h-[50vh] bg-gradient-to-r from-blue-600 to-purple-600 rounded-b-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="w-full pt-8 pb-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/path/to/texture.png')] opacity-10 mix-blend-overlay"></div>
            <h2 className="text-white lg:text-4xl text-2xl lg:px-12 px-8 font-bold relative z-10">
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
          {post?.header?.headingImage &&
            (/\.(mp4|webm|ogg)$/i.test(post?.header?.headingImage) ? (
              <video
                className="object-cover z-50 lg:h-[25rem] h-[12rem] w-full rounded-3xl shadow-2xl"
                width={1200}
                height={600}
                autoPlay
                loop
                muted
              >
                <source src={post?.header?.headingImage} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                className="object-cover z-50 lg:h-[25rem] h-[12rem] w-full rounded-3xl shadow-2xl"
                width={1200}
                height={600}
                priority
                src={post?.header?.headingImage}
                alt={post?.slug || "Blog post header image"}
              />
            ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Table of Contents */}
          <div className="md:w-1/4">
            <Card className={`${isSticky ? "md:sticky md:top-8" : ""}`}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                  <List className="w-5 h-5 mr-2" />
                  Table of Contents
                </h3>
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-3 pr-4">
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
                              ? "bg-blue-500 scale-150"
                              : "bg-gray-300 group-hover:bg-blue-300"
                          }`}
                          initial={false}
                          animate={
                            activeIndex === idx
                              ? { scale: 1.5, backgroundColor: "#3B82F6" }
                              : { scale: 1, backgroundColor: "#D1D5DB" }
                          }
                          transition={{ duration: 0.3 }}
                        />
                        <span
                          className={`text-sm transition-all duration-300 ${
                            activeIndex === idx
                              ? "text-blue-500 font-semibold"
                              : "text-gray-600 group-hover:text-blue-400"
                          }`}
                        >
                          {block.heading ||
                            (block.type === "text"
                              ? (block?.content as string).slice(0, 30) + "..."
                              : block?.type)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="md:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="flex items-center mb-8 space-x-6"
            >
              <Image
                src={
                  post?.author?.avatar ||
                  "https://www.nesscoindia.com/Assets/images/logo.webp"
                }
                alt={post?.author?.name || "Author avatar"}
                width={64}
                height={64}
                className="rounded-full h-16 w-16 shadow-lg border-2 border-white"
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
              className="mb-8"
            >
              <TagList tags={post?.tags} />
            </motion.div>

            <div className="space-y-8">
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
                      <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                        {block?.heading}
                      </h2>
                    )}
                    {block?.image && (
                      <div className="my-8">
                        <Image
                          src={block?.image}
                          alt={block?.heading || ""}
                          width={800}
                          height={400}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    {block?.subheading && (
                      <h3 className="text-xl font-semibold text-gray-700 leading-tight">
                        {block?.subheading}
                      </h3>
                    )}
                    {renderContent(block)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.div
        className="fixed bottom-8 right-8 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <button
          onClick={() => handleContentClick(Math.max(0, activeIndex - 1))}
          className="bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-300"
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
          className="bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-300"
          aria-label="Next section"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
};

export default BlogGeneric;
