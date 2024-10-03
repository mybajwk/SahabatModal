import React, { useEffect, useState } from "react";

import FAQCard from "./FAQCard";
import { Accordion } from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import axios from "axios";

function FAQ({ id }: { id: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | undefined>();

  const router = useRouter();
  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(`/api/investor-view/${id}/qna`);
        console.log("tes", dataFetch);
        setData(dataFetch.data);
      } catch (error) {
        console.log(error);
        return router.push("/");
        // return null;
      }
    };

    get();
  }, []);

  return (
    <div className="p-6 lg:p-14 w-full font-lexend flex flex-col space-y-4 items-center">
      <h1
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
        className="font-bold text-white drop-shadow-text-white md:text-2xl mb-4"
      >
        Frequently Asked Question
      </h1>
      <Accordion
        type="single"
        collapsible
        className="flex flex-col space-y-6 w-full"
      >
        {data?.faq ? (
          data.faq.map(
            (
              i: { id: string; answer: string; question: string },
              index: number
            ) => (
              <FAQCard
                key={i.id}
                index={index}
                question={i.question}
                answer={i.answer}
              />
            )
          )
        ) : (
          <p className="py-20 w-full text-center text-white font-lexend text-lg">
            Tidak ada FAQ
          </p>
        )}
      </Accordion>
    </div>
  );
}

export default FAQ;
