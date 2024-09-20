import React from "react";

const WideCard = () => {
  return (
    <div className="flex h-[121px] w-[511px] items-center justify-between gap-2 bg-[#edecec] p-2">
      <div className="h-[102px] w-[79px] bg-white"></div>
      <div className="flex w-[401px] flex-col gap-2">
        <div className="h-[34px] w-full bg-[#ABA7A7]"></div>
        <div className="h-[9px] w-[332px] bg-[#C5C5C5]"></div>
        <div className="h-[9px] w-[267px] bg-[#C5C5C5]"></div>
        <div className="h-[9px] w-[229px] bg-[#C5C5C5]"></div>
      </div>
    </div>
  );
};

export default WideCard;
