import React from "react";

const Label = ({ name }) => {
  return (
    <div className="flex h-[29px] w-[164px] items-center justify-center bg-[#aba7a7] text-center">
      {name}
    </div>
  );
};

export default Label;
