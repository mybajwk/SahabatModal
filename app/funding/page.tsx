"use client";

import FundingCategoryPage from "./funding-category";
import { useEffect, useState } from "react";
import FundingStepPage from "./funding-step";
import FundingFormNavbar from "./funding-form-navbar";
import Image from "next/image";
import FundingBasicPage from "./funding-basic";
import FundingRewardPage from "./funding-reward";
import FundingDescPage from "./funding-deskripsi";

const FormFundingPage = () => {
  const [currentPage, setCurrentPage] = useState("desc");

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <main className="w-full h-full">
      {currentPage === "kategori" && (
        <FundingCategoryPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "tahapan" && (
        <FundingStepPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage !== "kategori" && currentPage !== "tahapan" && (
        <div className="bg-[#443d88] relative min-h-screen w-screen pt-32">
          <div className="absolute inset-0 z-[1]">
            <Image
              src="/img/bg_layer_funding.png"
              alt="bg-layer"
              fill
              className="object-fill"
            />
          </div>
          <div className="z-[2]  flex flex-col justify-center items-center">
            <h1
              className="font-lexend text-white text-[48px] font-semibold drop-shadow-text-white"
              style={{
                textShadow:
                  "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
              }}
            >
              Pendanaan
            </h1>
            <FundingFormNavbar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="flex justify-center items-center w-full py-10">
            {currentPage === "basic" && (
              <FundingBasicPage setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "reward" && <FundingRewardPage />}
            {currentPage === "desc" && <FundingDescPage />}
          </div>
        </div>
      )}
    </main>
  );
};

export default FormFundingPage;
