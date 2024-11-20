"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EnquiryItem = {
  id: string;
  name: string;
  image: string;
};

type EnquiryCartProps = {
  items: EnquiryItem[];
  onRemoveItem: (id: string) => void;
  maxItems?: number;
};

export default function Component({
  items,
  onRemoveItem,
  maxItems = 10,
}: EnquiryCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleCart = () => setIsOpen(!isOpen);
  const clearCart = () => items.forEach((item) => onRemoveItem(item.id));
  const openModal = () => setIsModalOpen(true);

  // If there are no items, don't render anything
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div
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
              {items.length}
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
                  ({items.length}/{maxItems})
                </span>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <>
                    <Button
                      onClick={openModal}
                      size="sm"
                      variant="destructive"
                      className="text-xs px-2 py-1 h-auto"
                    >
                      Contact Supplier
                    </Button>
                    <button
                      onClick={clearCart}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      aria-label="Clear cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
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
                {items.map((item) => (
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
                      onClick={() => onRemoveItem(item.id)}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <div className="bg-gray-50 rounded-2xl p-4">
            <DialogHeader>
              <DialogTitle>Contact Supplier</DialogTitle>
              <DialogDescription>
                Fill out the form to contact the supplier about the items in
                your cart.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                <h4 className="font-semibold text-sm">Enquiry Items:</h4>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 border-b pb-2"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message to the supplier"
                    className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Enquiry
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
