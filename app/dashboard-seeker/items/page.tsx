"use client";

import RewardCardSeeker from "@/components/reward-card-seeker";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashSeekerDescPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | undefined>();
  const router = useRouter();

  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(`/api/funding/items`);
        console.log(dataFetch);
        setData(dataFetch.data);
      } catch (error) {
        console.log(error);
        return router.push("/");
        // return null;
      }
    };

    get();
  }, [router]);

  if (!data) return null;
  return (
    <div className="flex flex-col md:px-10 md:py-6 px-6 py-4 justify-center items-center ">
      <h1
        className="w-full mb-5 text-white text-center font-lexend text-[40px] md:text-[44px] font-semibold"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
        Item
      </h1>
      <div className="w-full flex justify-center flex-wrap gap-3 items-center sm:w-[80%] ">
        {data.items ? (
          data.items.map(
            (d: {
              name: string;
              id: string;
              image?: string;
              amount: number;
            }) => (
              <RewardCardSeeker
                imageSrc={d.image || ""}
                min_amount={d.amount}
                title={d.name}
                key={d.id}
              />
            ),
          )
        ) : (
          <p className="py-20 w-full text-center text-white font-lexend text-lg">
            Tidak ada Reward
          </p>
        )}
      </div>
    </div>
  );
};

export default DashSeekerDescPage;
