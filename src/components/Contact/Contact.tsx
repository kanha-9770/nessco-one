"use client"

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { FormProvider } from "@/app/[country]/[locale]/context/FormContext";

const SignupFormDemo = dynamic(() => import("./SignupFormDemo"));



export default function ContactForm() {
  const [isContactFormVisible, setContactFormVisible] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setContactFormVisible(!isContactFormVisible);
  };

  const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
  };

  return (
    <FormProvider>
      <div>
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleClick}
        >
          Enquire
        </Button>
        <AnimatePresence>
          {isContactFormVisible && (
            <motion.div
              ref={contactRef}
              className="fixed top-14 rounded-xl right-0 z-50  mt-0 w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] bg-white overflow-hidden"
              initial={{ y: "-100%", height: 0, opacity: 0 }}
              animate={{ y: 0, height: "35rem", opacity: 1 }}
              exit={{ y: "-100%", height: 0, opacity: 0 }}
              transition={transition}
            >
              <div className="flex justify-between items-center p-4">
                <h2 className="font-montserrat text-xl text-neutral-800 dark:text-neutral-200">
                  GET IN TOUCH WITH US
                </h2>
                <button
                  onClick={() => setContactFormVisible(false)}
                  aria-label="Close contact form"
                  className="text-gray-600 hover:text-gray-800"
                >
                  X
                </button>
              </div>

              {/* Signup Form with Context */}
              <SignupFormDemo formId="HomePage/Enquire"/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FormProvider>
  );
}