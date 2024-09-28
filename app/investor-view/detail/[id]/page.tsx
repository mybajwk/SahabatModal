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
    <div className="relative bg-conic-blue font-lexend flex flex-col items-center">
      <div className="flex flex-col items-center space-y-5 p-16">
        <video width="240" height="320" controls>
          <source src="@/app/assets/video.mp4" type="video/mp4" />
        </video>
        <div className="flex flex-col items-start space-y-3 border-l-4 border-l-[#18D3A7] pl-4">
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] font-semibold">Rp20.000.000,00</h1>
            <p className="text-[10px]">
              dana yang terkumpul dari total Rp100.000.000,00
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] font-semibold">10</h1>
            <p className="text-[10px]">investor</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#18D3A7] font-semibold">10</h1>
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
      <div className="w-full max-w-[900px] flex justify-center">
        {" "}
        {renderActiveTab()}
      </div>
    </div>
  );
}

export default InvestorDetail;
