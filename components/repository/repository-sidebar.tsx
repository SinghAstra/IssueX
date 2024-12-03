import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { GitFork, Star } from "lucide-react";
import { Badge } from "../ui/badge";

interface RepositorySidebarProps {
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  stars?: number;
  forks?: number;
  languages?: string[];
}

export function RepositorySidebar({
  description,
  createdAt,
  updatedAt,
  stars = 0,
  forks = 0,
  languages = [],
}: RepositorySidebarProps) {
  return (
    <div className="w-80 border-r border-border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-sm text-muted-foreground">
          {description || "No description provided"}
        </p>
      </div>

      <div className="flex gap-4">
        <Card className="flex items-center p-3 flex-1">
          <Star className="w-4 h-4 mr-2 text-primary" />
          <span className="text-sm font-medium">{stars}</span>
        </Card>
        <Card className="flex items-center p-3 flex-1">
          <GitFork className="w-4 h-4 mr-2 text-primary" />
          <span className="text-sm font-medium">{forks}</span>
        </Card>
      </div>

      {languages.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div>
          <h3 className="text-sm text-muted-foreground">Created</h3>
          <p className="text-sm font-medium">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">Last Updated</h3>
          <p className="text-sm font-medium">
            {formatDistanceToNow(updatedAt, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
}
