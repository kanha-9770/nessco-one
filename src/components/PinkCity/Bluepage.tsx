"use client";
import { PinkCityData } from './types/constant';
interface AboutLayoutProps{
  pinkcityData:PinkCityData
}

const Bluepage:React.FC <AboutLayoutProps>= ({pinkcityData}) => {
const homepinkcity=pinkcityData?.pinkcity[0]?.bluePageContent;
  return (
    <div className="relative w-full h-full bg-gray-100 mt-10 p-12 overflow-hidden hidden lg:block">
    

      <div className="relative z-10 lg:w-[100%] lg:top-5 lg:h-[40rem] lg:left-0 h-[50vh] ">
        <video
          className="w-full object-fill h-full rounded-2xl "
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster ={homepinkcity.videoSrc}
        >
          <source src={homepinkcity.videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Bluepage;
