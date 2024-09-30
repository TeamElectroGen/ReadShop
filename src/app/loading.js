"use client";
import React, { useState } from "react";
import { Roller } from "react-awesome-spinners";

const Loading = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative rounded-xl bg-white p-5 shadow-lg backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Roller size={60} color="#FFD700" />{" "}
              <p className="text-lg font-semibold text-gray-700">
                Loading, please wait...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
