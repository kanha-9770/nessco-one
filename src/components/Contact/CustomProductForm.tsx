"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FormProvider,
  useForm,
} from "@/app/[country]/[locale]/context/FormContext";
import { toast, Toaster } from "react-hot-toast";
import SubmitButton from "./Submit";
import FormFields, { FormValues } from "./FormFileds";
import { RelatedProductType } from "../Products/types/constant";

interface SignupFormDemoProductProps {
  related_product: RelatedProductType;
}

const SignupFormDemoProduct: React.FC<SignupFormDemoProductProps> = ({
  related_product,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { submitForm } = useForm();

  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm({ ...formValues, formId: "SignupFormDemoProduct" });
      toast.success("Form submitted successfully!", {
        duration: 3000,
        position: "top-right",
      });
      setFormValues({ fullname: "", email: "", mobilenumber: "" });
    } catch (error) {
      console.error("Failed to submit the form:", error);
      toast.error("Error submitting the form. Please try again.", {
        duration: 3000,
        position: "top-right",
        style: { borderRadius: "10px", background: "#e63946", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const relatedProducts = related_product?.imageWithDescription || [];
  useEffect(() => {
    console.log("i am custom product demo signup", relatedProducts);
  }, []);
  return (
    <FormProvider>
      <motion.div
        className="flex w-full lg:sticky lg:top-[6.4rem] h-full mx-auto justify-center font-poppins"
        animate={{ y: 0, height: "33rem", opacity: 1 }}
      >
        <Toaster />
        <div className="w-full lg:h-screen h-max gap-2 flex flex-col">
          {/* part-one-contact-page */}
          <div className="w-full lg:h-[29.2vh] bg-white p-4 rounded-xl">
            <FormFields
              onChange={setFormValues}
              values={formValues}
              inline={true}
            />
            <div className="w-full flex justify-center mt-4">
              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={handleSubmit}
              />
            </div>
          </div>

          <div className="w-full flex lg:h-[10vh] bg-white rounded-xl p-4 items-center font-poppins">
            <div className="w-[80%] flex flex-col items-start justify-center">
              <h2 className="font-semibold text-gray-700">
                <span className="text-gray-400">Download</span> Brochure
              </h2>
              <p className="text-black font-semibold text-sm">
                <span className="text-gray-700 font-regular">
                  Nessco Paper Cup Machine{" "}
                </span>{" "}
                  Catalogue
              </p>
            </div>
            <div className="w-[20%] font-poppins flex items-center justify-center">
              {/* Add download icon or button here */}
            </div>
          </div>

          <div className="h-[41vh] bg-white p-4 font-regular rounded-xl hidden lg:block">
            <h2 className="font-semibold text-gray-700 mb-2">
              <span className="text-gray-400">Related</span> Products
            </h2>

            <div
              id="scrollbar1"
              className={`w-full space-y-2 flex flex-col transition-all duration-300 ease-in-out ${
                expanded
                  ? "h-[30vh] overflow-auto scrollbar-product-description"
                  : "h-[30vh] overflow-hidden"
              }`}
            >
              <div className="p-4 w-full max-w-md">
                {relatedProducts
                  .slice(0, expanded ? relatedProducts.length : 3)
                  .map((product, index) => (
                    <div
                      key={index}
                      className="flex border-b-[2px] items-start mb-4"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <Image
                          src={product?.img}
                          alt={product?.h1}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-sm">{product.h1}</h3>
                        <p className="text-xs text-gray-600">
                          {product.information}
                        </p>
                      </div>

                      <div className="ml-2">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 12a.75.75 0 110-1.5h.008a.75.75 0 010 1.5h-.008zm6 0a.75.75 0 110-1.5h.008a.75.75 0 010 1.5h-.008zm6 0a.75.75 0 110-1.5h.008a.75.75 0 010 1.5h-.008z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 rounded-full -mt-4 bg-gray-200 hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-4 h-4 text-gray-500 transform transition-transform ${
                    expanded ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </FormProvider>
  );
};

export { SignupFormDemoProduct };
