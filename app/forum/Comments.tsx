import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { IoIosSend } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment, FormattedForum } from "../utils/PostFeeds";
import axios from "axios";

interface CommentsProps {
  comments: Comment[];
  forumId: string;
  setForumData: React.Dispatch<React.SetStateAction<FormattedForum[]>>;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  forumId,
  setForumData,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) {
      return; // Do nothing if comment is empty or just spaces
    }

    try {
      const response = await axios.post("/api/forum/" + forumId + "/comment", {
        content: comment,
      });
      console.log(response.data);
      setForumData(response.data.data);

      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    <>
      <div className="flex flex-row items-center space-x-2 pb-3 border-b-2 border-b-black">
        {/* <Avatar className="w-[40px] aspect-square">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>EC</AvatarFallback>
        </Avatar> */}
        <Textarea
          placeholder="Berikan Komentar Anda"
          className="text-[8px] text-black border-black"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></Textarea>
        <IoIosSend
          onClick={handleSubmit}
          className="text-black hover:cursor-pointer"
        />
      </div>

      {comments.length > 0 && (
        <div>
          <h1 className="text-sm font-bold">Comments</h1>
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex flex-row space-x-3 items-center mt-2"
            >
              <Avatar className="w-[30px] h-[30px] aspect-square">
                <AvatarImage src={comment.authorAvatar} />
                <AvatarFallback className=" bg-yellow-300">
                  {comment.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-bold">{comment.username}</p>
                <p className="text-[10px]">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
