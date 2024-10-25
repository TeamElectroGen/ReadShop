import React from "react";

const DashboardHeading = ({heading = ""}) => {
  return (
    <header className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">{heading}</h1>
    </header>
  );
};

export default DashboardHeading;
