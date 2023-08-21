import { currentUser } from "@clerk/nextjs";
import React from "react";
import UserForm from "./(components)/user-form";
import Heading from "@/components/heading";
import prisma from "@/lib/prismadb";

const page = async ({ params }) => {
  const { userId } = params;

  const user = await currentUser();
  const userProfile = await prisma.saylaniUser.findMany({
    where: {
      userId,
    },
  });
  const profile = userProfile.find((user) => user.userId === userId);
  
  return (
    <div className="space-y-8 ">
      <Heading>Profile</Heading>
      <div className="mt-8 px-4 lg:pl-14 grid grid-cols-2">
        <UserForm userId={userId} profile={profile}/>
        <div className="flex justify-end items-start">
          <p className="text-2xl text-muted-foreground capitalize">
            {user?.firstName
              ? user?.firstName
              : user?.emailAddresses?.[0]?.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
