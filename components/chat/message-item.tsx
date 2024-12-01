"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Check, Clipboard, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

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

  const renderMessage = () => {
    if (sender === "ai") {
      return (
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter style={oneDark} language={match[1]}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {message}
        </ReactMarkdown>
      );
    }
    return message;
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
        <div className="flex flex-col">
          {sender !== "user" && (
            <Button
              size={"sm"}
              variant="ghost"
              className={
                "ml-auto bg-accent text-secondary-foreground -mt-4 -mr-4 text-xs"
              }
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1 " />
                  copied
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4 mr-1 " />
                  copy
                </>
              )}
            </Button>
          )}
          <div className="flex items-start justify-between gap-2">
            <p className="whitespace-pre-wrap">{renderMessage()}</p>
          </div>
          {timestamp && (
            <time className="text-xs opacity-50 ml-auto">
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
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
