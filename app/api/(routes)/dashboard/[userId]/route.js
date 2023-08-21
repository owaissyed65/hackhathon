import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { imageUrl } = await req.json();
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized is required", { status: 401 });
    }
    if (!params.userId) {
      return new NextResponse("User id is required", { status: 401 });
    }
    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 401 });
    }
    

     await prisma.saylaniUser.deleteMany({
      where: {
        userId,
      },
    });
    const profile = await prisma.saylaniUser.create({
      data: {
        userId: params.userId,
        imageUrl,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log("USER_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
