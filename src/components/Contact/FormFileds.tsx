"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CountrySelect from "@/components/ui/CountrySelect";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export interface FormValues {
  fullname: string;
  email: string;
  mobilenumber: string;
}

interface FormFieldsProps {
  onChange: (values: FormValues) => void;
  values: FormValues;
  inline?: boolean;
}

const FormFields: React.FC<FormFieldsProps> = ({
  onChange,
  values,
  inline = false,
}) => {
  const pathname = usePathname();
  const countryCode = pathname.split("/")[1]?.toLowerCase() || "in";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    onChange({ ...values, [id]: value });
  };

  return (
    <div className={cn("space-y-4", inline && "lg:space-y-1")}>
      <div
        className={cn(
          "space-y-4",
          inline && "lg:flex lg:space-x-0 lg:space-y-0"
        )}
      >
        <LabelInputContainer className={inline ? "lg:w-1/2" : "w-full"}>
          {!inline && (
            <Label
              htmlFor="fullname"
              className="text-[0.8rem] font-medium text-gray-600"
            >
              Full Name
            </Label>
          )}
          <Input
            id="fullname"
            placeholder="Enter your full name"
            value={values.fullname}
            onChange={handleChange}
            required
            className="border py-[0.4rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200"
          />
        </LabelInputContainer>
        <LabelInputContainer className={inline ? "lg:w-1/2" : "w-full"}>
          {!inline && (
            <Label
              htmlFor="email"
              className="text-[0.8rem] font-medium text-gray-600"
            >
              Email Address
            </Label>
          )}
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            required
            className="border py-[0.4rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-[#f9fafb] focus:ring-2 focus:ring-[#483d73] transition-all duration-200"
          />
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="w-full">
        {!inline && (
          <Label
            htmlFor="mobilenumber"
            className="text-[0.8rem] font-medium text-gray-600"
          >
            Phone Number
          </Label>
        )}
        <CountrySelect
          isoCode={countryCode}
          onPhoneNumberChange={(phoneNumber) =>
            onChange({ ...values, mobilenumber: phoneNumber })
          }
        />
      </LabelInputContainer>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1", className)}>{children}</div>
);

export default FormFields;
