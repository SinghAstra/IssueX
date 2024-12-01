"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Clipboard, User } from "lucide-react";
import { useState } from "react";

interface MessageItemProps {
  sender: "user" | "ai";
  message: string;
  timestamp?: Date;
}

export function MessageItem({ sender, message, timestamp }: MessageItemProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 group",
        sender === "user" ? "justify-end" : "justify-start"
      )}
    >
      {sender === "ai" && (
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-xl p-4",
          sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <p className="whitespace-pre-wrap">{message}</p>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2",
                sender === "user"
                  ? "hover:bg-primary/90 text-primary-foreground"
                  : "hover:bg-accent/30 text-secondary-foreground"
              )}
              onClick={copyToClipboard}
            >
              <Clipboard className={cn("h-4 w-4", copied && "text-primary")} />
            </Button>
          </div>
          {timestamp && (
            <time className="text-xs opacity-50">
              {timestamp.toLocaleTimeString()}
            </time>
          )}
        </div>
      </div>
      {sender === "user" && (
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
      )}
    </div>
  );
}
