import Mydiv from "@/app/(root)/(routes)/(components)/Mydiv";
import prisma from "@/lib/prismadb";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

const Card = async ({ blog, cond }) => {
  const users = await clerkClient.users.getUserList({
    userId: blog.userId,
  });
  console.log(users[0].emailAddresses[0].emailAddress)
  const findProfile = await prisma.saylaniUser.findMany({
    where: {
      userId: blog.userId,
    },
  });

  const Myprofile = findProfile.find((pf) => pf.userId === blog.userId);
  return (
    <div className="w-full flex flex-col bg-white col-span-2 px-10 my-10 pb-5">
      <div className="pt-8 pb-8 grid grid-cols-3 gap-x-4 ">
        <div className="relative aspect-[1.4/1] rounded-lg flex justify-center items-center">
          <Image
            src={Myprofile ? Myprofile.imageUrl : "/pf.jpg"}
            alt="image"
            fill
            className="object-cover object-center rounded-lg"
          />
        </div>
        <div className="flex gap-y-2 flex-col col-span-2 h-full justify-center items-start">
          <p className="text-2xl font-semibold">{blog.title}</p>
          <p>
            {users[0].emailAddresses[0].emailAddress} -{" "}
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
