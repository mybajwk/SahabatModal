"use client";

import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface FundingStepPageProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string | undefined>>;
  setStatus: Dispatch<SetStateAction<number | undefined>>;
  status?: number;
  id?: string;
}

const FundingStepPage: React.FC<FundingStepPageProps> = ({
  setCurrentPage,
  status,
  setId,
  setStatus,
  id,
}) => {
  const { toast } = useToast();
  const onChooseCategory = async () => {
    try {
      if (id) {
        await axios.delete(`/api/crowdfunding/${id}`);

        toast({
          variant: "default",
          title: "Delete success",
        });
        setId(undefined);
        setStatus(undefined);
        setCurrentPage("judul");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submit failed",
      });
    }
  };

  const onSubmit = async () => {
    try {
      if (id) {
        await axios.post(`/api/crowdfunding/${id}/all`);

        toast({
          variant: "default",
          title: "Submit success",
        });
        setId(undefined);
        setStatus(undefined);
        setCurrentPage("judul");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submit failed",
      });
    }
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
          onClick={() => {
            if (status && status >= 0) {
              setCurrentPage("basic");
            } else {
              toast({
                variant: "destructive",
                title: "Harus diisi secara berurutan",
              });
            }
          }}
          className="flex flex-row cursor-pointer hover:scale-[1.01] transition-all p-8 gap-6 bg-white bg-opacity-[2%] rounded-lg border border-[#D9D9D9] backdrop-blur-[6px] shadow-custom-inset"
        >
          <div className="flex justify-center relative items-center w-[78px] h-[78px]">
            <Image
              src={
                status
                  ? status >= 1
                    ? "/img/green-check.png"
                    : "/img/grey-check.png"
                  : "/img/grey-check.png"
              }
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
          onClick={() => {
            if (status && status >= 1) {
              setCurrentPage("reward");
            } else {
              toast({
                variant: "destructive",
                title: "Harus diisi secara berurutan",
              });
            }
          }}
          className="flex flex-row cursor-pointer hover:scale-[1.01] transition-all p-8 gap-6 bg-white bg-opacity-[2%] rounded-lg border border-[#D9D9D9] backdrop-blur-[6px] shadow-custom-inset"
        >
          <div className="flex justify-center relative items-center w-[78px] h-[78px]">
            <Image
              src={
                status
                  ? status >= 2
                    ? "/img/green-check.png"
                    : "/img/grey-check.png"
                  : "/img/grey-check.png"
              }
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
          onClick={() => {
            if (status && status >= 2) {
              setCurrentPage("desc");
            } else {
              toast({
                variant: "destructive",
                title: "Harus diisi secara berurutan",
              });
            }
          }}
          className="flex flex-row cursor-pointer hover:scale-[1.01] transition-all p-8 gap-6 bg-white bg-opacity-[2%] rounded-lg border border-[#D9D9D9] backdrop-blur-[6px] shadow-custom-inset"
        >
          <div className="flex justify-center relative items-center w-[78px] h-[78px]">
            <Image
              src={
                status
                  ? status >= 3
                    ? "/img/green-check.png"
                    : "/img/grey-check.png"
                  : "/img/grey-check.png"
              }
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
      <div className="flex z-[4] flex-row w-full justify-center items-center gap-4">
        <Button
          type="button"
          onClick={onChooseCategory}
          className="rounded-full px-10 hover:bg-transparent text-[24px] bg-transparent py-6 text-[#18D3A7] font-lexend border-[#18D3A7] border"
        >
          Delete
        </Button>
        {status === 3 && (
          <Button
            type="button"
            onClick={onSubmit}
            className="rounded-full px-10 text-[24px] py-6 text-white font-lexend bg-green-gradient"
          >
            Submit all
          </Button>
        )}
      </div>
    </section>
  );
};

export default FundingStepPage;
