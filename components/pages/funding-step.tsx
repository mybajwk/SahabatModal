import Image from "next/image";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

interface FundingStepPageProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const FundingStepPage: React.FC<FundingStepPageProps> = ({
  setCurrentPage,
}) => {
  const onChooseCategory = () => {
    setCurrentPage("kategori");
    console.log("tes");
  };
  return (
    <section className="w-screen relative min-h-screen gap-8 px-[200px] py-20 flex flex-col bg-[#443d88]">
      <div className="absolute top-0 left-0 w-screen min-h-screen z-[1]">
        <Image
          src="/img/bg_layer_funding.png"
          alt="bg-layer"
          fill
          className="object-fill"
        />
      </div>
      <div className="z-[2] font-lexend text-white">
        <h1 className="text-[48px] font-light">Pendanaan</h1>
        <h2 className="font-light text-[32px] text-white/70">by Apin88</h2>
        <h4 className="font-medium text-[24px] text-[#F38583]">
          Segera Lengkapi Kelengkapan Pengajuan Pendanaan Anda!!
        </h4>
      </div>
      <div className="flex z-[2] flex-col gap-3">
        <div
          onClick={() => setCurrentPage("basic")}
          className="flex flex-row cursor-pointer hover:scale-[1.01] transition-all p-8 gap-6 bg-white bg-opacity-[2%] rounded-lg border border-[#D9D9D9] backdrop-blur-[6px] shadow-custom-inset"
        >
          <div className="flex justify-center relative items-center w-[78px] h-[78px]">
            <Image
              src="/img/green-check.png"
              alt="green-check"
              fill
              className="object-contain"
            />
          </div>
          <article className="flex flex-1 font-lexend text-white flex-col gap-2">
            <h1 className="text-2xl">BASIC</h1>
            <p className="text-base">
              Beri nama untuk projek Anda, upload gambar atau video, dan berikan
              detail kampanye pendanaan usaha Anda
            </p>
          </article>
        </div>
        <div
          onClick={() => setCurrentPage("basic")}
          className="flex flex-row cursor-pointer hover:scale-[1.01] transition-all p-8 gap-6 bg-white bg-opacity-[2%] rounded-lg border border-[#D9D9D9] backdrop-blur-[6px] shadow-custom-inset"
        >
          <div className="flex justify-center relative items-center w-[78px] h-[78px]">
            <Image
              src="/img/green-check.png"
              alt="green-check"
              fill
              className="object-contain"
            />
          </div>
          <article className="flex flex-1 font-lexend text-white flex-col gap-2">
            <h1 className="text-2xl">REWARD</h1>
            <p className="text-base">
              Tetapkan Reward Anda dan atau tetapkan biaya pengiriman
            </p>
          </article>
        </div>
        <div
          onClick={() => setCurrentPage("basic")}
          className="flex flex-row cursor-pointer hover:scale-[1.01] transition-all p-8 gap-6 bg-white bg-opacity-[2%] rounded-lg border border-[#D9D9D9] backdrop-blur-[6px] shadow-custom-inset"
        >
          <div className="flex justify-center relative items-center w-[78px] h-[78px]">
            <Image
              src="/img/grey-check.png"
              alt="green-check"
              fill
              className="object-contain"
            />
          </div>
          <article className="flex flex-1 font-lexend text-white flex-col gap-2">
            <h1 className="text-2xl">DESKRIPSI</h1>
            <p className="text-base">
              Tambahkan Deskripsi Detail dan Menarik Untuk Pendanaan Usaha Anda
            </p>
          </article>
        </div>
      </div>
      <div className="flex z-[4] flex-row gap-4">
        <Button
          type="button"
          onClick={onChooseCategory}
          className="rounded-full px-10 text-[24px] py-6 text-white font-lexend bg-green-gradient"
        >
          Choose Category
        </Button>
      </div>
    </section>
  );
};

export default FundingStepPage;
