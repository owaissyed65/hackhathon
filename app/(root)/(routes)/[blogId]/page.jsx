import Heading from "@/components/heading";
import React from "react";
import { ChevronLeft } from "lucide-react";
import prisma from "@/lib/prismadb";
import Link from "next/link";
import Card from "@/components/card";
import { clerkClient } from "@clerk/nextjs";
const page = async ({ params }) => {
  const { blogId } = params;
  const users = await clerkClient.users.getUserList({
    userId: blogId,
  });
  
  const blogs = await prisma.userBlog.findMany({
    where: {
      userId: blogId,
    },
    orderBy:{
        createdAt:'desc'
    }
  });
  
  return (
    <div>
      <Heading>
        <Link href="/">
          <span className="text-blue-700 flex items-center gap-x-2">
            <ChevronLeft className="h-8 w-8" /> Back To All Blogs
          </span>
        </Link>
      </Heading>
      <div className="px-4 ">
        <div className="px-2 mt-4 md:pr-20 mr-20">
          <p className="text-xl font-semibold text-muted-foreground">
            All Blogs from {users[0].emailAddresses[0].emailAddress}
          </p>
          <div className="grid grid-cols-3 mt-4 mb-3 relative">
            {blogs.length > 0
              ? blogs.map((blog) => (
                  <Card user={false} blog={blog} cond={false} key={blog}/>
                ))
              : "No Any blogs"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
