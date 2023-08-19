import { auth } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";
const authlayout = ({ children }) => {
  const { userId } = auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
};

export default authlayout;
