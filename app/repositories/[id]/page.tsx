import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function RepositoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const repository = await prisma.repository.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!repository) {
    return <div>Repository not found</div>;
  }

  return (
    <div>
      <h1>{repository.fullName}</h1>
      <p>Connection Status: {repository.connectionStatus}</p>
    </div>
  );
}
