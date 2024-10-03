"use client";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative rounded-xl bg-white p-5 shadow-lg backdrop-blur-lg">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ReactLoading
            type="spokes"
            color="#FFD700"
            height={70}
            width={70}
            delay={4}
          ></ReactLoading>
          <p className="text-sm font-medium text-gray-700">
            Loading, please wait...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
