"use client";

import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CountrySelect from "@/components/ui/CountrySelect";
import {
  FormProvider,
  useForm as useFormContext,
} from "@/app/[country]/[locale]/context/FormContext";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const EnquiryForm = ({ formId = "HomePage/Enquire" }: { formId?: string }) => {
  const [countryCode, setCountryCode] = useState("us");
  const { submitForm } = useFormContext();
  const pathname = usePathname();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    mobilenumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Added state for dialog

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length > 1) {
      const newCountryCode = pathParts[1].toLowerCase();
      if (newCountryCode.length === 2) setCountryCode(newCountryCode);
    }
  }, [pathname, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitForm({ ...formValues, formId });
      toast.success("Form submitted successfully!", {
        duration: 3000,
        position: "top-right",
      });
      setFormValues({ fullname: "", email: "", mobilenumber: "", message: "" });
      setIsDialogOpen(false); // Close the dialog after successful submission
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

  return (
    <FormProvider>
      <div className="relative">
        <Toaster />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* Updated Dialog */}
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#483d73] to-red-700 text-white font-medium font-poppins py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
                Enquire
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-[0.5rem]">
            <div className="flex flex-col sm:flex-row bg-white">
              <div className="w-full sm:w-1/2 relative h-[200px] sm:h-auto overflow-hidden">
                <Image
                  src="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
                  alt="Decorative image"
                  layout="fill"
                  className="rounded-t-[0.5rem] object-contain p-2 sm:rounded-l-[0.5rem] sm:rounded-tr-none transform hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="w-full sm:w-1/2 px-[1.5rem] py-[1rem] bg-white rounded-[0.5rem]">
                <div className="font-poppins mb-[1rem]">
                  <h3 className="text-[1.3rem] font-semibold text-[#483d73]">
                    Get in Touch
                  </h3>
                  <p className="text-[#727272] text-[0.9rem]">
                    We'd love to hear from you!
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="font-poppins space-y-4"
                >
                  <LabelInputContainer>
                    <Label
                      htmlFor="fullname"
                      className="text-[0.8rem] font-medium text-gray-600"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullname"
                      placeholder="Tyler Durden"
                      value={formValues.fullname}
                      onChange={handleChange}
                      required
                      className="border py-[0.4rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label
                      htmlFor="email"
                      className="text-[0.8rem] font-medium text-gray-600"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tyler@fightclub.com"
                      value={formValues.email}
                      onChange={handleChange}
                      required
                      className="border py-[0.4rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label
                      htmlFor="mobilenumber"
                      className="text-[0.8rem] font-medium text-gray-600"
                    >
                      Phone Number
                    </Label>
                    <CountrySelect
                      isoCode={countryCode}
                      onPhoneNumberChange={(phoneNumber) =>
                        setFormValues((prev) => ({
                          ...prev,
                          mobilenumber: phoneNumber,
                        }))
                      }
                    />
                  </LabelInputContainer>
                  {/* <LabelInputContainer>
                    <Label htmlFor="message" className="text-[0.8rem] font-medium text-gray-600">Your Message</Label>
                    <MessageBox
                      id="message"
                      placeholder="How can we help you?"
                      value={formValues.message}
                      onChange={handleChange}
                      required
                      className="border py-[0.4rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200 resize-none h-20"
                    />
                  </LabelInputContainer> */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="send message"
                    className="w-full py-[0.6rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-gradient-to-r from-[#483d73] to-[#6a5acd] text-white font-medium hover:from-[#6a5acd] hover:to-[#483d73] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </FormProvider>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1 w-full", className)}>
    {children}
  </div>
);

export default EnquiryForm;
