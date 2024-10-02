import React from "react";

interface AvailableRewardProps {
  title: string;
  milestone: number;
  items_num: number;
  onClick: () => void;
  isActive: boolean;
}

const AvailableReward: React.FC<AvailableRewardProps> = ({
  title,
  milestone,
  items_num,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={`hover:cursor-pointer  flex flex-col space-y-1  px-3 ${isActive ? "border-l-2 border-l-[#18D3A7]" : ""}`}
      onClick={onClick}
    >
      <h2 className="text-xs sm:text-lg">{title}</h2>
      <div className="w-full font-poppins text-[10px] sm:text-sm flex flex-row space-x-1">
        <p>{milestone}% invest</p>
        <p className="font-extralight">{items_num} items include</p>
      </div>
    </div>
  );
};

export default AvailableReward;
