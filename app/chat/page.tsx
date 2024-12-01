"use client";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { MessageItem } from "@/components/chat/message-item";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { generateAIResponse } from "@/lib/ai/gemini";
import { useCallback, useRef, useState } from "react";

interface Message {
  sender: "user" | "ai";
  message: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  const handleSendMessage = async (message: string) => {
    const newMessage: Message = {
      sender: "user",
      message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    scrollToBottom();

    try {
      const aiResponse = await generateAIResponse(message);

      if (aiResponse) {
        const responseMessage: Message = {
          sender: "ai",
          message: aiResponse.text || aiResponse.toString(),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, responseMessage]);
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="border-border shadow-2xl overflow-hidden flex flex-col flex-1 w-full h-screen">
      <ChatHeader onClear={() => setMessages([])} />

      <div
        className="overflow-y-auto p-4 space-y-4 flex-1"
        ref={messagesContainerRef}
      >
        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesContainerRef} />
      </div>

      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
