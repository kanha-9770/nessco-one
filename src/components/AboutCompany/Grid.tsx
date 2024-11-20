import Image from 'next/image';
import Style from './about.module.css';
import { OurCompanyItem } from "./types/constant";
import React from 'react';

interface AboutLayoutProps{
  companyData:OurCompanyItem;
}

const Grid:React.FC <AboutLayoutProps>= ({companyData}) => {
  const grid=companyData?.Ourcompany?.[0]?.images;


  return (
    <div className="relative h-[40rem] bg-black w-full">
      <div className="absolute inset-0 grid grid-cols-10 p-14 -ml-16 overflow-hidden">
        <div className="border border-gray-400 mt-16"></div>
        <div className="border border-gray-400 mt-16 col-span-3"></div>
        <div className="border border-gray-400 mt-16 col-span-3"></div>
        <div className="border border-gray-400 mt-16 col-span-2 -mr-10"></div>
        <div className="border border-gray-400 mt-16 ml-10 lg:-mr-[47%] -mr-[4rem]"></div>
      </div>
      <div className='absolute w-full top-1/2 z-30'>
      <h1 className=' lg:text-6xl text-5xl z-30 lg:top-1/2 top-[23.5rem] lg:left-1/2  font-poppins justify-center text-center flex flex-col text-white font-medium '>Gallery</h1>
      {/* <button aria-label='view button' className="  z-30 bg-white font-poppins font-regular  lg:top-[58%] top-[24rem] text-black px-3 py-2 text-lg rounded-2xl ml-[38%] lg:ml-[45%] mt-2 hover:text-white hover:bg-black hover:font-medium">
         {homecompanyData?.viewgallery || 'View Gallery'}
      </button> */}
      </div>
      {Array.isArray(grid) && grid.map((img, idx) => (        <div
          key={idx}
          className={`absolute ${img.style} z-20 ${img.style.includes('image-scale-up') ? Style.imageScaleUp : ''} ${img.style.includes('image-translate-up') ? Style.imageTranslateUp : ''}`}
        >
          <Image
            src="https://res.cloudinary.com/dlti4o10e/image/upload/v1728990173/samples/imagecon-group.jpg"
            alt={img.alt}
            layout="fill"
            objectFit="cover"
            className="duration-100 rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}

export default Grid;
