import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email ?? undefined;

    console.log("email is ", email);

    if (!email) {
      return Response.json(
        { message: "User email not found" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    console.log("user is ", user);

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const webhooks = await db.webhook.findMany({
      where: {
        userId: user.id,
      },
      // orderBy: {
      //   createdAt: "desc",
      // },
    });

    return Response.json({
      message: "Webhooks fetched successfully",
      webhooks,
    });
  } catch (error) {
    console.error("Error fetching webhooks:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
