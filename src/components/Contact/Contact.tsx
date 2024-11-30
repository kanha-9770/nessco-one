"use client"

import React, { useState, useEffect } from "react"
import { toast, Toaster } from "react-hot-toast"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MessageBox } from "@/components/ui/MessageBox"
import CountrySelect from "@/components/ui/CountrySelect"
import { FormProvider, useForm as useFormContext } from "@/app/[country]/[locale]/context/FormContext"
import { cn } from "@/lib/utils"

const EnquiryForm = ({ formId = "HomePage/Enquire" }: { formId?: string }) => {
  const [isFormVisible, setFormVisible] = useState(false)
  const [countryCode, setCountryCode] = useState("us")
  const { submitForm } = useFormContext()
  const pathname = usePathname()
  const router = useRouter()

  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    mobilenumber: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const pathParts = pathname.split("/")
    if (pathParts.length > 1) {
      const newCountryCode = pathParts[1].toLowerCase()
      if (newCountryCode.length === 2) setCountryCode(newCountryCode)
    }
  }, [pathname, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await submitForm({ ...formValues, formId })
      toast.success("Form submitted successfully!", {
        duration: 3000,
        position: "top-right",
      })
      setFormVisible(false)
      setFormValues({ fullname: "", email: "", mobilenumber: "", message: "" })
    } catch (error) {
      console.error("Failed to submit the form:", error)
      toast.error("Error submitting the form. Please try again.", {
        duration: 3000,
        position: "top-right",
        style: { borderRadius: "10px", background: "#e63946", color: "#fff" },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider>
      <div className="relative">
        <Toaster />
        <Button
          className="bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-border custom-gradient-border text-white font-medium font-poppins py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 group"
          onClick={() => setFormVisible(!isFormVisible)}
        >
          <span className="group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700 group-hover:text-transparent group-hover:bg-clip-text font-medium">
            Enquire
          </span>
        </Button>
        {isFormVisible && (
          <div className="fixed top-[3.69rem] right-0 z-50 mt-0 w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] bg-white dark:bg-zinc-800 overflow-hidden rounded-lg shadow-xl">
            <div className="p-4 border-b dark:border-zinc-700">
              <h2 className="font-montserrat text-center text-xl text-neutral-800 dark:text-neutral-200">
                GET IN TOUCH WITH US
              </h2>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <LabelInputContainer>
                  <Label htmlFor="fullname">Name</Label>
                  <Input
                    id="fullname"
                    placeholder="Tyler Durden"
                    value={formValues.fullname}
                    onChange={handleChange}
                    required
                    className="rounded-[0.5rem]"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="projectmayhem@fc.com"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                    className="rounded-[0.5rem]"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="mobilenumber">Phone Number</Label>
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
                <LabelInputContainer>
                  <Label htmlFor="message">Your Message</Label>
                  <MessageBox
                    id="message"
                    placeholder="Type your message here..."
                    value={formValues.message}
                    onChange={handleChange}
                    required
                    className="rounded-[0.5rem]"
                  />
                </LabelInputContainer>
                
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
        )}
      </div>
    </FormProvider>
  )
}



const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
    {children}
  </div>
)

export default EnquiryForm

