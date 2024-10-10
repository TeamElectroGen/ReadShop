const { Link } = require("lucide-react");
import React from "react";

const PagesHeader = ({ title, subtitle, path, path2 }) => {
  console.log(path);
  return (
    <header className="relative mt-12 w-full overflow-hidden rounded-2xl border border-primary bg-secondary">
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-xl leading-7 text-black/90">{subtitle}</p>
          <div className="mt-6 hidden justify-center space-x-4">
            <a
              href={`/`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {path}
            </a>
            <span className="inline-flex items-center text-sm text-black/70">
              / {path2}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
    </header>
  );
};

export default PagesHeader;
