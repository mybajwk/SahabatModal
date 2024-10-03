"use client";

import SearchBar from "@/components/ui/searchbar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PerusahaanCard from "./PerusahaanCard";
import axios from "axios";
import { MentoringFormattedData } from "../utils/Mentoring";
import { useSession } from "next-auth/react";

function formatDateToWIB(date: Date | null): string {
  if (!date) return "";

  // Convert to Jakarta timezone and format
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
    timeZone: "Asia/Jakarta", // Set the time zone to WIB (Western Indonesian Time)
  };

  try {
    // Convert the date to the desired time zone using toLocaleString
    const formattedDate = date.toLocaleString("en-GB", options);

    // Replace slashes with dashes and append "WIB"
    return `${formattedDate.replace(/\//g, "-")} WIB`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

function MentorPage() {
  const [, setQuery] = useState("");

  const [requests, setRequests] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/mentoring");
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching forum data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen w-full text-white font-lexend p-8 md:px-32 md:py-10"
      style={{
        backgroundImage: 'url("./bg_main.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex text-sm flex-col space-y-3 ">
        <p>Hallo, {session ? session.user.name : "John Doe"} </p>
        <div className="px-4 text-sm py-1 rounded-full border-2 border-white w-fit">
          Digital Marketing
        </div>
      </div>
      <div className="flex flex-row space-x-6 pt-6 justify-center">
        <SearchBar onSearchChange={setQuery} />
        <Button className="bg-blue-gradient-radial shadow-custom-shadow-blue-button rounded-full ">
          Filter
        </Button>
      </div>
      <div className="flex flex-col space-y-4 mt-5 w-full items-center">
        {requests.map((data: MentoringFormattedData, index) => (
          <PerusahaanCard
            key={index}
            imageUrl={data.businessImage || ""}
            namaPerusahaan={data.businessName || ""}
            namaPemilik={data.businessOwnerName || ""}
            topic={data.mentoringTopic}
            tanggal={formatDateToWIB(data.mentoringDate)}
            pengajuanId={data.mentoringId}
          />
        ))}
      </div>
    </div>
  );
}

export default MentorPage;
