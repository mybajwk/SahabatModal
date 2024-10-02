import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FinancialUploadProps {
  newNumber: number;
}
const FinancialUpload: React.FC<FinancialUploadProps> = ({ newNumber }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className=" text-black bg-light-blue">
        <AccordionTrigger className="px-4 font-bold border-l-4 border-l-[#3E3183]">
          Laporan Keuangan {newNumber}
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-8 text-start flex flex-col items-center space-y-4 bg-[#E6E6E6] border-l-4 border-l-[#18D3A7]">
          <div className="bg-black w-full h-40 text-white flex justify-center items-center">
            DROPZONE
          </div>
          <Button
            type="submit"
            className="bg-[#18D3A7] text-[#FFFFFF] text-xs rounded-full w-2/3 place-self-center font-semibol max-w-[200px] "
          >
            Submit
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FinancialUpload;
