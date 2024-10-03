"use client";

import FundingCategoryPage from "./funding-category";
import { useEffect, useState } from "react";
import FundingStepPage from "./funding-step";
import FundingFormNavbar from "./funding-form-navbar";
import Image from "next/image";
import FundingBasicPage from "./funding-basic";
import FundingRewardPage from "./funding-reward";
import FundingDescPage from "./funding-deskripsi";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormFundingPage = () => {
  const [currentPage, setCurrentPage] = useState("judul");
  const [id, setId] = useState<string | undefined>();
  const [status, setStatus] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get("/api/crowdfunding");

        if (resp.data.data.status < 4) {
          setId(resp.data.data.id);
          setStatus(resp.data.data.status);
          setCurrentPage("tahapan");
        } else if (resp.data.data.status === 4) {
          router.push("/dashboard-seeker/description");
        }
      } catch (error) {
        setCurrentPage("judul");
      }
    };
    console.log("effect");
    getData();
  }, []);

  useEffect(() => {
    console.log("c", currentPage);
    console.log("id", id);
    console.log("status", status);
  }, [currentPage, id, status]);

  return (
    <main className="w-full h-full">
      {currentPage === "judul" && (
        <FundingCategoryPage
          setCurrentPage={setCurrentPage}
          setStatus={setStatus}
          setId={setId}
        />
      )}

      {currentPage === "tahapan" && (
        <FundingStepPage
          setCurrentPage={setCurrentPage}
          status={status}
          id={id}
          setId={setId}
          setStatus={setStatus}
        />
      )}

      {currentPage !== "judul" && currentPage !== "tahapan" && (
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
              status={status}
            />
          </div>
          <div className="flex justify-center items-center w-full py-10">
            {currentPage === "basic" && (
              <FundingBasicPage
                setCurrentPage={setCurrentPage}
                setStatus={setStatus}
                id={id}
              />
            )}
            {currentPage === "reward" && (
              <FundingRewardPage
                id={id}
                setCurrentPage={setCurrentPage}
                setStatus={setStatus}
              />
            )}
            {currentPage === "desc" && (
              <FundingDescPage
                id={id}
                setCurrentPage={setCurrentPage}
                setStatus={setStatus}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default FormFundingPage;
