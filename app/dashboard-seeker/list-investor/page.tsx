"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";

const ListInvestorDescPage =  () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | undefined>();
  const router = useRouter();

  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(
          `/api/funding/list-investor`
        );
        // console.log(dataFetch);
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
    <div className="flex flex-col md:px-40 md:py-10 px-10 py-8 justify-center items-center">
      <h1
        className="w-full mb-5 text-white text-center font-lexend text-[40px] md:text-[44px] font-semibold"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
        List Investor
      </h1>
      <div className="flex flex-col gap-10 w-full lg:w-[80%] min-[370px]:gap-4 ">
        {data.investor && data.investor.length > 0 ? (
          data.investor.map(
            (i: {
              id: string;
              name: string;
              email: string;
              amount: number;
              date: string;
              item: { name: string; image?: string };
            }) => (
              <div
                key={i.id}
                className="flex flex-col gap-7 min-[370px]:flex-row font-lexend  text-white"
              >
                <figure className="size-[70px] flex-col gap-2 md:size-[90px] relative flex justify-center items-center rounded-full border border-white overflow-hidden">
                  <Image
                    fill
                    src="/logo.png"
                    alt="image investor"
                    className="object-cover"
                  />
                </figure>

                <div className="flex-1 border-[1px] rounded-lg p-3 md:p-6 bg-white bg-opacity-[1%] shadow-custom-inset backdrop-blur-[6px] border-[#D9D9D9] flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[20px] md:text-[24px] text-white font-lexend">
                      Name: {i.name}
                    </h2>
                    <h2 className="text-[20px] md:text-[24px] text-white font-lexend">
                      Email: {i.email}
                    </h2>
                  </div>
                  <div className="flex lg:flex-row flex-col  gap-4 ">
                    <div className="flex-1 flex flex-col gap-2">
                      <h2 className="text-[20px] md:text-[24px]">Reward:</h2>
                      <div className="flex flex-row gap-2 relative items-center">
                        <figure className="size-[60px] sm:size-[80px] md:size-[100px] relative">
                          <Image
                            src="/logo.png"
                            alt="reward image"
                            fill
                            className="object-cover"
                          />
                        </figure>
                        <div className="flex flex-1 flex-col gap-3">
                          <div className="flex w-fit flex-row gap-1 items-center rounded-full justify-center px-3 bg-orange-white text-black">
                            <FaClock className="text-white size-4" />
                            <p className="text-base">29-09-2024</p>
                          </div>
                          <h3 className="text-[18px] md:text-[22px]">
                            Kostum khas bali
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end">
                      <h1 className="text-[20px] md:text-[24px] w-full lg:text-right">
                        Amount:
                      </h1>
                      <p className="text-[16px] md:text-[20px]">Rp1.000.000</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p className="py-20 w-full text-center text-white font-lexend text-lg">
            Tidak ada investor
          </p>
        )}
      </div>
    </div>
  );
};

export default ListInvestorDescPage;
