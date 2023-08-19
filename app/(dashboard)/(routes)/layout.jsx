import Navbar from "@/components/navbar";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }) => {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    redirect("/");
  }
  return (
    <div className="h-full ">
      <div className="fixed w-full z-[80]">
        <Navbar user={user} userId={userId} />
      </div>
      <div className="pt-12 min-h-full bg-[#f8f9fa] ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
