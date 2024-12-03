import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { Clock, Info } from "lucide-react";
import { RepositoryStats } from "./repository-stats";

interface RepositorySidebarProps {
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  stars?: number;
  forks?: number;
  languages?: string[];
  repoUrl: string | null;
}

export function RepositorySidebar({
  description,
  createdAt,
  updatedAt,
  stars = 0,
  forks = 0,
  languages = [],
  repoUrl,
}: RepositorySidebarProps) {
  const hasDescription = description && description.trim().length > 0;

  return (
    <aside className="w-80 border-r border-border p-6 space-y-6">
      {hasDescription && (
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold mb-2">
            <Info className="w-5 h-5 text-muted-foreground" />
            <h2>About</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </section>
      )}

      <RepositoryStats stars={stars} forks={forks} repoUrl={repoUrl} />

      {languages.length > 0 && (
        <section>
          <h3 className="text-sm font-medium mb-3">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge
                key={lang}
                variant="secondary"
                className="px-2.5 py-0.5 text-xs font-medium"
              >
                {lang}
              </Badge>
            ))}
          </div>
        </section>
      )}

      <Separator />

      <section className="space-y-4">
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 mt-0.5 text-muted-foreground" />
          <div className="space-y-3">
            <div>
              <h3 className="text-sm text-muted-foreground font-medium">
                Created
              </h3>
              <p className="text-sm">
                {formatDistanceToNow(createdAt, { addSuffix: true })}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground font-medium">
                Updated
              </h3>
              <p className="text-sm">
                {formatDistanceToNow(updatedAt, { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}
