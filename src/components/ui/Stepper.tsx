'use client'

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import box from "https://res.cloudinary.com/dfryvystt/image/upload/v1731481264/49_vtvq7r.svg"
import box1 from "https://res.cloudinary.com/dfryvystt/image/upload/v1731481264/49_vtvq7r.svg"
import box2 from "../../../public/assets/stepper/popcorn.svg"
import box3 from "../../../public/assets/stepper/spoon.svg"
import box4 from "../../../public/assets/stepper/lid.svg"
import box5 from "../../../public/assets/stepper/box.svg"

interface Category {
  name: string
}

interface StepperProps {
  categories: Category[]
  onStepChange: (index: number) => void
}

const icons = [box, box1, box2, box3, box4, box5]

export default function Stepper({ onStepChange, categories }: StepperProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const stepperRef = useRef<HTMLDivElement>(null)

  const handleClick = (index: number) => {
    setActiveStep(index)
    onStepChange(index)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0", 10)
            setVisibleSteps((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        })
      },
      {
        root: stepperRef.current,
        threshold: 0.5,
      }
    )

    const stepElements = document.querySelectorAll(".step-icon")

    stepElements.forEach((element) => observer.observe(element))

    return () => {
      stepElements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  return (
    <div
      className={`lg:sticky z-[9999] lg:top-[5.8rem] max-w-screen-2xl left-0 w-full ${
        activeStep > 0 ? "bg-[#f2f2f2]" : "bg-[#f2f2f2]"
      }`}
    >
      <div className="relative flex items-center justify-center w-full z-[9999] h-20 mx-auto lg:h-20">
        <div className="w-screen">
          <div
            className="relative flex items-center max-w-screen-2xl justify-start overflow-x-scroll scrollbar-hide w-full"
            ref={stepperRef}
          >
            {categories?.map((category, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex flex-col pt-1 last:pr-[6%] first:pl-[4%] items-center justify-center relative cursor-pointer step-icon ${
                    index === activeStep ? "text-black" : "text-black"
                  }`}
                  onClick={() => handleClick(index)}
                  data-index={index}
                >
                  <div
                    className={`relative h-9 w-9 flex items-center justify-center text-xl ${
                      index === activeStep
                        ? "border-red-700 border-2 text-white rounded-full shadow-lg"
                        : "p-0"
                    }`}
                  >
                    {visibleSteps.includes(index) && (
                      <Image
                        className="h-6 w-6"
                        src={icons[index % icons.length]}
                        alt={`step-icon-${index}`}
                        height={24}
                        width={24}
                      />
                    )}
                  </div>
                  <span className="text-xs text-black lg:text-xs font-regular mt-2 font-poppins text-center w-20 lg:w-20">
                    {category.name}
                  </span>
                </div>
                {index < categories.length - 1 && (
                  <div className="flex items-center">
                    <div className="h-1 border-t-2 w-4 lg:w-10"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}