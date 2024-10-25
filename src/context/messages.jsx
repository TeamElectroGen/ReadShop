import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const defaultValue = [
  {
    id: uuidv4(),
    text: "Hello, how can I help you?",
    isUserMessage: false,
  },
];
export const MessagesContext = createContext({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = useState(false);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (id, updateFn) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
