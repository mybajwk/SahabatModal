import React from "react";
import sephora from "../assets/sephora.png";
import { StaticImageData } from "next/image";
import InvestmentHistoryCard from "./InvestmentHistoryCard";

export interface HistoryItem {
  id: number;
  date: string;
  companyName: string;
  amount: string;
  thumbnailUrl: string | StaticImageData;
  disbursementDate: string;
}

const History: React.FC = () => {
  const historyData: HistoryItem[] = [
    {
      id: 1,
      date: "03 Oktober 2024",
      companyName: "PT. Larisso Jaya",
      amount: "Rp10.000.000,00",
      thumbnailUrl: sephora,
      disbursementDate: "10 Oktober 2024",
    },
    {
      id: 2,
      date: "03 Oktober 2024",
      companyName: "PT. Larisso Jaya",
      amount: "Rp10.000.000,00",
      thumbnailUrl: sephora,
      disbursementDate: "10 Oktober 2024",
    },
    {
      id: 3,
      date: "03 Oktober 2024",
      companyName: "PT. Larisso Jaya",
      amount: "Rp10.000.000,00",
      thumbnailUrl: sephora,
      disbursementDate: "10 Oktober 2024",
    },
  ];

  return (
    <div className="bg-conic-blue min-h-screen font-lexend flex flex-col items-center py-8">
      <h1
        className="text-[28px] font-semibold"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
        Histori Investasi
      </h1>
      <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-8 w-full">
        {historyData.map((item) => (
          <InvestmentHistoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default History;
