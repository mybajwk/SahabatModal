"use client";

import React, { useState } from "react";
import Deskripsi from "./Deskripsi";
import Reward from "./Reward";
import FAQ from "./FAQ";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InvestorDetail({ params }: { params: { id: string } }) {
  // const { id } = params;
  const [activeTab, setActiveTab] = useState("Deskripsi");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Deskripsi":
        return <Deskripsi />;
      case "Reward":
        return <Reward />;
      case "FAQ":
        return <FAQ />;
      default:
        return <Deskripsi />;
    }
  };

  return (
    <div className="relative bg-conic-blue font-lexend flex flex-col items-center py-8">
      <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6 md:items-start items-center space-y-5 p-8">
        <video className="w-[300px] h-[250px] sm:w-full" controls>
          <source src="@/app/assets/video.mp4" type="video/mp4" />
        </video>
        <div className="flex w-full flex-col items-start space-y-3 border-l-4 border-l-[#18D3A7] md:border-l-0 md:border-t-4 md:h-full md:border-t-[#18D3A7] pl-4 md:pt-5 md:pl-0">
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] md:text-2xl font-semibold">
              Rp20.000.000,00
            </h1>
            <p className="text-[10px]">
              dana yang terkumpul dari total Rp100.000.000,00
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] font-semibold md:text-xl">10</h1>
            <p className="text-[10px]">investor</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] font-semibold md:text-xl">10</h1>
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
