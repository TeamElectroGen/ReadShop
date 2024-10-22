import React from "react";

const CircleLoading = ({ className }) => {
  return (
    <div className="my-10 flex justify-center">
      <div
        className={`${className} h-10 w-10 animate-spin rounded-full border-4 border-t-primary`}
      ></div>
    </div>
  );
};

export default CircleLoading;
