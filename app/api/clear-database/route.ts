import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.$transaction([
      db.verificationToken.deleteMany(),
      db.account.deleteMany(),
      db.session.deleteMany(),
      db.user.deleteMany(),
    ]);

    console.log("Database cleared successfully");

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
      JSON.stringify({
        message: "Error clearing database",
        error: error,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
