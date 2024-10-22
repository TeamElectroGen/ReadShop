"use client";
import CircleLoading from "@/components/CircleLoading";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CircleLoading />
    </div>
  );
};

export default Loading;
