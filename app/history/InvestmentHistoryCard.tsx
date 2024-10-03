import Image from "next/image";
import { BsFillStopwatchFill } from "react-icons/bs";
import { HistoryItem } from "./page";

const InvestmentHistoryCard: React.FC<{ item: HistoryItem }> = ({ item }) => (
  <div className="bg-[#30457980] flex flex-col py-3 px-4 space-y-1 rounded-lg max-w-[310px] sm:max-w-[570px] border-[#74A3FF] border w-full">
    <p className="text-xs text-gray-400">{item.date}</p>
    <div className="flex flex-row space-x-2">
      <Image
        src={item.thumbnailUrl}
        alt="thumbnail"
        width={80}
        height={80}
        className="object-cover w-[80px] object-center rounded-full aspect-square"
      />
      <div className="flex flex-1 flex-col justify-evenly">
        <div className="flex flex-row space-x-2 items-center justify-between">
          <h1 className="text-[12px] sm:font-bold sm:text-lg">
            {item.companyName}
          </h1>
          <div className="px-2 text-[10px] py-1 bg-green-gradient h-fit rounded-full text-black sm:text-sm">
            {item.amount}
          </div>
        </div>
        <div className="flex flex-row items-center space-x-1 sm:space-x-3">
          <BsFillStopwatchFill className="text-[#F49916]" />
          <p className="text-xs text-gray-400 sm:text-sm">
            Pencairan: {item.disbursementDate}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default InvestmentHistoryCard;
