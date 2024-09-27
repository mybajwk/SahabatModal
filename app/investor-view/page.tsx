"use client";

import SearchBar from "@/components/ui/searchbar";
import React, { useEffect, useState } from "react";
import MouCard from "../components/investor/mou-card";
import bubbleBgHorizontal from "../assets/horizontal-bubble.png";
import bubbleBgVertical from "../assets/vertical-bubble.png";
import barista from "../assets/barista.png";
import Image from "next/image";
import leftCircle from "../assets/kiri.png";
import rightCircle from "../assets/kanan.png";
import middleCircle from "../assets/tengah.png";

const dummyValue = [
  {
    imageSrc: barista,
    progressValue: 33,
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    title: "Kopi Kenalan",
    owner: "Asep Hendriadi",
    daysLeft: 24,
  },
  {
    imageSrc: barista,
    progressValue: 50,
    avatarSrc: "https://github.com/username1.png",
    avatarFallback: "AB",
    title: "Cafe Nusantara",
    owner: "Budi Santoso",
    daysLeft: 12,
  },
  {
    imageSrc: barista,
    progressValue: 75,
    avatarSrc: "https://github.com/username2.png",
    avatarFallback: "XY",
    title: "Warung Kopi Bali",
    owner: "Cahyo Widodo",
    daysLeft: 5,
  },
  {
    imageSrc: barista,
    progressValue: 20,
    avatarSrc: "https://github.com/username3.png",
    avatarFallback: "DZ",
    title: "Kopi Hitam Manis",
    owner: "Dewi Kartika",
    daysLeft: 30,
  },
  {
    imageSrc: barista,
    progressValue: 50,
    avatarSrc: "https://github.com/username1.png",
    avatarFallback: "AB",
    title: "Cafe Nusantara",
    owner: "Budi Santoso",
    daysLeft: 12,
  },
  {
    imageSrc: barista,
    progressValue: 75,
    avatarSrc: "https://github.com/username2.png",
    avatarFallback: "XY",
    title: "Warung Kopi Bali",
    owner: "Cahyo Widodo",
    daysLeft: 5,
  },
  {
    imageSrc: barista,
    progressValue: 20,
    avatarSrc: "https://github.com/username3.png",
    avatarFallback: "DZ",
    title: "Kopi Hitam Manis",
    owner: "Dewi Kartika",
    daysLeft: 30,
  },
  {
    imageSrc: barista,
    progressValue: 50,
    avatarSrc: "https://github.com/username1.png",
    avatarFallback: "AB",
    title: "Cafe Nusantara",
    owner: "Budi Santoso",
    daysLeft: 12,
  },
  {
    imageSrc: barista,
    progressValue: 75,
    avatarSrc: "https://github.com/username2.png",
    avatarFallback: "XY",
    title: "Warung Kopi Bali",
    owner: "Cahyo Widodo",
    daysLeft: 5,
  },
  {
    imageSrc: barista,
    progressValue: 20,
    avatarSrc: "https://github.com/username3.png",
    avatarFallback: "DZ",
    title: "Kopi Hitam Manis",
    owner: "Dewi Kartika",
    daysLeft: 30,
  },
];

function Page() {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    console.log(query);
  }, [query]);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Function to update `isMobile` state based on window width
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true); // Consider mobile if width is less than 768px (Tailwind `md` breakpoint)
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Check screen width when component mounts
    handleResize();

    // Add event listener to track screen resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-conic-blue flex-col space-y-6 items-center py-[100px] font-lexend relative">
      <div className="absolute top-0 left-[-20px] md:w-48 md:h-48 z-[1]">
        <Image
          src={leftCircle}
          alt="bg-layer"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute top-[-110px] md:w-48 md:h-48 z-[1]">
        <Image
          src={middleCircle}
          alt="bg-layer"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute top-[-30px] right-0 md:w-48 md:h-48 z-[1]">
        <Image
          src={rightCircle}
          alt="bg-layer"
          fill
          className="object-contain"
        />
      </div>
      <SearchBar onSearchChange={setQuery} />
      <div className="flex flex-col md:flex-row-reverse space-y-3 px-10">
        <div
          className="w-full md:max-w-[200px] md:max-h-[600px] md:mt-5 rounded-xl flex flex-col space-y-2 p-4"
          style={{
            backgroundImage: `url(${
              isMobile ? bubbleBgHorizontal.src : bubbleBgVertical.src
            })`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="w-full font-bricolage font-semibold text-2xl">
            Kategori
          </h1>
          <ul className="flex flex-row md:flex-col md:space-x-0 space-x-2 flex-wrap">
            <li>fashion</li>
            <li>kuliner</li>
            <li>pertanian</li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:flex-row md:flex-wrap md:space-y-0 md:justify-center space-y-5">
          {dummyValue.map((item, index) => {
            return (
              <MouCard
                imageSrc={item.imageSrc}
                progressValue={item.progressValue}
                avatarSrc={item.avatarSrc}
                avatarFallback={item.avatarFallback}
                title={item.title}
                owner={item.owner}
                daysLeft={item.daysLeft}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
