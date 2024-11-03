"use client";
import { MessagesProvider } from "@/context/messages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "./FilterProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </FilterProvider>
    </QueryClientProvider>
  );
};

export default Providers;
