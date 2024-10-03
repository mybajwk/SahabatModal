"use client";

import React, { useEffect, useState } from "react";

import bubbleBgHorizontal from "../assets/horizontal-bubble.png";
import bubbleBgVertical from "../assets/vertical-bubble.png";
import barista from "../assets/barista.png";
import Image, { StaticImageData } from "next/image";
import leftCircle from "../assets/kiri.png";
import rightCircle from "../assets/kanan.png";
import middleCircle from "../assets/tengah.png";

import { Heart, Eye } from "lucide-react";

interface Article {
  id: number;
  title: string;
  image: string;
  views: number;
  likes: number;
}

const articles: Article[] = [
  {
    id: 1,
    title: "9 Kiat UMKM Sukses di Era Digital",
    image: "/artikel1.png",
    views: 1200,
    likes: 120,
  },
  {
    id: 2,
    title: "What Is the Purpose of Business Operational Management?",
    image: "/artikel1.png",
    views: 1100,
    likes: 95,
  },
  {
    id: 3,
    title: "Strategi Pemasaran Digital untuk Tahun 2024",
    image: "/artikel1.png",
    views: 950,
    likes: 105,
  },
  {
    id: 4,
    title: "Cara Meningkatkan Bisnis Online Anda",
    image: "/artikel1.png",
    views: 1500,
    likes: 140,
  },
  {
    id: 5,
    title: "Pentingnya Umpan Balik Pelanggan dalam E-commerce",
    image: "/artikel1.png",
    views: 860,
    likes: 89,
  },
  {
    id: 6,
    title: "Media Sosial dan Pertumbuhan Bisnis",
    image: "/artikel1.png",
    views: 1250,
    likes: 132,
  },
  {
    id: 7,
    title: "Memanfaatkan Analitik untuk Peningkatan Kinerja Penjualan",
    image: "/artikel1.png",
    views: 1030,
    likes: 98,
  },
  {
    id: 8,
    title: "Iklan Efektif dengan Anggaran Terbatas",
    image: "/artikel1.png",
    views: 1400,
    likes: 115,
  },
  {
    id: 9,
    title: "Membangun Merek melalui Media Sosial",
    image: "/artikel1.png",
    views: 1650,
    likes: 150,
  },
  {
    id: 10,
    title: "Peran Teknologi dalam Bisnis Modern",
    image: "/artikel1.png",
    views: 980,
    likes: 90,
  },
  {
    id: 11,
    title: "Mengoptimalkan Situs Web Anda untuk Meningkatkan Keterlibatan",
    image: "/artikel1.png",
    views: 1110,
    likes: 103,
  },
  {
    id: 12,
    title: "Masa Depan Kerja Jarak Jauh dan Dampaknya terhadap Bisnis",
    image: "/artikel1.png",
    views: 1340,
    likes: 121,
  },
];
function Page() {
  return (
    <div className="bg-gray-900 min-h-screen p-4 px-10">
      <h1 className="text-2xl font-bold text-white mb-6 border-b border-blue-500 pb-2">
        DAFTAR ARTIKEL
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-48">
              <Image
                src={article.image}
                alt={article.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Article
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white mb-2">
                {article.title}
              </h2>
              <div className="flex justify-between text-gray-400 text-sm">
                <span className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  {article.views} views
                </span>
                <span className="flex items-center">
                  <Heart size={16} className="mr-1" />
                  {article.likes} likes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
