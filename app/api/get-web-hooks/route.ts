import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email ?? undefined;

    if (!email) {
      return Response.json(
        { message: "User email not found" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const webhooks = await db.webhook.findMany({
      where: {
        userId: user.id,
      },
    });

    return Response.json({
      message: "Webhooks fetched successfully",
      webhooks,
    });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
