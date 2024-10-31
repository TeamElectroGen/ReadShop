"use client";
import useRole from "@/hooks/useRole";
import { CircleX } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Chat = () => {
  const role = useRole();
  const path = usePathname();
  const [show, setShow] = useState(true);

  if (!show) {
    return;
  }
  if (role === "admin" || path.includes("/dashboard")) {
    return;
  }
  return (
    <Accordion
      type="single"
      collapsible
      className="relative z-40 bg-white shadow"
    >
      <AccordionItem value="item-1">
        <div className="fixed bottom-4 right-4 ml-4 rounded-md border border-gray-200 bg-white sm:bottom-8 sm:right-8 sm:ml-0 sm:w-80">
          <div className="flex size-full flex-col">
            <AccordionTrigger className="border-b border-zinc-300 px-6 hover:no-underline">
              <CircleX
                onClick={() => {
                  setShow(false);
                  toast.success(
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
                className="absolute -right-1 -top-1 z-50 size-5 text-red-400 hover:text-red-600"
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
