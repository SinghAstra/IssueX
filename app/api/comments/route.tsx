import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Comments can only be fetched in development mode" },
      { status: 403 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments);
  } catch (error) {
    console.log("Error fetching Comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch Comments" },
      { status: 500 }
    );
  }
}
