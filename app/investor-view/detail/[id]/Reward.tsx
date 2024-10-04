"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import AvailableReward from "./AvailableReward";
import RewardCard from "./RewardCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Reward({
  id,
  amount,
  setAmount,
}: {
  id: string;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}) {
  const [selectedItem, setSelectedItem] = useState<
    | undefined
    | {
        title: string;
        milestone: number;
        rewards: {
          imageSrc: string;
          title: string;
          quantity: number;
          id: string;
          desc: string;
        }[];
      }
  >();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | undefined>();

  const router = useRouter();
  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(`/api/investor-view/${id}/reward`);
        console.log("tes", dataFetch);
        setData(dataFetch.data);
      } catch (error) {
        console.log(error);
        return router.push("/");
        // return null;
      }
    };

    get();
  }, []);

  const [items, setItems] = useState<
    {
      imageSrc: string;
      title: string;
      quantity: number;
      id: string;
      desc: string;
    }[]
  >([]);

  const calcReward = (amount: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = data?.data?.sort(
      (a: { milestone: number }, b: { milestone: number }) =>
        b.milestone - a.milestone,
    ) as {
      title: string;
      milestone: number;
      rewards: {
        imageSrc: string;
        title: string;
        quantity: number;
        id: string;
        desc: string;
      }[];
    }[];
    let c: {
      imageSrc: string;
      title: string;
      quantity: number;
      id: string;
      desc: string;
    }[] = [];
    if (r) {
      for (let i = 0; i < r.length; i++) {
        if (r[i].rewards[0].quantity <= amount) {
          c = r[i].rewards;
          break;
        }
      }
    }

    return c;
  };

  const [select, setSelect] = useState<string | undefined>("");

  useEffect(() => {
    const items = calcReward(amount);
    setItems(items);
    if (items.length > 0) {
      setSelect(items[0].id);
    } else {
      setSelect(undefined);
    }
  }, [amount]);
  const onContinue: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(
      `/investor-view/order-summary?a=${amount}&id=${id}&idr=${select}`,
    );
  };
  return (
    <div className="flex font-lexend flex-col md:flex-row md:space-y-0 space-y-8 p-6 lg:p-14 w-full md:justify-between">
      <div className="flex flex-col space-y-2 md:flex-1">
        <h1
          style={{
            textShadow:
              "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
          }}
          className="drop-shadow-text-white font-bold text-center w-full md:text-start md:text-2xl mb-4"
        >
          Reward yang Tersedia
        </h1>
        {data?.data ? (
          data.data.map(
            (
              item: {
                title: string;
                milestone: number;
                rewards: {
                  imageSrc: string;
                  title: string;
                  quantity: number;
                  id: string;
                  desc: string;
                }[];
              },
              index: number,
            ) => (
              <AvailableReward
                key={index}
                title={item.title}
                milestone={item.milestone}
                items_num={item.rewards.length}
                onClick={() => setSelectedItem(item)}
                isActive={selectedItem?.title === item.title}
              />
            ),
          )
        ) : (
          <p className="py-20 w-full text-center text-white font-lexend text-lg">
            Tidak ada Reward
          </p>
        )}
        {/* {dummyData.map((item, index) => (
          <AvailableReward
            key={index}
            title={item.title}
            milestone={item.milestone}
            items_num={item.rewards.length}
            onClick={() => setSelectedItem(item)}
            isActive={selectedItem === item}
          />
        ))} */}
      </div>
      <form onSubmit={onContinue} className="flex-1 px-2 flex flex-col gap-2">
        <p className="text-white text-base font-lexend">Amount</p>
        <Input
          className="bg-white text-[#9EA2AD] text-xs w-full"
          required
          placeholder="Rp1000.000,00"
          onChange={(e) =>
            setAmount((prev) =>
              !isNaN(parseInt(e.target.value))
                ? parseInt(e.target.value)
                : prev,
            )
          }
          value={amount}
        ></Input>
        {items.length > 0 && (
          <>
            <p className="text-white text-base font-lexend">Reward</p>

            <Select onValueChange={setSelect} defaultValue={select}>
              <SelectTrigger className="w-full font-lexend border-[#9EA2AD] text-base text-[#9EA2AD] bg-white">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>

              <SelectContent className="font-lexend text-[#9EA2AD] text-[24px] max-h-[400px]">
                {items.map((item) => (
                  <SelectItem
                    key={item.id}
                    className="text-[24px]"
                    value={item.id}
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
        <Button className="bg-green-gradient2 mt-4 rounded-lg">
          Investasikan
        </Button>
      </form>
      <div className="flex flex-col space-y-3 md:flex-1">
        {selectedItem?.rewards.map((reward, index) => (
          <RewardCard
            key={index}
            title={reward.title}
            min_amount={reward.quantity}
            imageSrc={reward.imageSrc}
            amount={amount}
            setAmount={setAmount}
            id={reward.id}
            desc={reward.desc}
          />
        ))}
      </div>
    </div>
  );
}

export default Reward;
