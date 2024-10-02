import React, { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comments from "./Comments";

interface FeedCardProps {
  date: string;
  avatarSrc: string;
  authorName: string;
  username: string;
  title: string;
  content: string;
  tags: string[];
  comments: any[];
}

const FeedCard: React.FC<FeedCardProps> = ({
  date,
  avatarSrc,
  title,
  authorName,
  username,
  content,
  tags,
  comments,
}) => {
  const [showFullText, setShowFullText] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const previewText = `${content.substring(0, 100)}...`;

  return (
    <div className="bg-[#F2F7FF] rounded-lg w-full flex flex-col space-y-2 text-black font-lexend p-4">
      <p className="text-[#666] text-sm">{date}</p>
      <div className="flex flex-row space-x-2 items-center">
        <Avatar className="w-[40px] aspect-square">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>EC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{authorName}</p>
          <p className="text-[#3E3183]">@{username}</p>
        </div>
      </div>
      <h1 className="font-bold py-4">{title}</h1>
      <p className="text-[#666] text-xs text-justify">
        {showFullText ? content : previewText}
      </p>
      <button
        onClick={() => setShowFullText(!showFullText)}
        className="text-blue-500 font-semibold text-sm"
      >
        {showFullText ? "Show Less" : "Show More"}
      </button>
      <div className="flex flex-row space-x-4 overflow-x-auto">
        {tags.map((item, index) => {
          return (
            <div
              key={index}
              className="px-3 border text-nowrap border-black rounded-md text-black text-xs"
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row text-black">
        {/* <MdInsertEmoticon className="w-6 h-6" /> */}
        <div
          className="flex flex-row items-end hover:cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <FiMessageCircle className="w-6 h-6 " />
          <p className="text-[12px] text-[#DC2522] ">{comments.length}</p>
        </div>
      </div>

      {showComments && <Comments comments={comments} />}
    </div>
  );
};

export default FeedCard;
