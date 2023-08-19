import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = auth();
    const { title, description } = await req.json();

    if (!userId) {
      return new NextResponse("User id is required", { status: 401 });
    }
    if (!title) {
      return new NextResponse("Title is required", { status: 401 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 401 });
    }
    const blog = await prisma.userBlog.create({
      data: {
        userId,
        title,
        description,
      },
    });
    
    return NextResponse.json(blog);
    
  } catch (error) {
    console.log("BLOG_ERROR",error)
    return new NextResponse("Internal server error", { status: 500 });
    
  }
}
