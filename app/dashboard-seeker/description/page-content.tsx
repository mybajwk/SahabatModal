"use client";

const PageContent = ({ content }: { content: string }) => {
  return (
    <div
      className="overflow-y-auto font-lexend text-justify text-base text-white"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PageContent;
