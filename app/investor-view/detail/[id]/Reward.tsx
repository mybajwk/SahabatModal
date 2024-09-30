import React, { useState } from "react";

import AvailableReward from "./AvailableReward";
import barista from "../../../assets/barista.png";
import RewardCard from "./RewardCard";

const dummyData = [
  {
    title: "Kostum adat jawa Tengah",
    milestone: 5,
    rewards: [
      {
        imageSrc: barista,
        title: "Reward 1",
        quantity: 10,
      },
    ],
  },
  {
    title: "Kostum Barong",
    milestone: 10,
    rewards: [
      {
        imageSrc: barista,
        title: "Reward 2",
        quantity: 20,
      },
      {
        imageSrc: barista,
        title: "Reward 2",
        quantity: 20,
      },
    ],
  },
  {
    title: "Majapahit Kostum",
    milestone: 50,
    rewards: [
      {
        imageSrc: barista,
        title: "Reward 3",
        quantity: 30,
      },
      {
        imageSrc: barista,
        title: "Reward 3",
        quantity: 30,
      },
      {
        imageSrc: barista,
        title: "Reward 3",
        quantity: 30,
      },
      {
        imageSrc: barista,
        title: "Reward 3",
        quantity: 30,
      },
    ],
  },
];

function Reward() {
  const [selectedItem, setSelectedItem] = useState(dummyData[0]);

  return (
    <div className="flex font-lexend flex-col md:flex-row space-y-8 p-6 w-full">
      <div className="flex flex-col space-y-2 md:w-1/2">
        <h1 className="drop-shadow-text-white font-bold text-center md:text-start md:text-2xl mb-4">
          Reward yang Tersedia
        </h1>
        {dummyData.map((item, index) => (
          <AvailableReward
            key={index}
            title={item.title}
            milestone={item.milestone}
            items_num={item.rewards.length}
            onClick={() => setSelectedItem(item)}
            isActive={selectedItem === item}
          />
        ))}
      </div>
      <div className="flex flex-col space-y-3 md:w-full">
        {selectedItem?.rewards.map((reward, index) => (
          <RewardCard
            key={index}
            title={reward.title}
            quantity={reward.quantity}
            imageSrc={reward.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}

export default Reward;
