"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MessageActions } from "./message-actions";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 ">
      <div className="flex justify-end text-xs text-muted-foreground px-2">
        <span>Press Shift + Enter for new line</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[40px] max-h-[600px] pr-20 bg-input border-border focus:ring-2 focus:ring-ring resize-none rounded-xl"
          />
        </div>

        <div className="flex items-center gap-1 h-full">
          <MessageActions
            onSend={handleSend}
            isLoading={isLoading}
            hasContent={message.trim().length > 0}
          />
        </div>
      </div>
    </div>
  );
}
