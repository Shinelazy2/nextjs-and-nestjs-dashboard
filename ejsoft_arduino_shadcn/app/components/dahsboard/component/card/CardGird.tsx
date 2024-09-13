import React from "react";
import { CardItem } from "./TitleCard";

interface CardData {
  TEMP: number;
  HUM: number;
  DOOR: number;
  RISK: number;
  REG_DT: string;
}

interface CardGridProps {
  cardData: CardData | undefined;
}

const cardItems = [
  {
    title: "Temperature",
    value: (data: CardData) =>
      `${data.TEMP ? data.TEMP.toFixed(2) + "°C" : "No Data"}`,
    icon: "🌡️",
    description: (data: CardData) =>
      `${
        data.TEMP ? `Temperature is ${data.TEMP && data.TEMP.toFixed(2)}°C` : ""
      }`,
  },
  {
    title: "Humidity",
    value: (data: CardData) =>
      `${data.HUM ? `${data.HUM.toFixed(2)}%` : "No Data"}`,
    icon: "💧",
    description: (data: CardData) =>
      `${data.HUM ? `Humidity is ${data.HUM && data.HUM.toFixed(2)}%` : ""}`,
  },
  {
    title: "Door Lock",
    value: (data: CardData) => `${data.DOOR ? "Open" : "Close"}`,
    icon: "🔒",
    description: (data: CardData) => `Door is ${data.DOOR ? "Open" : "Close"}`,
  },
  {
    title: "Risk",
    value: (data: CardData) => `${data.RISK ? "Danger" : "Safe"}`,
    icon: "🚨",
    description: (data: CardData) => `Risk is ${data.RISK ? "High" : "Low"}`,
  },
];

export function CardGrid({ cardData }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardItems.map((card, index) => (
        <CardItem
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          description={card.description}
          cardData={cardData}
        />
      ))}
    </div>
  );
}
