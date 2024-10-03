"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import peopleThumbnail from "@/public/people.png";
import verticalWay from "@/public/vertical-way.png";
import horizontalWay from "@/public/horizontal-way.png";
import forumPNG from "@/public/forum.png";
import FAQCard from "./investor-view/detail/[id]/FAQCard";
import useWindowSize from "@/hooks/useWindowSize";
import { Accordion } from "@/components/ui/accordion";

export default function Home() {
  const benefitSeeker = [
    {
      number: "01",
      title: "Crowdfunding",
      description:
        "Crowdfunding memungkinkan pengumpulan dana untuk seeker oleh banyak investor dengan reward dan perjanjian yang ditentukan oleh seeker",
    },
    {
      number: "02",
      title: "Mentoring",
      description:
        "Mentoring memberikan bantuan kepada seeker dalam hal konsultasi bisnis dengan para ahli di bidangnya.",
    },
    {
      number: "03",
      title: "Networking",
      description:
        "Networking memungkinkan seeker untuk memperluas koneksi bisnisnya dengan bertemu banyak pihak yang tertarik dengan bisnis mereka.",
    },
  ];
  const benefitInvestor = [
    {
      number: "01",
      title: "Pilihan Investasi",
      description:
        "Dengan SahabatModal, para investor lebih mudah melakukan investasi pada seeker yang diminati sesuai dengan profil risiko masing-masing",
    },
    {
      number: "02",
      title: "Jaringan koneksi",
      description:
        "Dengan sistem forum pada SahabatModal, para investor akan lebih mudah mencari koneksi, baik dengan sesama investor maupun dengan seeker",
    },
    {
      number: "03",
      title: "Investasi terpercaya",
      description:
        "Sistem inkubasi pada SahabatModal akan menjamin komitmen yang dimiliki oleh seeker, sehingga investor dapat berinvestasi dengan tenang",
    },
  ];

  const faqData = [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Why use Lorem Ipsum?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      question: "Where does it come from?",
      answer:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
    {
      question: "How many variations exist?",
      answer:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },
    {
      question: "Where can I get some?",
      answer:
        "There are many websites on the Internet that provide Lorem Ipsum passages, and many variants of the text can be found by performing a simple search.",
    },
  ];

  const { width } = useWindowSize();

  return (
    <div
      className="flex min-h-screen w-full flex-col font-bricolage items-center"
      style={{
        backgroundImage: 'url("./bg_main.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col sm:flex-row-reverse sm:space-x-8 sm:pr-8 sm:pl-0 items-center px-8 pb-12 md:pt-12 max-w-[1024px]">
        <Image
          src={peopleThumbnail}
          alt="thumbnail"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-xl object-contain object-center aspect-square sm:ml-8 w-full"
        />
        <div className="flex flex-col space-y-3 md:space-y-10 items-start">
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-center sm:text-start md:pr-24">
            Beri Solusi Melalui Parsial Investasi dan Inkubasi bagi UMKM dan
            Startup.
          </h1>
          <Button className="shadow-custom-bubble bg-transparent lg:text-2xl lg:py-10 rounded-full w-fit place-self-center sm:place-self-start mt-8 px-12 py-5">
            GET STARTED
          </Button>
        </div>
      </div>
      <div
        className="w-full h-[100px]"
        style={{
          backgroundImage: 'url("./iklan.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        style={{
          backgroundImage: 'url("./bg_main.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="flex flex-col items-center w-full space-y-8 py-12 lg:py-32"
      >
        <h1 className="font-semibold text-2xl lg:text-4xl text-center">
          Bagaimana Cara Kerjanya?
        </h1>
        {width && width < 640 && (
          <Image
            src={verticalWay}
            alt="thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-1/3 object-center"
          />
        )}
        {width && width >= 640 && (
          <Image
            src={horizontalWay}
            alt="thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-4/5 object-center max-w-[1024px]"
          />
        )}
      </div>
      <div className="bg-[#3E3183E5] w-full flex flex-col items-center space-y-4 px-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-8 sm:items-center space-y-4 py-8 max-w-[1024px]">
          <div className="flex flex-col space-y-4 items-center sm:items-start">
            <h2 className="font-semibold text-2xl lg:text-3xl text-center sm:text-start">
              Apa Benefit Yang Didapat Oleh Seeker?
            </h2>
            <p className="text-center sm:text-start text-xs lg:text-sm">
              Buka Funding Untuk bisnismu sekarang!!
            </p>
            <Button className="bg-green-gradient rounded-full lg:text-xl px-12 py-6 shadow-custom-chill-green-button">
              START
            </Button>
          </div>
          <div className="flex flex-col space-y-6 py-6 shadow-custom-inset rounded-lg pr-4">
            {benefitSeeker.map((benefit, index) => (
              <div key={index} className="flex flex-row space-x-3">
                <div className="rounded-r-lg flex justify-center pt-4">
                  <p className="bg-white px-4 py-2 rounded-r-lg font-lexend h-fit text-black font-bold">
                    {benefit.number}
                  </p>
                </div>
                <div className="flex flex-col space-y-1 lg:text-lg">
                  <h3>{benefit.title}</h3>
                  <p className="text-[10px] font-poppins font-light lg:text-[12px]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row-reverse sm:space-y-0 sm:items-center space-y-4 py-8 max-w-[1024px]">
          <div className="flex flex-col space-y-4 items-center sm:items-start sm:ml-8">
            <h2 className="font-semibold text-2xl lg:text-3xl text-center sm:text-end">
              Apa Benefit Yang Didapat Oleh Investor?
            </h2>
          </div>
          <div className="flex flex-col space-y-6 py-6 shadow-custom-inset rounded-lg pr-4">
            {benefitInvestor.map((benefit, index) => (
              <div key={index} className="flex flex-row space-x-3">
                <div className="rounded-r-lg flex justify-center pt-4">
                  <p className="bg-white px-4 py-2 rounded-r-lg font-lexend h-fit text-black font-bold">
                    {benefit.number}
                  </p>
                </div>
                <div className="flex flex-col space-y-1 lg:text-lg">
                  <h3>{benefit.title}</h3>
                  <p className="text-[10px] font-poppins font-light lg:text-[12px]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white w-full py-8 lg:py-16 flex flex-col items-center">
        <Image
          src={forumPNG}
          alt="thumbnail"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full object-center max-w-[1024px]"
        />
      </div>
      <div
        style={{
          backgroundImage: 'url("./faq_bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full flex flex-col items-center"
      >
        <div className="max-w-[1024px] flex w-full flex-col md:flex-row md:space-y-0 md:px-8 md:space-x-20 items-center space-y-8 py-12 min-h-[550px]">
          <h1 className="font-semibold text-2xl text-center">
            Frequently Asked Question
          </h1>
          <div className="flex flex-col space-y-5 w-[80%]">
            <Accordion
              type="single"
              collapsible
              className="flex flex-col space-y-6"
            >
              {faqData.map((item, index) => (
                <FAQCard
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  index={index}
                />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
