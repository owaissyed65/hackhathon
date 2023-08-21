import Heading from "@/components/heading";

import React from "react";
import DashboardForm from "./components/dashboard-form";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import Card from "@/components/card";

const DashboardPage = async () => {
  const { userId } = auth();
  const blogs = await prisma.userBlog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-8">
      <Heading>Welcome to dashboard</Heading>
      <div className="px:4 md:px-20">
        <DashboardForm />
      </div>
      {blogs.length > 0 ? (
        <div className="px:4 md:px-20">
          <div className="px-2 mt-4">
            <p className="text-xl font-semibold text-muted-foreground">
              All Blogs
            </p>
            <div className="grid grid-cols-3 mt-4 mb-3 ">
              {blogs.map((blog) => (
                <Card blog={blog} key={blog.id} cond={false} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl">No blog post yet</div>
      )}
    </div>
  );
};

export default DashboardPage;
