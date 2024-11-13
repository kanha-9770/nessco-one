"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { KnowledgeCenterItem } from "./types/constant";

interface KnowledgeCenterProps {
  knowledgeCenterData: KnowledgeCenterItem;
}

const SubSection: React.FC<KnowledgeCenterProps> = ({
  knowledgeCenterData,
}) => {
  const SubSection = knowledgeCenterData?.knowledgeCenter[0]?.SubSection;
  return (
    <div className="h-full w-full">
      <LampContainer>
        <motion.h1 className="mt-8 py-4 text-white text-center text-xl font-bold tracking-tight md:text-5xl">
          {SubSection.title}
        </motion.h1>
        <p className="text-[1rem] font-normal text-center w-2/3 text-white">
          {SubSection.description}
        </p>
      </LampContainer>
    </div>
  );
};
export default SubSection;
