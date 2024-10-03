import React, { useEffect, useState } from "react";

import AvailableReward from "./AvailableReward";
import RewardCard from "./RewardCard";
import { useRouter } from "next/navigation";
import axios from "axios";

function Reward({ id }: { id: string }) {
  const [selectedItem, setSelectedItem] = useState<
    | undefined
    | {
        title: string;
        milestone: number;
        rewards: {
          imageSrc: string;
          title: string;
          quantity: number;
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
  return (
    <div className="flex font-lexend flex-col md:flex-row md:space-y-0 space-y-8 p-6 lg:p-14 w-full md:justify-between">
      <div className="flex flex-col space-y-2 md:w-1/2">
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
                  imageSrc: string; // Assuming barista is a string (URL or file path)
                  title: string;
                  quantity: number;
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
      <div className="flex flex-col space-y-3 md:w-[40%]">
        {selectedItem?.rewards.map((reward, index) => (
          <RewardCard
            key={index}
            title={reward.title}
            min_amount={reward.quantity}
            imageSrc={reward.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}

export default Reward;
