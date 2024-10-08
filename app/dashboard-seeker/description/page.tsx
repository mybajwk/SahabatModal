"use client";

import React, { useEffect, useState } from "react";
import PageContent from "./page-content";
import FAQCard from "@/app/investor-view/detail/[id]/FAQCard";
import { Accordion } from "@/components/ui/accordion";
import axios from "axios";
import { useRouter } from "next/navigation";

const DashSeekerDescPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | undefined>();
  const router = useRouter();

  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(`/api/funding/desc`);
        // console.log(dataFetch);
        setData(dataFetch.data);
      } catch (error) {
        console.log(error);
        return router.push("/");
        // return null;
      }
    };

    get();
  }, [router]);

  if (!data) return null;

  return (
    <div className="flex flex-col md:px-10 md:py-6 px-6 py-4 justify-center items-center ">
      <h1
        className="w-full mb-5 text-white text-center font-lexend text-[40px] md:text-[44px] font-semibold"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
        Deskripsi
      </h1>
      <div className="w-full flex justify-center items-center sm:w-[80%] ">
        <PageContent content={data.desc} />
      </div>

      <h1
        className="w-full mb-5 text-white text-center font-lexend text-[40px] md:text-[44px] font-semibold"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
        FAQ
      </h1>
      <div className="w-full md:w-[80%] ">
        <Accordion
          type="single"
          collapsible
          className="w-full flex-col justify-center items-center gap-4 flex"
        >
          {data.faq ? (
            data.faq.map(
              (
                i: { id: string; answer: string; question: string },
                index: number,
              ) => (
                <FAQCard
                  key={i.id}
                  index={index}
                  question={i.question}
                  answer={i.answer}
                />
              ),
            )
          ) : (
            <p className="py-20 w-full text-center text-white font-lexend text-lg">
              Tidak ada FAQ
            </p>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default DashSeekerDescPage;
