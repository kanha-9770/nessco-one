"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { AboutItem, GridItem, Machine } from "../AboutHome/types/constant";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Arrow from "../../../public/assets/Support/RedirectionArrowImg.svg";
import LinkUrl from "../LinkUrl";

interface HomeLayoutProps {
  aboutData: AboutItem;
}

gsap.registerPlugin(ScrollTrigger);

const FeatureProjectPage: React.FC<HomeLayoutProps> = ({ aboutData }) => {
  const homeaboutData = aboutData?.About[0]?.Featureheading;
  const homeaboutData2 = aboutData?.About[0]?.machines;
  const homeaboutData3 = aboutData?.About[0]?.grid;
  const [selectedMachine, setSelectedMachine] = useState<Machine>(
    homeaboutData2[0]
  );
  const [isMobile, setIsMobile] = useState(false);
  const [selectedGrid, setSelectedGrid] = useState<GridItem | null>(null); // Updated type for selected grid
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    console.log("homeaboutData3", homeaboutData3);
  });
  const openModal = (grid: GridItem) => {
    setSelectedGrid(grid); // Set selected grid item
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedGrid(null); // Reset selected grid
  };

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);

  const horizontalLineRef = useRef<HTMLDivElement | null>(null);
  const verticalLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleMachineClick = (machine: Machine) => {
    setSelectedMachine(machine);
  };

  const wordLimit = 20;

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "."
      : text;
  };

  const wordLimitdesktop = 20;

  const truncateTextdesktop = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "...."
      : text;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed (768px for mobile/tablet)
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Set a delay for 5 seconds before the animation starts
    const timeoutId = setTimeout(() => {
      // Create a GSAP timeline without ScrollTrigger
      const tl = gsap.timeline();

      // Animate the horizontal line
      tl.fromTo(
        horizontalLineRef.current,
        { width: 0 },
        {
          width: "100%",
          duration: 2,
          ease: "power3.out",
        }
      );

      // Animate the vertical lines and images after the horizontal line animation
      verticalLinesRef.current.forEach((line, index) => {
        if (line) {
          tl.fromTo(
            line,
            { y: 0, height: 0 }, // Start off-screen (above)
            {
              y: 0, // Slide into view
              height: "17rem",
              z: 10,
              duration: 2, // 2-second duration for smooth transition
              ease: "power3.out",
              delay: 0.3, // Staggered delay based on index for visual effect
            },
            "-=2" // Start animation for vertical lines 2 seconds before the horizontal line animation ends
          );

          const image = imagesRef.current[index];
          if (image) {
            tl.fromTo(
              image,
              { y: 10, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              },
              "-=2" // Start animation for images 2 seconds before the vertical lines animation ends
            );
          }
        }
      });
    }, 5000); // Delay the animation by 5 seconds

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  function formatString(input) {
    return input
      .trim() // Remove extra spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  return (
    <div className="h-full relative overflow-hidden font-poppins">
      <div
        className={`relative flex flex-col w-full bg-white overflow-hidden `}
      >
        <h3
          className={`lg:text-5xl mt-16 text-2xl bg-gradient-to-r from-[#483d73] from-2% via-red-700 via-20% to-red-700 text-transparent bg-clip-text h-[7rem] font-semibold lg:ml-[2rem] ml-4`}
        >
          <span className="block"> {homeaboutData?.featuredpage} </span>
          <span> {homeaboutData?.featuredpagehighlight} </span>
        </h3>

        {isMobile ? (
          // Mobile view layout
          <div className="flex flex-col  items-center w-full  relative">
            <div className="flex flex-row items-center  w-full bg-white rounded-2xl mt-5 h-32">
              <div className="w-2/5 h-full">
                <Image
                  src={
                    selectedMachine?.mainImage ||
                    "https://www.nesscoindia.com/Assets/images/resource/fully-automatic-paper-cup-making-machine.webp"
                  }
                  alt={selectedMachine?.title}
                  width={300}
                  height={300}
                  priority
                  className=" h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col w-3/5 p-2">
                <div className="relative pl-2">
                  <h4 className="text-xl font-bold relative  text-black italic  font-poppins">
                    {selectedMachine?.title}
                  </h4>
                </div>

                <div className="px-2">
                  <p className="text-xs text-gray-500 mt-2 text-left font-poppins">
                    {isMobile
                      ? truncateText(selectedMachine?.description, wordLimit)
                      : selectedMachine?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-6 gap-2 mt-4 p-4">
              {homeaboutData2?.map((machine, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-lg overflow-hidden cursor-pointer 
      ${selectedMachine?.id === machine?.id ? "border-2 border-black" : ""}`}
                  onClick={() => handleMachineClick(machine)}
                >
                  <Image
                    src={
                      selectedMachine?.mainImage ||
                      "https://www.nesscoindia.com/Assets/images/resource/fully-automatic-paper-cup-making-machine.webp"
                    }
                    alt={machine?.title}
                    width={100}
                    height={100}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop view
          <div className="flex flex-col lg:flex-row items-center lg:items-start  h-[18rem] relative lg:space-x-8 ">
            {/* Left: Heading */}
            <h3 className="text-4xl font-bold text-gray-600 lg:w-1/3 italic mb-6 lg:mb-0 relative pl-8">
              {selectedMachine?.title}
            </h3>

            {/* Center: Image */}
            <div className="relative flex justify-center lg:justify-center lg:w-1/3 lg:mx-0 -top-28">
              <Image
                src={
                  selectedMachine?.mainImage ||
                  "https://www.nesscoindia.com/Assets/images/resource/fully-automatic-paper-cup-making-machine.webp"
                }
                alt={selectedMachine?.title}
                width={300}
                height={300}
                priority
                className="object-cover z-20 h-[18rem] sm:h-[20rem] lg:h-[15rem] w-[17rem] sm:w-[24rem] lg:w-[25rem]"
              />
            </div>

            {/* Right: Description */}
            <div className="lg:w-1/3 z-10 lg:text-right font-poppins justify-center text-center pr-5 ml -top-10 relative">
              <p className="text-sm lg:text-xs font-regular text-black">
                {selectedMachine?.description}
              </p>
            </div>
          </div>
        )}

        {/* Horizontal Line */}
        <div
          ref={horizontalLineRef}
          className="relative w-full h-1 bg-[#3a2a79] -top-[14rem] lg:visible invisible "
        >
          {/* Vertical Lines */}
          <div className="relative w-full flex justify-around ">
            {homeaboutData2?.map((machine, index) => (
              <div key={machine?.id} className="relative flex justify-center ">
                <div
                  ref={(el) => {
                    verticalLinesRef.current[index] = el;
                  }}
                  className="w-[0.10rem] bg-[#b0aac5] h-[17rem] mask-gradient-featuredproject relative opacity-25 "
                ></div>
                <div
                  ref={(el) => {
                    imagesRef.current[index] = el;
                  }}
                  className={`border-2 border-x-gray-200 h-[7rem] rounded-2xl mt-${
                    machine.id === 1
                      ? 28
                      : machine.id === 2
                      ? 10
                      : machine.id === 3
                      ? 24
                      : machine.id === 4
                      ? 16
                      : machine.id === 5
                      ? 40
                      : 20
                  } -ml-${
                    machine.id === 1
                      ? 5
                      : machine.id === 2
                      ? 12
                      : machine.id === 3
                      ? 24
                      : machine.id === 4
                      ? 20
                      : machine.id === 5
                      ? 24
                      : 20
                  } z-20 bg-white cursor-pointer ${
                    selectedMachine.id === machine.id ? "-ml-7 " : "-ml-10"
                  }`}
                  onClick={() => handleMachineClick(machine)}
                >
                  <Image
                    src={machine?.mainImage}
                    alt={machine?.title}
                    width={300}
                    height={300}
                    priority
                    className="object-cover h-[7rem] w-[7rem] -mt-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="text-center mt-16 mb-12 px-6 font-poppins "
        ref={carouselRef}
      >
        <p className="text-2xl lg:text-3xl font-medium">
          <span className="block mb-3"> {homeaboutData?.banner1}</span>{" "}
          <span
            ref={gradientRef}
            className="bg-gradient-to-r from-transparent to-[#a397d3] text-[#483d73] px-1  bg-[length:0%_100%] bg-left bg-no-repeat rounded-lg"
          >
            {homeaboutData?.banner2}
          </span>
        </p>
      </div>

      {isModalOpen && selectedGrid && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50 flex lg:flex-row flex-col justify-center items-center transition-all duration-700 ease-in-out transform"
          onClick={closeModal}
        >
          <div className="bg-white rounded-3xl flex lg:flex-row flex-col lg:w-[45rem] lg:h-[20rem] h-[40rem] w-[23rem]  transition-all duration-700 ease-in-out transform">
            {/* Left side: Image */}
            <div className="lg:w-1/2 lg:h-full h-1/2 p-4 ">
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <Link href={`projects/${formatString(selectedGrid?.title)}`}>
                  <Image
                    src={
                      selectedGrid?.mainImage ||
                      "https://www.nesscoindia.com/Assets/images/resource/fully-automatic-paper-cup-making-machine.webp"
                    } // Assuming selectedGrid contains an image source
                    alt={selectedGrid?.title}
                    height={300}
                    width={300}
                    className="rounded-2xl h-[40rem] w-[30rem] -mt-24"
                  />
                </Link>
              </div>
            </div>

            {/* Right side: Title and Description */}
            <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex flex-col justify-between relative lg:p-0 p-3 ">
              <div className="p-4 ">
                <Link href={`projects/${formatString(selectedGrid?.title)}`}>
                  <h3 className="text-md mb-2 font-poppins font-semibold text-black w-[18rem]">
                    {selectedGrid?.title}
                  </h3>
                </Link>
                <div className="w-[18rem] mt-2 h-[13rem] overflow-y-scroll scroll-wrapper style-1">
                  <p className="font-poppins font-regular text-sm pl-2 text-justify">
                    {selectedGrid?.description}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <div className="absolute lg:top-2 lg:right-3 right-1 -top-[19.7rem] hover:text-[#483d73] cursor-pointer">
                <button
                  aria-label="close button"
                  className="cursor-pointer font-bold"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="35"
                    height="35"
                    fill="#483d73"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z"></path>
                  </svg>
                </button>
              </div>

              <Link href={`projects/${formatString(selectedGrid?.title)}`}>
                <div className="absolute bottom-2 right-14 text-xs font-poppins font-medium lg:hover:text-black lg:hover:bg-white bg-black text-white py-[0.2rem] px-2 rounded-full border border-black flex items-center group transition-all duration-300">
                  <p>Read More</p>
                  <Image
                    src="https://assets.nesscoindustries.com/public/assets/homepage/read-more-icon.webp"
                    alt={"ReDirection Arrow"}
                    width={400}
                    height={400}
                    className="w-4 h-4 lg:group-hover:invert ml-2 transition-all diration-300"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Paragraph and grid below */}
      <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-1  gap-4 p-4 mt-8 relative">
        {homeaboutData3?.map((item, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-[1rem] p-1"
          >
            <Image
              src={
                item?.mainImage ||
                "https://www.nesscoindia.com/Assets/images/resource/fully-automatic-paper-cup-making-machine.webp"
              }
              alt={item?.title || "Image description"}
              width={100}
              height={100}
              className="w-full h-44 object-cover rounded-[0.8rem]"
            />

            <h4 className="mt-2 text-sm font-medium text-gray-800 lg:w-[15rem] ml-2 md:w-[16rem]">
              {item?.title}
            </h4>
            <div className="flex-col flex space-y-4 first-letter: p-2  relative -ml-7">
              <p className="text-gray-600 text-xs font-poppins font-regular mt-3 px-7 h-[5rem]">
                {truncateTextdesktop(
                  selectedMachine?.description,
                  wordLimitdesktop
                )}
              </p>
            </div>
            <button
              aria-label="open-button"
              className="ml-56 cursor-pointer md:ml-80 absolute bottom-2 right-2 hover:text-[#483d73] transition-all duration-700 ease-in-out"
              onClick={() => openModal(item)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                fill="#483d73"
                width="35"
                height="35"
                viewBox="0 0 24 24"
              >
                <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProjectPage;
