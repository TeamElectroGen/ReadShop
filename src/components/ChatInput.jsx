"use client";
import { cn } from "@/lib/utils";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatInput = ({ className, ...props }) => {
  return (
    <div {...props} className={(cn("border-t border-zinc-300"), className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          rows={2}
          maxRows={4}
          autoFocus
          placeholder="Write a message..."
          className="peer block w-full resize-none border-0 bg-zinc-100 py-1.5 pl-4 pr-14 text-sm text-gray-900 focus:ring-0 disabled:opacity-50 sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;
