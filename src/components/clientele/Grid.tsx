
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './client.module.css'; // Import CSS module
import { ClienteleItem, Square } from './types/constant';
// Square data

interface AboutLayoutProps{
  clienteleData:ClienteleItem;
}
// Utility function to get a sliding animation class
const getSlidingDirectionClass = () => {
  const directions = [
    styles['animation-slide-in-left'],
    styles['animation-slide-in-right'],
    styles['animation-slide-in-top'],
    styles['animation-slide-in-bottom'],
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};


// Generate square components
const generateSquares = (data: Square[] , isFadingOut: boolean) => {
  return data?.map((sq) => {
    const animationClass = getSlidingDirectionClass();
    return (
      <div
        key={sq?.id}
        className={`relative border border-[#262626] rounded-lg flex items-center justify-center overflow-hidden 
        ${sq?.bgClass} 
        ${isFadingOut ? 'opacity-0' : 'opacity-100'} 
        transition-opacity duration-4000 ease-in-out`} // Fading effect
      >
        <div className={`absolute inset-0 flex items-center justify-center lg:p-0 p-3 ${animationClass}`}>
          <Image
            src="https://res.cloudinary.com/dlti4o10e/image/upload/v1732004975/11_b2yedo.svg"
            alt={`image-${sq.id}`}
            width={110}
            height={110}
            className="transform transition-transform duration-4000"
          />
        </div>
      </div>
    );
  });
};

// Main ShuffleGrid component
const ShuffleGrid:React.FC <AboutLayoutProps>= ({clienteleData}) => {
  const homegridData: Square[] = clienteleData?.Clientele[0]?.squares || []; // Type as Square[]
  const [Squares, setSquares] = useState(generateSquares(homegridData, false));
  const [ isFadingOut, setIsFadingOut] = useState(false); // Track fading state

  useEffect(() => {
    const shuffleSquares = () => {
      setIsFadingOut(true); // Start fading out

      // After fade-out, change squares and fade in
      setTimeout(() => {
        setSquares(generateSquares(homegridData, false)); // Update squares
        setIsFadingOut(false); // Fade back in
      }, 4000); // Matches the fade-out duration
    };

    const interval = setInterval(shuffleSquares, 4000); // Total cycle: 4s fade-out + 4s fade-in

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [homegridData]);

  return (
    <div className="lg:h-[40rem] lg:w-full w-full h-[40rem] bg-black lg:p-10">
      <div className={`grid lg:grid-cols-4 grid-cols-2 lg:gap-3 gap-2 lg:h-full lg:w-full h-full w-full ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
        {Squares}
      </div>
    </div>
  );
};

export default ShuffleGrid;



