// Define the structure for the images array
interface ImageContent {
    src: string;
    alt: string;
    style: string;
  }
  
  // Define the structure for the entire content
  interface PolicyContent {
    pageTitle: string;
    buttonText: string;
    buttonLink: string;
    images: ImageContent[];
  }
  
  // Export the content as a constant
  export const images: PolicyContent = {
    pageTitle: "Gallery",
    buttonText: "View Gallery",
    buttonLink: "/gallery",
    images: [
      {
        src: "/assets/about/oldmen.webp",
        alt: "Image 1",
        style: "lg:top-36 top-36 lg:left-[35%] left-[15%] lg:w-[10%] lg:h-[20%] h-[13%] w-[23%]"
      },
      {
        src: "/assets/about/oldwomen.jpg",
        alt: "Image 2",
        style: "lg:top-[35%] top-[37%] lg:left-[87%] left-[80%] lg:w-[6%] lg:h-[12%] h-[11%] w-[16%]"
      },
      {
        src: "/assets/about/palace.jpeg",
        alt: "Image 3",
        style: "lg:visible invisible lg:top-[58%] top-[52%] left-2 lg:w-[7%] w-[25%] h-[11%]"
      },
      {
        src: "/assets/about/wheel.jpg",
        alt: "Image 4",
        style: "lg:top-[30%] top-[34%] lf:left-16 left-2 lg:w-[20%] lg:h-[25%] h-[13%] w-[45%]"
      },
      {
        src: "/assets/about/palace.jpeg",
        alt: "Image 5",
        style: "lg:top-[50%] top-[50%] lg:left-[24%] left-[4%] lg:w-[28%] lg:h-[36%] h-[25%] w-[50%] image-scale-up"
      },
      {
        src: "/assets/about/oldwomen.jpg",
        alt: "Image 6",
        style: "lg:visible invisible lg:top-[70%] top-[79%] lg:left-[8%] left-[10%] lg:w-[6%] lg:h-[19%] w-[19%] h-[11%]"
      },
      {
        src: "/assets/about/palace.jpeg",
        alt: "Image 7",
        style: "lg:top-[57%] top-[75%] left-[56%] lg:w-[15%] lg:h-[15%] w-[33%] h-[12%] image-translate-up"
      },
      {
        src: "/assets/about/wheel.jpg",
        alt: "Image 8",
        style: "lg:top-[75%] lg:left-[68%] lg:w-[7%] lg:h-[12%] h-[7%] w-[20%] top-[82%] left-[24%]"
      },
      {
        src: "/assets/about/banner3.jpg",
        alt: "Image 9",
        style: "lg:w-[26%] lg:h-[23%] w-[50%] h-[15%] lg:left-[55%] left-[45%] lg:top-40 top-36"
      },
      {
        src: "/assets/about/palace2.webp",
        alt: "Image 10",
        style: "top-[55%] lg:left-[83%] left-[70%] lg:w-[13%] lg:h-[25%] h-[16%] w-[26%] image-translate-up"
      }
    ]
  };
  