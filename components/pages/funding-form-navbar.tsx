import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface FundingFormNavbarProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  currentPage: string;
}

const FundingFormNavbar: React.FC<FundingFormNavbarProps> = ({
  setCurrentPage,
  currentPage,
}) => {
  return (
    <nav
      className="flex font-lexend text-[20px] z-[4] flex-row gap-16 text-black bg-white pt-2 w-full justify-center items-center mt-6"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(255, 255, 255, 0.30)",
      }}
    >
      <p
        className={cn(
          "py-3 px-3 cursor-pointer",
          currentPage === "basic" && "border-b-[3px] border-black",
        )}
        onClick={() => setCurrentPage("basic")}
      >
        Basic
      </p>
      <p
        className={cn(
          "py-3 px-3 cursor-pointer",
          currentPage === "reward" && "border-b-[3px] border-black",
        )}
        onClick={() => setCurrentPage("reward")}
      >
        Reward
      </p>
      <p
        className={cn(
          "py-3 px-3 cursor-pointer",
          currentPage === "desc" && "border-b-[3px] border-black",
        )}
        onClick={() => setCurrentPage("desc")}
      >
        Deskripsi
      </p>
    </nav>
  );
};

export default FundingFormNavbar;
