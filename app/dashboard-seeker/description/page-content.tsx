"use client";

import { sanitizeHTML } from "@/lib/sanitizeHTML";
import React from "react";

const PageContent = ({ content }: { content: string }) => {
  return (
    <div
      className="overflow-y-auto font-lexend text-justify text-base text-white"
      dangerouslySetInnerHTML={{
        ...sanitizeHTML(content),
      }}
    />
  );
};

export default PageContent;
