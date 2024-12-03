import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GitFork, Star } from "lucide-react";
import Link from "next/link";

interface RepositoryStatsProps {
  stars: number;
  forks: number;
  repoUrl: string | null;
}

export function RepositoryStats({
  stars,
  forks,
  repoUrl,
}: RepositoryStatsProps) {
  const statCards = [
    {
      icon: Star,
      value: stars,
      label: "Stars",
      href: `${repoUrl}/stargazers`,
      color: "stats-orange",
    },
    {
      icon: GitFork,
      value: forks,
      label: "Forks",
      href: `${repoUrl}/network/members`,
      color: "stats-purple",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {statCards.map(({ icon: Icon, value, label, href, color }) => (
        <Link key={label} href={href ?? "#"} target="_blank">
          <Card
            className={cn(
              "flex items-center justify-between p-4 transition-all duration-200",
              "hover:bg-accent/50 cursor-pointer group"
            )}
          >
            <div className="flex items-center gap-2">
              <Icon className={cn("w-4 h-4", color)} />
              <span className="font-medium">{value.toLocaleString()}</span>
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground">
              {label}
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
