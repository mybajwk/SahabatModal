import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQCardProps {
  question: string;
  answer: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-md border border-[#D9D9D9] p-3 shadow-custom-inset"
    >
      <AccordionItem value="item-1" className="border-b-0 ">
        <AccordionTrigger className="py-1 text-justify">
          {question}
        </AccordionTrigger>
        <AccordionContent className="bg-white rounded-md text-black px-4 py-3">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FAQCard;
