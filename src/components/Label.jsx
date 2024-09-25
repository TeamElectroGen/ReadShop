import React from "react";

const Label = ({ name }) => {
  return (
    <div className="flex h-[40px] w-auto items-center justify-center text-center font-bold text-3xl">
      {name}
    </div>
  );
};

export default Label;
