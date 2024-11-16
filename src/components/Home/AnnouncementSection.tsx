"use client";
import React, { useEffect } from "react";
import { Carousel, Card } from "./Common/AnnouncementCarousel";
import { HomeData } from "./types/constant";
interface AnnouncementSectionProps{
  heroData:HomeData;
}
interface Event {
  category: string;
  title: string;
  date: string;
  src: string;
}

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({ heroData }) => {
  useEffect(()=>{
    console.log("heroData?.home[9]?.Announcement?.data?",heroData?.home[9]?.data);
  },[])
  const cards = heroData?.home[9]?.data?.map((card, index) => (
    <Card
      key={index} // Using index as the key
      src={card.src}
      title={card.title}
      category={card.category}
      date={card.date}
    />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}
export default AnnouncementSection;
