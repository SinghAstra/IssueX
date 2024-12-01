"use client";

import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { MessageActions } from "./message-actions";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      {/* Message composition area */}
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[50px] max-h-[200px] pr-20 bg-input border-border focus:ring-2 focus:ring-ring resize-none rounded-xl"
            rows={1}
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
