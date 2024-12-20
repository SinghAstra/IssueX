import { Button } from "@/components/ui/button";
import { ConnectionStatus } from "@prisma/client";
// import { RefreshCw } from "lucide-react";
import { Icons } from "../Icons";
import { ConnectionStatusBadge } from "./connection-status";

interface RepositoryHeaderProps {
  name: string;
  connectionStatus: ConnectionStatus;
  htmlUrl?: string;
  // onSync?: () => void;
}

export function RepositoryHeader({
  name,
  connectionStatus,
  htmlUrl,
}: RepositoryHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-border">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-foreground">{name}</h1>
        <ConnectionStatusBadge status={connectionStatus} />
      </div>

      <div className="flex items-center gap-3">
        {htmlUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
              <Icons.gitLogo className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        )}
        {/* <Button variant="outline" size="sm" onClick={onSync}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync
        </Button> */}
      </div>
    </div>
  );
}
