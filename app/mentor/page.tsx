"use client";

import SearchBar from "@/components/ui/searchbar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PerusahaanCard from "./PerusahaanCard";
import imageUrl from "../assets/mawar.jpeg";

function MentorPage() {
  const [, setQuery] = useState("");

  const dummyData = [
    {
      imageUrl: imageUrl,
      namaPerusahaan: "PT Maju Terus",
      namaPemilik: "Andi Setiawan",
      topic: "Innovasi dalam Pemasaran Digital",
      tanggal: "20-09-2024, 10:00:00 WIB",
    },
    {
      imageUrl: imageUrl,
      namaPerusahaan: "PT Berkah Jaya",
      namaPemilik: "Budi Raharjo",
      topic: "Strategi Bisnis untuk Startup",
      tanggal: "21-09-2024, 11:00:00 WIB",
    },
    {
      imageUrl: imageUrl,
      namaPerusahaan: "PT Kreatif Inovasi",
      namaPemilik: "Charlie Van Houten",
      topic: "Pentingnya Kreativitas dalam Produk",
      tanggal: "22-09-2024, 12:00:00 WIB",
    },
    {
      imageUrl: imageUrl,
      namaPerusahaan: "PT Solusi Teknologi",
      namaPemilik: "Dewi Sartika",
      topic: "Teknologi Terbaru dalam Manufaktur",
      tanggal: "23-09-2024, 13:00:00 WIB",
    },
    {
      imageUrl: imageUrl,
      namaPerusahaan: "PT Adil Makmur",
      namaPemilik: "Eko Wahyudi",
      topic: "Etika Bisnis dalam Globalisasi",
      tanggal: "24-09-2024, 14:00:00 WIB",
    },
  ];

  return (
    <div className="min-h-screen w-full text-white font-lexend p-8 md:px-32 md:py-10">
      <div className="flex text-sm flex-col space-y-3 ">
        <p>Hallo, John Doe!</p>
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
        {dummyData.map((data, index) => (
          <PerusahaanCard
            key={index}
            imageUrl={data.imageUrl}
            namaPerusahaan={data.namaPerusahaan}
            namaPemilik={data.namaPemilik}
            topic={data.topic}
            tanggal={data.tanggal}
          />
        ))}
      </div>
    </div>
  );
}

export default MentorPage;
