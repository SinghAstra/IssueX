import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.verificationToken.deleteMany({});
    await db.account.deleteMany({});
    await db.session.deleteMany({});
    await db.user.deleteMany({});

    return new Response(
      JSON.stringify({ message: "Database cleared successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Error clearing database:", error);
    return new Response(
      JSON.stringify({ message: "Error clearing database" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
