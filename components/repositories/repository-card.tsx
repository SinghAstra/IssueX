import { createRepositoryConnection } from "@/app/actions/repositories";
import { cn } from "@/lib/utils";
import { Repository } from "@/types/repository";
import { Check, GitFork, Link2, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../Icons";
import { Button, buttonVariants } from "../ui/button";

export function RepositoryCard({ repo }: { repo: Repository }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      switch (repo.connectionStatus) {
        case "CONNECTED":
          router.push(`/repositories/${repo.id}`);
          break;
        default:
          const newRepo = await createRepositoryConnection(repo.fullName);
          router.push(`/repositories/${newRepo.id}`);
      }
    } catch (error) {
      console.log("error --handleConnect is ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const truncateDescription = (description: string | null, maxLength = 50) => {
    if (!description) return;

    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  };

  const getButtonProps = () => {
    switch (repo.connectionStatus) {
      case "CONNECTED":
        return {
          variant: "green" as const,
          text: "Connected",
          icon: <Check className="mr-2 h-4 w-4" />,
        };
      default:
        return {
          variant: "default" as const,
          text: "Connect",
          icon: <Link2 className="mr-2 h-4 w-4" />,
        };
    }
  };
  const { variant, text, icon } = getButtonProps();

  return (
    <div
      className="flex flex-col h-full border rounded-lg overflow-hidden bg-card min-h-[16rem]"
      role="button"
      tabIndex={0}
      onClick={handleConnect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleConnect();
        }
      }}
    >
      <div className="font-bold text-lg flex mb-2 justify-between p-4">
        {repo.name}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-500" />
            <span>{repo.stars}</span>
          </div>

          <div className="flex items-center space-x-1">
            <GitFork size={16} className="text-gray-500" />
            <span>{repo.forks}</span>
          </div>
        </div>
      </div>

      {/* <div className="flex space-x-1">
          {repo.languages.map((lang) => (
            <span 
              key={lang} 
              className="px-2 py-1 bg-gray-100 text-xs rounded-full"
            >
              {lang}
            </span>
          ))}
        </div> */}

      <div className="text-gray-600 p-4 text-sm">
        {truncateDescription(repo.description)}
      </div>

      <div className="mt-auto p-4 border-t flex space-x-2">
        <Link
          href={repo.url}
          target="_blank"
          className={cn(buttonVariants({ variant: "outline" }), "flex-grow")}
          onClick={(e) => e.stopPropagation()}
        >
          <Icons.gitLogo className="mr-2" />
          Github
        </Link>

        <Button
          variant={variant}
          className="flex-grow"
          onClick={handleConnect}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.loaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            icon
          )}
          {text}
        </Button>
      </div>
    </div>
  );
}
