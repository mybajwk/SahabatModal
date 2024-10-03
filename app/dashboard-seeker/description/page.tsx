import React from "react";
import PageContent from "./page-content";
import FAQCard from "@/app/investor-view/detail/[id]/FAQCard";

const DashSeekerDescPage = () => {
  return (
    <div className="flex flex-col md:px-10 md:py-6 px-6 py-4 justify-center items-center ">
      <h1
        className="w-full mb-5 text-white text-center font-lexend text-[40px] md:text-[44px] font-semibold"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
        Deskripsi
      </h1>
      <div className="w-full flex justify-center items-center sm:w-[80%] ">
        <PageContent content="<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>" />
      </div>

      <h1
        className="w-full mb-5 text-white text-center font-lexend text-[40px] md:text-[44px] font-semibold"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
        FAQ
      </h1>
      <div className="flex w-full md:w-[80%] flex-col justify-center items-center gap-4">
        {["", ""].map((i, index) => (
          <FAQCard
            key={index}
            question="Ini apa yaa?"
            answer="kamu keren sekalii"
          />
        ))}
      </div>
    </div>
  );
};

export default DashSeekerDescPage;
