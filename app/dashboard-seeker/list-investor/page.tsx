import Image from "next/image";
import { FaClock } from "react-icons/fa6";

const ListInvestorDescPage = () => {
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
        {["", ""].map((i, index) => (
          <div key={index} className="flex flex-col gap-7 min-[370px]:flex-row font-lexend  text-white">
            <figure className="size-[70px] md:size-[90px] relative flex justify-center items-center rounded-full border border-white overflow-hidden">
              <Image
                fill
                src="/logo.png"
                alt="image investor"
                className="object-cover"
              />
            </figure>
            <div className="flex-1 border-[1px] rounded-lg p-3 md:p-6 flex lg:flex-row flex-col bg-white bg-opacity-[1%] shadow-custom-inset backdrop-blur-[6px] gap-4 border-[#D9D9D9]">
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="text-[20px] md:text-[24px]">Reward:</h1>
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
        ))}
      </div>
    </div>
  );
};

export default ListInvestorDescPage;
