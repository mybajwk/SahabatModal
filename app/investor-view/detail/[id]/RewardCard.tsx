"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useWindowSize from "@/hooks/useWindowSize";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/utils";

interface RewardCardProps {
  imageSrc: StaticImageData | string;
  title: string;
  min_amount: number;
}
const RewardCard: React.FC<RewardCardProps> = ({
  imageSrc,
  title,
  min_amount,
}) => {
  const { width } = useWindowSize();
  return (
    <Popover>
      <PopoverTrigger className="flex hover:cursor-pointer flex-row space-x-7 sm:max-w-[900px] items-center shadow-custom-inset p-3 rounded-md">
        <Image
          src={imageSrc}
          alt="thumbnail"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-full w-1/4 max-w-[100px] object-cover object-center aspect-square"
        />
        <div className="flex flex-col font-poppins items-start space-y-1">
          <h2 className="sm:text-lg">{title}</h2>
          <p className="text-[12px] sm:text-sm font-extralight">
            &gt; {formatRupiah(min_amount)}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="shadow-custom-inset flex flex-col font-lexend bg-black lg:bg-transparent md:mt-44 lg:mt-36 md:mr-4"
        side={width && width > 768 ? "left" : "bottom"}
      >
        <div className="flex flex-row text-xs w-full justify-between">
          <p className="text-white ">{title}</p>
          <p className="text-[#18D3A7]">Rp1.000.000,00</p>
        </div>
        <div className="flex flex-col justify-between flex-1 space-y-1 text-white mt-8 text-sm">
          <div>
            <p>Investor</p>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex flex-row w-full space-x-3 items-center">
                <p>10</p>
                <div className="flex flex-row relative w-1/5">
                  <Image
                    src={imageSrc}
                    alt="thumbnail"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-full h-8 w-8 object-cover object-center aspect-square shadow-custom-inset p-[2px] z-1 absolute right-0 bottom-[-15px]"
                  />
                  <Image
                    src={imageSrc}
                    alt="thumbnail"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-full h-8 w-8 object-cover object-center aspect-square shadow-custom-inset p-[2px] z-3 absolute right-[-23px] bottom-[-15px]"
                  />
                  <Image
                    src={imageSrc}
                    alt="thumbnail"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-full h-8 w-8 object-cover object-center aspect-square shadow-custom-inset p-[2px] z-2 absolute right-[-42px] bottom-[-15px]"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1 text-xs">
                <p className="text-[#EFC78D]">batas waktu funding</p>
                <p>Oktober 2024</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-center space-y-6">
            <div className="flex flex-col space-y-3">
              <Label className="text-xs">
                Total Investasi <span className="text-red-600">*</span>
              </Label>
              <Input
                className="bg-white text-[#9EA2AD] text-xs"
                required
                placeholder="Rp1000.000,00"
              ></Input>
              <Button className=" bg-green-gradient2 rounded-lg">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RewardCard;
