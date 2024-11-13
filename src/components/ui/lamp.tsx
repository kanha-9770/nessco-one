"use client";
import React from "react";
import { motion } from "framer-motion";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative flex h-full my-[7rem] flex-col items-center justify-center w-full rounded-md z-0 ${className}`}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "20rem" }}
          whileInView={{ opacity: 1, width: "50rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 top-0 h-[80rem] overflow-visible bg-gradient-conic from-[#39315f] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "20rem" }}
          whileInView={{ opacity: 1, width: "50rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 top-0 h-[80rem] bg-gradient-conic from-transparent via-transparent to-[#372e5e] text-white [--conic-position:from_290deg_at_center_top]"
        ></motion.div>
        <motion.div
          initial={{ width: "20rem" }}
          whileInView={{ width: "50rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-full bg-[#bca0dd] rounded-full shadow-[0_0_50px_10px_rgba(81,65,160,0.6)]"
        ></motion.div>
      </div>

      <div className="relative z-50 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};
