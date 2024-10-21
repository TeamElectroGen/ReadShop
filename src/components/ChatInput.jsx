"use client";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";

const ChatInput = ({ className, ...props }) => {
  const [input, setInput] = useState("");
  const {
    messages,
    addMessage,
    // removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);
  const textareaRef = useRef(null);

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message) => {
      const res = await axios.post("/api/message", { messages: [message] });
      console.log(res.data);
      return res.data;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (response) => {
      // const reader = response.getReader();
      // const decoder = new TextDecoder();

      // const readStream = async () => {
      //   const { done, value } = await reader.read();
      //   if (done) return;
      //   const chunk = decoder.decode(value);
      //   console.log(chunk); // This should now log the received chunks
      //   // Handle the chunk (e.g., update state, display message)
      //   readStream();
      // };

      // readStream();
      // construct new message to add
      const id = uuidv4();
      const responseMessage = {
        id,
        isUserMessage: false,
        text: response,
      };

      // add new message to state
      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = response.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      // clean up
      setIsMessageUpdating(false);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
  });
  console.log(messages);
  return (
    <div {...props} className={(cn("border-t border-zinc-300"), className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const message = {
                id: uuidv4(),
                isUserMessage: true,
                text: input,
              };
              setInput("");
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
