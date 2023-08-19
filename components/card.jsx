import Mydiv from "@/app/(root)/(routes)/(components)/Mydiv";
import { clerkClient } from "@clerk/nextjs";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

const Card = async ({ user, blog, cond }) => {
  const users = await clerkClient.users.getUserList({
    userId: blog.userId,
  });

  return (
    <div className="w-full flex flex-col bg-white col-span-2 px-10 my-10 pb-5">
      <div className="pt-8 pb-8 grid grid-cols-3 gap-x-4 ">
        <div className="relative overflow-hidden w-full">
          <Image href={user.imageUrl ? user.imageUrl : ""} alt="image" fill />
        </div>
        <div className="flex gap-y-2 flex-col col-span-2">
          <p className="text-2xl font-semibold">{blog.title}</p>
          <p>
            {user
              ? user.emailAddresses[0].emailAddress
              : users[0].emailAddresses[0].emailAddress}{" "}
            -{" "}
            <span className="text-muted-foreground">
              {format(blog.createdAt, "yyyy-MM-dd")}
            </span>
          </p>
        </div>
      </div>
      <div>{blog.description}</div>
      {cond && <Mydiv userId={blog.userId} />}
    </div>
  );
};

export default Card;
