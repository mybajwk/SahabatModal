/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import Image from "next/image";
import sephora from "../../../assets/sephora.png";
import { useRouter } from "next/navigation";

interface MentoringData {
  businessName: string;
  businessImage: string;
  description: string;
}

function Page({ params }: { params: { pengajuanId: string } }) {
  const [mentoringData, setMentoringData] = useState<MentoringData | null>(
    null
  );
  const router = useRouter();
  useEffect(() => {
    const fetchMentoringData = async () => {
      try {
        const response = await fetch(`/api/mentoring/${params.pengajuanId}`);
        const data = await response.json();
        setMentoringData(data.data);
      } catch (error) {
        console.error("Error fetching mentoring data:", error);
      }
    };

    fetchMentoringData();
  }, []);

  const navigateToMentor = () => {
    router.push("/mentor"); // Redirects to the /mentor page
  };

  return (
    <div
      className="flex justify-center min-h-screen w-full"
      style={{
        backgroundImage: 'url("./bg_main.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex font-lexend min-h-screen w-full items-center py-16 px-5 relative flex-col space-y-7 max-w-[600px]">
        <div
          onClick={navigateToMentor}
          className="hover:cursor-pointer absolute flex justify-center items-center left-2 top-3 md:top-10 md:left-0 md:w-[45px] w-[30px] aspect-square rounded-full bg-light-linear-yellow"
        >
          <FaArrowLeft className="text-black" />
        </div>
        <h1 className="md:text-2xl">DETAIL PENGAJUAN MENTORING</h1>
        {/* <div className="flex flex-row text-[6px] items-center w-full shadow-custom-inset rounded-full py-2 px-4">
          <Avatar className="w-[40px] md:w-[60px] md:h-[60px] aspect-square">
            <AvatarImage
              className="object-center object-cover"
              src={avatarSrc.src}
            />
            <AvatarFallback className="text-black">EC</AvatarFallback>
          </Avatar>
          <div className="flex flex-row items-center border-white border rounded-full pr-3">
            <div className="text-[8px] md:text-sm px-3 rounded-full border-white border-r shadow-custom-inset flex items-center justify-center">
              John Doe Agustino
            </div>
            <p className="ml-3 md:text-sm">
              Mentoring Digital Marketing untuk UMKM
            </p>
          </div>
        </div> */}
        <div className="flex flex-row w-full justify-start space-x-4 text-[10px]">
          <button className="flex flex-row items-center space-x-1 bg-orange-linear rounded-full hover:cursor-pointer w-1/3 md:w-auto md:pr-3">
            <div className="aspect-square h-full bg-white rounded-full flex justify-center items-center">
              <MdFileUpload className="text-black w-full" />
            </div>
            <p className="text-nowrap md:text-sm"> Upload Materi</p>
          </button>
          <button className="px-3 py-1 bg-green-gradient rounded-full hover:cursor-pointer md:text-sm">
            Upload Link Zoom
          </button>
        </div>
        <div className="flex flex-col space-y-3 shadow-custom-inset rounded-3xl max-w-[400px]">
          <div className="w-full max-w-[300px] place-self-center px-2 py-3">
            <Image
              src={mentoringData?.businessImage || sephora}
              alt="thumbnail"
              width={50}
              height={50}
              sizes="100vw"
              className="object-cover rounded-lg object-center w-full"
            />
          </div>

          <div className="flex flex-col space-y-2 rounded-3xl shadow-custom-inset">
            <div className="w-full py-3 shadow-custom-shadow-blue-button bg-purple-gradient-radial rounded-full flex justify-center items-center">
              {mentoringData?.businessName}
            </div>
            <p className="text-xs px-5 py-3 text-justify shadow-text-white">
              {mentoringData?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
