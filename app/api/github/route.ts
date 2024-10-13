import { auth } from "@/auth";

export async function GET(req: Request, res: Response) {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  let data;

  if (accessToken) {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    data = await response.json();
  }
  return Response.json({ data });
}
