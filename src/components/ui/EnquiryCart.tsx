"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@/app/[country]/[locale]/context/FormContext";
import { toast } from "react-hot-toast";
import { EnquiryItem } from "@/hooks/useEnquiryCart";
import FormFields, { FormValues } from "../Contact/FormFileds";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { submitForm } = useForm();

  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });

  useEffect(() => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      setCartItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    const newItems = [
      ...cartItems,
      ...items.filter(
        (item) => !cartItems.some((cartItem) => cartItem.id === item.id)
      ),
    ];
    setCartItems(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      startCloseTimer();
    }
  };

  const startCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 10000);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isOpen) {
      startCloseTimer();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        position: "top-right",
      });
      setIsModalOpen(false);
      clearCart();
      setFormValues({ fullname: "", email: "", mobilenumber: "" });
    } catch (error) {
      console.error("Failed to submit the enquiry:", error);
      toast.error("Error submitting the enquiry. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {cartItems.length > 0 && (
        <div
          ref={cartRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fixed left-4 z-50 transition-all duration-300 ${
            isOpen ? "bottom-0 w-auto max-w-[90vw]" : "bottom-32 w-16 h-16"
          }`}
        >
          {!isOpen ? (
            <button
              onClick={toggleCart}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors"
              aria-label="Open enquiry cart"
            >
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartItems.length}
              </span>
            </button>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="bg-white border-b p-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-gray-700">
                    Enquiry Cart
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({cartItems.length}/{maxItems})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={openModal}
                    size="sm"
                    variant="destructive"
                    className="text-xs px-2 py-1 h-auto"
                  >
                    Enquire Now
                  </Button>
                  <button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Clear cart"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={toggleCart}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close cart"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="p-2 overflow-x-auto">
                <div className="flex gap-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex items-center bg-white border rounded-md p-2 w-[260px] hover:bg-gray-50 transition-colors duration-200"
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
            </div>
          )}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <div className="bg-gray-50 rounded-2xl p-4">
            <DialogHeader>
              <DialogTitle className="h-12 text-xl font-semibold w-full text-center">
                Enquire Items
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className=" pr-4">
                <div className="border-2 space-y-4 max-h-[50vh] overflow-y-auto rounded-xl p-4 custom-scrollbar-container">
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
                <FormFields onChange={setFormValues} values={formValues} />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="send message"
                  className="border-2 py-[0.5rem] px-[0.5rem] text-[0.8rem] rounded-[0.5rem] bg-[#483d73] text-white w-full mt-[1.8vh]"
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
