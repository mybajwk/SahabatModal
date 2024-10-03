import React from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQCardProps {
  question: string;
  answer: string;
  index: number;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer, index }) => {
  return (
    <AccordionItem value={`item-${index + 1}`} className="border-b-0 w-full">
      <AccordionTrigger className="w-full sm:text-lg rounded-md border border-[#D9D9D9] p-3 shadow-custom-inset">
        {question}
      </AccordionTrigger>
      <AccordionContent className="bg-white sm:text-sm rounded-md text-black px-4 py-3">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQCard;
