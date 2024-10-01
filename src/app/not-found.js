// pages/404.js

import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex h-screen flex-col justify-center bg-gray-100">
      <center className="m-auto mt-24">
        <svg
          className="emoji-404"
          height="249.135"
          width="226"
          viewBox="0 0 226 249.135"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="113" cy="113" fill="#FFE585" r="109" />
          <line
            fill="none"
            opacity="0.29"
            stroke="#6E6E96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="88.866"
            x2="136.866"
            y1="245.135"
            y2="245.135"
          />
          <line
            fill="none"
            opacity="0.17"
            stroke="#6E6E96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="154.732"
            x2="168.732"
            y1="245.135"
            y2="245.135"
          />
          <line
            fill="none"
            opacity="0.17"
            stroke="#6E6E96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="69.732"
            x2="58.732"
            y1="245.135"
            y2="245.135"
          />
          <circle cx="68.732" cy="93" fill="#6E6E96" r="9" />
          <circle cx="156.398" cy="93" fill="#6E6E96" r="9" />
          <ellipse
            cx="67.732"
            cy="140.894"
            fill="#FF0000"
            opacity="0.18"
            rx="17.372"
            ry="8.106"
          />
          <ellipse
            cx="154.88"
            cy="140.894"
            fill="#FF0000"
            opacity="0.18"
            rx="17.371"
            ry="8.106"
          />
          <circle
            cx="113"
            cy="113"
            fill="none"
            r="109"
            stroke="#6E6E96"
            strokeWidth="8"
          />
        </svg>
        <div className="mt-4 tracking-widest">
          <span className="block text-6xl text-gray-500">
            <span>4 0 4</span>
          </span>
          <span className="text-xl text-gray-500">
            Sorry, We couldn't find what you are looking for!
          </span>
        </div>
      </center>
      <center className="mb-2 mt-2">
        <Link
          href={"/"}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-blue-400 px-7 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
        >
          Go Back to Home
        </Link>
      </center>
    </div>
  );
};

export default Custom404;
