import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import wormAI from "../assets/worm.png";

import Image from "next/image";

interface FinancialCardProps {
  title: string;
  description: string;
}

const FinancialCard: React.FC<FinancialCardProps> = ({
  title,
  description,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className=" text-black bg-light-blue">
        <AccordionTrigger className="px-4 font-bold border-l-4 border-l-[#3E3183]">
          {title}
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-8 text-start flex flex-col items-center md:flex-row md:items-start md:space-x-8 md:space-y-0 space-y-4 bg-[#E6E6E6] border-l-4 border-l-[#18D3A7]">
          <div className="relative aspect-square w-1/2 md:min-w-[100px] max-w-[100px] rounded-full bg-[#00326C] mx-auto">
            <Image
              src={wormAI}
              alt="thumbnail"
              width={0}
              height={0}
              sizes="100vw"
              className="absolute top-1/2 left-1/2 h-14 w-14 object-contain transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="flex flex-col space-y-3 ">
            <p className="text-justify text-xs">{description}</p>
            <Button
              type="submit"
              className="bg-[#18D3A7] text-[#FFFFFF] text-xs rounded-full w-2/3 place-self-center font-semibol max-w-[200px] md:place-self-end"
            >
              Analisis lagi
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FinancialCard;
