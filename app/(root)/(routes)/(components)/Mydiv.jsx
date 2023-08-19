"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Mydiv = ({ userId }) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer text-blue-500"
      onClick={() => {
        router.push(`/${userId}`);
      }}
    >
      {" "}
      View all more
    </div>
  );
};

export default Mydiv;
