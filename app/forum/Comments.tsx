import React from "react";

import { Textarea } from "@/components/ui/textarea";
import { IoIosSend } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentsProps {
  comments: any[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
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
        ></Textarea>
        <IoIosSend className="text-black hover:cursor-pointer" />
      </div>

      {comments.length > 0 && (
        <div>
          <h1 className="text-sm font-bold">Comments</h1>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-row space-x-3 items-center mt-2"
            >
              <Avatar className="w-[30px] h-[30px] aspect-square">
                <AvatarImage src={comment.userAvatar} />
                <AvatarFallback className=" bg-yellow-300">
                  {comment.username.charAt(0)}
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
