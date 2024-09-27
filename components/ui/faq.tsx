"use client";  // This marks the component as a Client Component

import React, { useState } from 'react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md my-4 p-4 transition-all hover:shadow-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Question text styled with Lexend */}
        <h3 className="text-3xl text-black font-medium text-lg font-lexend">{question}</h3>
        {/* Chevron icon with black color */}
        <span className={`transform transition-transform text-black ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <p className="mt-4 text-gray-600 text-xl font-lexend">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { question: "Apa itu Sahabat Modal?", answer: "Sahabat Modal adalah platform yang memberikan solusi bagi UMKM dan startup melalui investasi parsial dan inkubasi." },
    { question: "Bagaimana cara menggunakan platform ini?", answer: "Untuk menggunakan platform ini, cukup daftar sebagai pengguna, pilih proyek yang ingin Anda investasikan/dapatkan investasinya." },
    { question: "Apa keuntungan bagi investor?", answer: "Investor mendapatkan keuntungan dari pertumbuhan usaha yang mereka dukung, serta berbagai manfaat lainnya seperti bagi hasil, hadiah jasa/barang, dan lainnya." },
    { question: "Siapa saja yang bisa mendaftar sebagai pengguna?", answer: "Siapa pun bisa mendaftar, baik sebagai UMKM yang butuh pendanaan, maupun sebagai investor yang ingin mendukung usaha." },
  ];

  return (
    <section
      className="min-h-screen bg-cover bg-center text-white py-96"
      style={{
        backgroundImage: "url('/faq.png')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-0">
        {/* Add margin or padding above the FAQ items */}
        <div className="md:ml-[300px] lg:ml-[350px] xl:ml-[400px]">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
