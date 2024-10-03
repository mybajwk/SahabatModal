"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Deskripsi({ id }: { id: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | undefined>();

  const router = useRouter();
  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(`/api/investor-view/${id}/desc`);
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
    <div className="p-6 lg:p-14 w-full font-lexend flex flex-col space-y-4 items-center">
      <h1
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
        className="font-bold text-white drop-shadow-text-white md:text-2xl mb-4"
      >
        Deskripsi
      </h1>
      <div
        className="overflow-y-auto font-lexend text-justify text-base text-white"
        dangerouslySetInnerHTML={{ __html: data?.desc }}
      />
    </div>
  );
}

export default Deskripsi;
