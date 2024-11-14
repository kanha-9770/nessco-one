import { HomeData } from "../Home/types/constant";

interface ImageSliderLayoutProps {
  heroData: HomeData;
}

const ImageSlider: React.FC<ImageSliderLayoutProps> = ({ heroData }) => {
  return (
    <div className="relative w-full mx-auto h-full">
      <video
        src="https://assets.nesscoindustries.com/public/video/xyz.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-2xl"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute  w-auto top-1/3 left-8 text-white">
        <h2 className="lg:text-6xl text-3xl font-bold mb-2">
          {heroData.home[1].data?.textOverlay?.headline}
        </h2>
        <p className="lg:text-5xl text-2xl">
          {heroData.home[1].data?.textOverlay?.subheadline}
        </p>
      </div>
    </div>
  );
};

export default ImageSlider;
