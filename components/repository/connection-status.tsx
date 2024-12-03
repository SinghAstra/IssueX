import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ConnectionStatus } from "@prisma/client";
import { CheckCircle2, XCircle } from "lucide-react";

interface ConnectionStatusBadgeProps {
  status: ConnectionStatus;
  className?: string;
}

export function ConnectionStatusBadge({
  status,
  className,
}: ConnectionStatusBadgeProps) {
  const isConnected = status === "CONNECTED";

  return (
    <Badge
      variant={isConnected ? "default" : "secondary"}
      className={cn(
        "gap-1.5 px-3 py-1.5 transition-all duration-200",
        isConnected
          ? " bg-[hsl(var(--stats-green))]/20 text-[hsl(var(--stats-green))] hover:bg-[hsl(var(--stats-green))]/30 border-[hsl(var(--stats-green))]/20"
          : "bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/20",
        className
      )}
    >
      {isConnected ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <XCircle className="w-3.5 h-3.5" />
      )}
      <span className="font-medium">
        {isConnected ? "Connected" : "Not Connected"}
      </span>
    </Badge>
  );
}
