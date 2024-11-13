// components/Gallery.tsx

import Image from 'next/image';
import { galleryContent } from '../Constants/pinkcity/PinkcityPage.json';
import dynamic from 'next/dynamic';

const Flowerlayer=dynamic(()=>import("../Icons/about/Flowerlayer"),{ssr:false})
const Flowerlayerbottom=dynamic(()=>import("../Icons/about/Flowerlayerbottom"),{ssr:false},)


const Gallery = () => {
  return (
    <div className="relative justify-center  flex flex-col  lg:h-full w-full  ">
      <div className="flex justify-center" >
      <Flowerlayer/>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2  gap-6 md:gap-5 p-10 justify-center items-center ">
  {galleryContent.galleryImages.map((src, index) => (
    <div key={index} className="relative  rounded-2xl overflow-hidden  lg:left-0 hover:shadow-2xl">
      <Image 
        src={src} 
        alt={`Gallery image ${index + 1}`} 
        width={300}
        height={300} 
        className="object-cover  h-full w-full "
      />
    </div>
  ))}
</div>


      <div className="flex justify-center mb-2">
       <Flowerlayerbottom/>
      </div>
    </div>
  );
};

export default Gallery;
