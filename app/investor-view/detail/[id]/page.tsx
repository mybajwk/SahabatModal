"use client";

import React, { useEffect, useState } from "react";
import Deskripsi from "./Deskripsi";
import Reward from "./Reward";
import FAQ from "./FAQ";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatRupiah, hitungSelisihHari } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InvestorDetail({ params }: { params: { id: string } }) {
  // const { id } = params;
  const [activeTab, setActiveTab] = useState("Reward");
  const [amount, setAmount] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | undefined>();
  const router = useRouter();
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Deskripsi":
        return <Deskripsi id={params.id} />;
      case "Reward":
        return <Reward id={params.id} amount={amount} setAmount={setAmount} />;
      case "FAQ":
        return <FAQ id={params.id} />;
      default:
        return <Deskripsi id={params.id} />;
    }
  };

  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(`/api/investor-view/${params.id}`);
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
    <div className="relative bg-conic-blue font-lexend flex flex-col items-center py-8">
      <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6 md:items-start items-center space-y-5 p-8">
        <figure className="w-full md:flex-[0.8] aspect-video relative">
          {data?.media ? (
            data?.media.endsWith(".mp4") ? (
              <video
                className="w-full"
                controls
                preload="none"
                aria-label="Video player funding"
              >
                <source src={data?.media} type="video/mp4" />
              </video>
            ) : (
              <Image
                className="object-cover"
                fill
                alt="image funding"
                src={data?.media}
              />
            )
          ) : (
            <div className="flex size-full justify-center items-center bg-black text-white font-lexend text-lg">
              No image
            </div>
          )}
        </figure>
        <div className="flex w-full flex-col items-start space-y-3 border-l-4 border-l-[#18D3A7] md:border-l-0 md:border-t-4 md:h-full md:border-t-[#18D3A7] pl-4 md:pt-5 md:pl-0">
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] md:text-2xl font-semibold">
              {formatRupiah(data?.amount)}
            </h1>
            <p className="text-[10px]">
              dana yang terkumpul dari total {formatRupiah(data?.target)}
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] font-semibold md:text-xl">
              {data?.count_investor}
            </h1>
            <p className="text-[10px]">investor</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] font-semibold md:text-xl">
              {hitungSelisihHari(new Date().toISOString(), data?.end_date)}
            </h1>
            <p className="text-[10px]">hari tersisa</p>
          </div>
        </div>
      </div>
      <div className="relative bg-white w-full flex flex-row space-x-6 text-black font-light justify-center items-center py-2">
        {["Deskripsi", "Reward", "FAQ"].map((tab) => (
          <p
            key={tab}
            className={`relative cursor-pointer px-2 py-1`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
            <span
              className={`absolute inset-x-0 bottom-0 mx-auto h-[2px] bg-black transform scale-x-0 transition-transform duration-300 ease-out ${activeTab === tab ? "bg-black scale-x-100" : ""}`}
              style={
                activeTab === tab ? {} : { transformOrigin: "center bottom" }
              }
            ></span>
          </p>
        ))}
      </div>
      <div className="w-full max-w-[1100px] min-h-[600px] flex justify-center">
        {renderActiveTab()}
      </div>
    </div>
  );
}

export default InvestorDetail;
