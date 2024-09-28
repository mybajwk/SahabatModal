import React from "react";
import FinancialCard from "./financial_card";
import FinancialUpload from "./financial_upload";

interface FinancialReportData {
  title: string;
  description: string;
}

const financialData: FinancialReportData[] = [
  {
    title: "Laporan Keuangan 1",
    description:
      "Laporan keuangan ini masih memerlukan rincian lebih lanjut mengenai beberapa aspek penting, seperti penjelasan mendalam mengenai komposisi liabilitas jangka panjang, detail mengenai investasi yang dilakukan, serta aliran kas yang digunakan untuk pembiayaan. Selain itu, analisis terkait efisiensi biaya operasional dan margin keuntungan juga kurang mendetail, sehingga sulit untuk mengevaluasi tingkat profitabilitas perusahaan secara menyeluruh. Bagian arus kas pembiayaan juga bisa lebih jelas jika mencantumkan sumber utama dana yang diperoleh atau pembayaran yang dilakukan.",
  },
  {
    title: "Laporan Keuangan 2",
    description:
      "Laporan keuangan ini masih memerlukan rincian lebih lanjut mengenai beberapa aspek penting, seperti penjelasan mendalam mengenai komposisi liabilitas jangka panjang, detail mengenai investasi yang dilakukan, serta aliran kas yang digunakan untuk pembiayaan. Selain itu, analisis terkait efisiensi biaya operasional dan margin keuntungan juga kurang mendetail, sehingga sulit untuk mengevaluasi tingkat profitabilitas perusahaan secara menyeluruh. Bagian arus kas pembiayaan juga bisa lebih jelas jika mencantumkan sumber utama dana yang diperoleh atau pembayaran yang dilakukan.",
  },
  {
    title: "Laporan Keuangan 3",
    description:
      "Laporan keuangan ini masih memerlukan rincian lebih lanjut mengenai beberapa aspek penting, seperti penjelasan mendalam mengenai komposisi liabilitas jangka panjang, detail mengenai investasi yang dilakukan, serta aliran kas yang digunakan untuk pembiayaan. Selain itu, analisis terkait efisiensi biaya operasional dan margin keuntungan juga kurang mendetail, sehingga sulit untuk mengevaluasi tingkat profitabilitas perusahaan secara menyeluruh. Bagian arus kas pembiayaan juga bisa lebih jelas jika mencantumkan sumber utama dana yang diperoleh atau pembayaran yang dilakukan.",
  },
];

function FinancialStatement() {
  return (
    <div className="bg-[#FAFAFA] font-poppins flex flex-col border border-[#E6E6E6] rounded-md">
      <div className="w-full text-center ">
        <h2 className="text-[#1A1A1A] text-sm font-semibold border-b  border-[#E6E6E6] px-3 py-4 md:text-start">
          Laporan Keuangan
        </h2>
        <div className="bg-[#FFFFFF] px-8 py-4 flex flex-col space-y-5">
          {financialData.map((report, index) => (
            <FinancialCard
              key={index}
              title={report.title}
              description={report.description}
            />
          ))}
          <FinancialUpload newNumber={financialData.length + 1} />
        </div>
      </div>
    </div>
  );
}

export default FinancialStatement;
