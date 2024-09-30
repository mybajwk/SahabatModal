import React from "react";
import Image, { StaticImageData } from "next/image";

interface RewardCardProps {
  imageSrc: StaticImageData | string;
  title: string;
  quantity: number;
}
const RewardCard: React.FC<RewardCardProps> = ({
  imageSrc,
  title,
  quantity,
}) => {
  return (
    <div className="flex hover:cursor-pointer flex-row space-x-2 sm:max-w-[900px] items-center shadow-custom-inset p-3 rounded-md">
      <Image
        src={imageSrc}
        alt="thumbnail"
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-full w-1/4 max-w-[100px] object-cover object-center aspect-square"
      />
      <div className="flex flex-col font-poppins space-y-1">
        <h2 className="sm:text-lg">{title}</h2>
        <p className="text-[8px] sm:text-sm font-extralight">
          Quantity: {quantity}
        </p>
      </div>
    </div>
  );
};

export default RewardCard;
