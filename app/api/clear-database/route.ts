import { db } from "@/lib/db";

export async function GET() {
  // Use DELETE instead of GET
  try {
    // Step-by-step deletion to handle foreign key constraints
    await db.verificationToken.deleteMany({});
    console.log("Deleted verificationTokens");

    await db.account.deleteMany({});
    console.log("Deleted accounts");

    await db.session.deleteMany({});
    console.log("Deleted sessions");

    await db.user.findMany({});
    console.log("Deleted users");

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
    console.error("Error clearing database:", error);
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
