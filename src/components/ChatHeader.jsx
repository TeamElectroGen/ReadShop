import React from "react";

const ChatHeader = () => {
  return (
    <div className="flex w-full items-center justify-start gap-3 text-zinc-800">
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs">Chat with</p>
        <div className="flex items-center gap-1.5">
          <p className="size-2 rounded-full bg-green-500" />
          <p className="font-medium text-start">ReadShop Support</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
