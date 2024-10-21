"use client";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";

const ChatInput = ({ className, ...props }) => {
  const [input, setInput] = useState("");

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message) => {
      const res = await axios.post("/api/message", { messages: [message] });
      return res.data;
    },
    onSuccess: () => {
      console.log("success");
    },
  });

  return (
    <div {...props} className={(cn("border-t border-zinc-300"), className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message = {
                id: uuidv4(),
                isUserMessage: true,
                text: input,
              };
              sendMessage(message);
            }
          }}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder="Write a message..."
          className="peer block w-full resize-none border-0 bg-zinc-100 py-1.5 pl-4 pr-14 text-sm text-gray-900 focus:ring-0 disabled:opacity-50 sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;
