"use client";

import Pagination from "@/components/pagination";
import { useState } from "react";

const TesPage = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="size-full flex-col gap-4 p-10 flex justify-center items-center">
      <Pagination
        totalPages={10}
        currentPage={page}
        setPage={setPage}
        control="text"
      />

      <Pagination
        totalPages={10}
        currentPage={page}
        setPage={setPage}
        control="icon"
      />
    </div>
  );
};

export default TesPage;
