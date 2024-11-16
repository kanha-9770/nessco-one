"use client";
import React from "react";
import dynamic from "next/dynamic";
const Carousel =dynamic(()=>import("@/components/ui/HomeMachine-cards-carousel"));
const Card=dynamic(()=>import("@/components/ui/HomeMachineCard"))
interface CardData {
  content?: React.ReactNode;
  category: string;
  firstname: string;
  secondname: string;
  description: string;
  image: string;
  title: string;
  speed: number;
  unit: string;
  icon: string;
  items: { className: string; text: string }[];
}

interface HomeMachineCarouselProps {
  filteredCardsData: CardData[];
}

export default function HomeMachineCarousel({
  filteredCardsData,
}: HomeMachineCarouselProps) {
  const cards = filteredCardsData.map((card: CardData) => (
    <Card key={card.title} card={card}  />
  ));

  return (
    <div className="w-full h-full -mt-14">
      <Carousel items={cards} />
    </div>
  );
}
