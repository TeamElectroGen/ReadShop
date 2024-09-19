import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 w-full bg-mediumGray-500/50 pt-3 text-xs">
      <div className="mx-auto w-11/12">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div className="flex min-h-32 w-full items-center justify-center bg-lightGray-200 px-2 py-2 text-center">
            Logo & Address
          </div>
          <div className="flex w-full flex-col gap-3 text-center">
            <div className="min-h-16 w-full bg-lightGray-200 py-2 md:min-h-20">
              Newsletter
            </div>
            <div className="min-h-10 w-full bg-lightGray-200 py-2">
              Social Links
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center bg-mediumGray-500 py-2 text-xs text-white">
        <p>Copyright</p>
      </div>
    </footer>
  );
};

export default Footer;
