import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={100}
        width={50}
      />
    </div>
  );
}
