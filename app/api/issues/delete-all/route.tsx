import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Issue deletion only allowed in development mode" },
      { status: 403 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedIssues = await prisma.issue.deleteMany();

    return NextResponse.json({
      message: "All Issues deleted successfully",
      count: deletedIssues.count,
    });
  } catch (error) {
    console.log("Error deleting Issues:", error);
    return NextResponse.json(
      { error: "Failed to delete Issues" },
      { status: 500 }
    );
  }
}
