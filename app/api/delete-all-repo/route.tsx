import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Repository deletion only allowed in development mode" },
      { status: 403 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedRepositories = await prisma.repository.deleteMany();

    return NextResponse.json({
      message: "All repositories deleted successfully",
      count: deletedRepositories.count,
    });
  } catch (error) {
    console.log("Error deleting repositories:", error);
    return NextResponse.json(
      { error: "Failed to delete repositories" },
      { status: 500 }
    );
  }
}
