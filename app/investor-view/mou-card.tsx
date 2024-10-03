"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { FaRegClock } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface MouCardProps {
  imageSrc: StaticImageData | string;
  progressValue: number;
  avatarSrc: string;
  avatarFallback: string;
  title: string;
  owner: string;
  daysLeft: number;
  id: string;
}

const MouCard: React.FC<MouCardProps> = ({
  imageSrc,
  progressValue,
  avatarSrc,
  avatarFallback,
  title,
  owner,
  daysLeft,
  id,
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/investor-view/detail/${id}`);
  };
  return (
    <div
      className="ml-3 mr-3 p-3 flex flex-col w-full max-w-[320px] md:max-w-[350px] hover:scale-110 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        alt="thumbnail"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <Progress value={progressValue} />
      <div className="flex flex-row items-center space-x-2">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col mt-3 space-y-1 w-full">
          <h1 className="text-[12px] font-lexend font-semibold">{title}</h1>
          <label className="text-[10px]">{owner}</label>
          <div className="w-full flex justify-between text-[10px]">
            <ul
              style={{ listStyleType: "disc", listStylePosition: "inside" }}
              className="flex flex-row space-x-2"
            >
              <li className="flex items-center space-x-1">
                <FaRegClock className="w-3 h-3" />
                <label>{daysLeft} days left</label>
              </li>
              <li className="flex items-center">{progressValue}% funded</li>
            </ul>
            <Button className="rounded-full px-4 flex-1 ml-4 mb-5 shadow-custom-shadow-green-button bg-green-gradient text-xs">
              MoU
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MouCard;
