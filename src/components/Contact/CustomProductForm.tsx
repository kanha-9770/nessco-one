"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FormProvider,
  useForm,
} from "@/app/[country]/[locale]/context/FormContext";
import { toast, Toaster } from "react-hot-toast";
import SubmitButton from "./Submit";
import { RelatedProductType } from "../Products/types/constant";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import FormFields, { FormValues } from "./FormFileds";

interface SignupFormDemoProductProps {
  related_product: RelatedProductType;
  name?:string;
  image?:string;
  mimage?:string;
  product_heading?:string

}

const SignupFormDemoProduct: React.FC<SignupFormDemoProductProps> = ({
  related_product,
  product_heading
}) => {

  const [expanded, setExpanded] = useState(false);
  const { submitForm } = useForm();

  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (formId: string) => {
    setIsSubmitting(true);
    try {
      await submitForm({ ...formValues, formId });
      toast.success("Form submitted successfully!", {
        duration: 3000,
        position: "top-right",
      });
      setFormValues({ fullname: "", email: "", mobilenumber: "" });
      setIsDialogOpen(false);
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
  function formatString(input) {
    return input.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <FormProvider>
      <motion.div
        className="flex w-full lg:sticky lg:top-[6.4rem] h-full mx-auto justify-center font-poppins"
        animate={{ y: 0, height: "33rem", opacity: 1 }}
      >
        <Toaster />
        <div className="w-full lg:h-screen h-max gap-2 flex flex-col">
          {/* part-one-contact-page */}
          <div className="w-full lg:h-[29.2vh] bg-white p-4 rounded-xl shadow-md">
            <FormFields
              onChange={setFormValues}
              values={formValues}
              inline={true}
            />
            <div className="w-full flex justify-center mt-4">
              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={() => handleSubmit("SignupFormDemoProduct")}
              />
            </div>
          </div>

          <div className="w-full flex lg:h-[10vh] bg-white rounded-xl p-4 items-center font-poppins shadow-md">
            <div className="w-[80%] flex flex-col items-start justify-center">
              <h2 className="font-semibold text-gray-700">
                <span className="text-gray-400">Download</span> Brochure
              </h2>
              <p className="text-black font-semibold text-sm">
                <span className="text-gray-700 font-regular">
                  Nessco {product_heading}
                </span>{" "}
                Catalogue
              </p>
            </div>
            <div className="w-[20%] font-poppins flex items-center justify-center">
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-transparent hover:bg-transparent"
              >
                <svg
                  viewBox="-0.4 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 12V19M12 19L9.75 16.6667M12 19L14.25 16.6667M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                      stroke="currentColor"
                      className="stroke-[#483d73]"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>{" "}
              </Button>
            </div>
          </div>

          <div className="h-[41vh] bg-white p-4 font-regular rounded-xl hidden lg:block shadow-md">
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
                    <Link
                      href={`/${countryCODE}/${languageCODE}/products/${formatString(
                        product?.h1
                      )}`}
                      key={index}
                      className="flex border-b-[2px] items-start mb-4 hover:bg-gray-50 transition-colors duration-200 p-2 rounded-md"
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
                        <h3 className="font-semibold text-sm">{product?.h1}</h3>
                        <p className="text-xs text-gray-600">
                          {product.information}
                        </p>
                      </div>

                      <div className="ml-2">
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={() => setExpanded(!expanded)}
                variant="ghost"
                size="sm"
                className="-mt-4"
              >
                {expanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row"
              >
                <div className="w-full sm:w-1/2 relative h-[200px] sm:h-auto overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Brochure preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="w-full sm:w-1/2 p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">
                      Download Brochure
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                      Fill in your details to receive the Nessco Paper Cup
                      Machine Catalogue.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit("DownloadBrochure");
                    }}
                    className="space-y-4 mt-4"
                  >
                    <FormFields
                      onChange={setFormValues}
                      values={formValues}
                      inline={false}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
                    >
                      {isSubmitting ? "Submitting..." : "Download Brochure"}
                    </Button>
                  </form>
                </div>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="absolute top-2 right-2 rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </DialogClose>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export { SignupFormDemoProduct };
