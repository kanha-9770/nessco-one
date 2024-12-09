"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "@/app/[country]/[locale]/context/FormContext";
import { Toaster, toast } from "react-hot-toast";
import { EnquiryItem } from "@/hooks/useEnquiryCart";
import FormFields, { FormValues } from "../Contact/FormFileds";
import { formSchema } from "@/lib/ValidationSchema";

interface EnquiryComponentProps {
  items: EnquiryItem[];
  onRemoveItem: (id: string) => void;
  maxItems?: number;
}

export default function EnquiryComponent({
  items,
  onRemoveItem,
  maxItems = 10,
}: EnquiryComponentProps) {
  const [cartItems, setCartItems] = useState<EnquiryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submitForm } = useForm();

  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      setCartItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    onRemoveItem(id);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const openModal = () => setIsModalOpen(true);

  const validateForm = () => {
    try {
      formSchema.parse(formValues);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        const newErrors: Partial<FormValues> = {};
        zodError.forEach((err: { path: string[]; message: string }) => {
          newErrors[err.path[0] as keyof FormValues] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitForm({
        ...formValues,
        formId: "EnquiryCart",
        cartItems: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
        })),
      });
      toast.success("Enquiry submitted successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setIsModalOpen(false);
      clearCart();
      setFormValues({ fullname: "", email: "", mobilenumber: "" });
    } catch (error) {
      console.error("Failed to submit the enquiry:", error);
      toast.error("Error submitting the enquiry. Please try again.", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      <Toaster />
      {cartItems.length > 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="fixed left-4 bottom-32 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors z-50"
              aria-label="Open enquiry cart"
            >
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartItems.length}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[30vh] bg-white">
            <SheetHeader>
              <SheetTitle className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-gray-700">
                    Enquiry Cart
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({cartItems.length}/{maxItems})
                  </span>
                </div>
                <div className="flex items-center gap-2 pr-20 -mt-4">
                  <Button
                    onClick={openModal}
                    className="bg-gradient-to-r from-[#483d73] to-red-700 text-white font-medium font-poppins py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
                      Enquire Now{" "}
                    </span>
                  </Button>

                  <Button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Clear cart"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 overflow-x-auto custom-scrollbar">
              <div className="flex gap-2 pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex items-center bg-white border rounded-md p-2 w-[260px] hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
                  >
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="w-16 h-16 relative mr-3 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-grow pr-6">
                      <h3 className="text-xs font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                      aria-label="Remove item"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px] bg-gray-50">
          <div className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="h-12 text-xl font-semibold w-full text-center">
                Enquire Items
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="pr-4">
                <div className="border-2 space-y-4 max-h-[50vh] overflow-y-auto rounded-xl p-4 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col bg-[#f2f2f2] items-center justify-center h-44 w-full border rounded-[0.5rem] p-1"
                      >
                        <div className="text-sm font-semibold text-center mb-2">
                          {item.name}
                        </div>
                        <div className="bg-white w-full rounded-[0.5rem] h-auto">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={176}
                            height={112}
                            className="rounded-md object-cover w-full h-32"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormFields onChange={setFormValues} values={formValues} errors={errors} />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="send message"
                  className="bg-gradient-to-r from-[#483d73] to-red-700 w-full text-white font-medium font-poppins py-2 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

