"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../../components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import FormFundingAddReward, {
  FormFundingRewardSchema,
} from "../../components/form-funding-add-reward";
import { z } from "zod";
import Image from "next/image";
import { Separator } from "../../components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface FundingBasicPageProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  id?: string;
  setStatus: Dispatch<SetStateAction<number | undefined>>;
}

const FundingRewardPage: React.FC<FundingBasicPageProps> = ({
  setCurrentPage,
  setStatus,
  id,
}) => {
  const [statePage, setStatePage] = useState("list");
  const [rewards, setRewards] = useState<
    z.infer<typeof FormFundingRewardSchema>[]
  >([]);

  const addReward = (r: z.infer<typeof FormFundingRewardSchema>) => {
    setRewards((prev) => [...prev, r]);
  };

  const removeReward = (index: number) => {
    setRewards((prev) => [...prev.splice(0, index), ...prev.splice(index + 1)]);
  };
  const onAdd = () => {
    setStatePage("add");
  };
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const { toast } = useToast();

  const onSubmit = async () => {
    console.log(rewards);
    try {
      if (id) {
        await axios.post(`/api/crowdfunding/${id}/reward`, {
          reward: rewards,
        });
        toast({
          variant: "default",
          title: "Submit successfull",
        });
        setStatus((prev) => {
          if (prev) {
            if (prev <= 2) {
              return 2;
            } else {
              return prev;
            }
          } else {
            return 2;
          }
        });
        setCurrentPage("desc");
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Submit failed",
      });
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <section className="bg-white w-[70%] z-[5] rounded-lg flex flex-col gap-5 py-10 px-10 justify-center items-center">
        {statePage === "list" ? (
          <>
            <div className="flex flex-row items-center w-full justify-between">
              <h1 className="font-lexend text-[28px] font-[500] text-black">
                ITEM REWARD
              </h1>
              <Button
                className="text-white py-6 bg-black flex flex-row items-center justify-center gap-4"
                onClick={onAdd}
              >
                <Plus className="size-6" />
                <p className="font-lexend text-[24px] font-[300]">New Item</p>
              </Button>
            </div>
            <div className="flex flex-col justify-center gap-6 items-center w-full">
              {rewards.map((r, i) => (
                <>
                  <div className="flex flex-row gap-8  items-center w-full relative">
                    <Trash2
                      className="absolute size-6 text-red-500 hover:text-red-700 bottom-4 right-4"
                      onClick={() => removeReward(i)}
                    />
                    <figure className="size-[250px] relative border border-[#C9C9C9] rounded-md overflow-hidden">
                      <Image
                        src={
                          typeof r.itemImage === "string"
                            ? r.itemImage
                            : r.itemImage
                              ? URL.createObjectURL(r.itemImage)
                              : ""
                        } //ganti disini
                        alt="reward image"
                        fill
                        className="object-cover "
                      />
                    </figure>
                    <div className="w-full font-lexend text-black flex flex-col ">
                      <h2 className="text-2xl font-bold">{r.itemTitle}</h2>
                      <h4 className="text-lg font-semibold">{r.itemType}</h4>
                      <h4 className="text-lg font-semibold">
                        {formatRupiah(r.fundLimit)}
                      </h4>
                      <p className="text-base font-normal">{r.itemDesc}</p>
                    </div>
                  </div>
                  <Separator className="h-[3px] text-[#DDD]" />
                </>
              ))}
              {
                <div className="w-full flex justify-center items-center">
                  <Button
                    onClick={onSubmit}
                    className="font-lexend text-[24px] px-12 hover:bg-black/70 py-5 text-white bg-black flex flex-row items-center justify-center gap-3"
                  >
                    Save
                  </Button>
                </div>
              }
            </div>
          </>
        ) : (
          <FormFundingAddReward
            setStatePage={setStatePage}
            addReward={addReward}
          />
        )}
      </section>
    </div>
  );
};

export default FundingRewardPage;
