"use client";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Chat = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return;
  }
  return (
    <Accordion
      type="single"
      collapsible
      className="relative z-40 bg-white shadow"
    >
      <AccordionItem value="item-1">
        <div className="fixed bottom-4 right-4 ml-4 overflow-hidden rounded-md border border-gray-200 bg-white sm:bottom-8 sm:right-8 sm:ml-0 sm:w-80">
          <div className="flex size-full flex-col">
            <AccordionTrigger className="border-b border-zinc-300 px-6 hover:no-underline">
              <CircleX
                onClick={() => {
                  setShow(false);
                  toast.error(
                    <div className="text-nowrap">
                      Chatbot is hidden.{" "}
                      <button
                        onClick={() => {
                          setShow(true);
                          toast.dismiss();
                        }}
                        className="text-blue-500"
                      >
                        undo
                      </button>
                    </div>
                  );
                }}
                className="absolute right-0 top-0 z-50 size-5 text-red-600"
              ></CircleX>
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex h-80 flex-col">
                <ChatMessages className={"flex-1 px-2 py-3"} />
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Chat;
