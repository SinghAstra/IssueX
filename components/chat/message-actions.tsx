"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Send } from "lucide-react";

interface MessageActionsProps {
  onSend: () => void;
  isLoading: boolean;
  hasContent: boolean;
}

export function MessageActions({
  onSend,
  isLoading,
  hasContent,
}: MessageActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onSend}
            disabled={isLoading || !hasContent}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Send message (Enter)</TooltipContent>
      </Tooltip>
    </div>
  );
}
