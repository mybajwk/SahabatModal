"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const DashboardSeekerNavbar = () => {
  const currentPage = usePathname();
  const router = useRouter();
  console.log(currentPage);
  return (
    <nav
      className="flex relative font-lexend z-[10] text-[20px] flex-row gap-10 md:gap-16 text-black bg-white pt-2 w-full justify-center items-center mt-6"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(255, 255, 255, 0.30)",
      }}
    >
      <p
        className={cn(
          "py-3 px-3 cursor-pointer",
          currentPage.endsWith("description") && "border-b-[3px] border-black"
        )}
        onClick={() => router.push("description")}
      >
        Deskripsi
      </p>
      <p
        className={cn(
          "py-3 px-3 cursor-pointer",
          currentPage.endsWith("list-investor") && "border-b-[3px] border-black"
        )}
        onClick={() => router.push("list-investor")}
      >
        List Investor
        
      </p>
    </nav>
  );
};

export default DashboardSeekerNavbar;
