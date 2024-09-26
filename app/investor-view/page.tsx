"use client";

import SearchBar from "@/components/ui/searchbar";
import React, { useEffect, useState } from "react";

function Page() {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className="flex flex-col items-center py-[100px] font-lexend">
      <SearchBar onSearchChange={setQuery} />
    </div>
  );
}

export default Page;
