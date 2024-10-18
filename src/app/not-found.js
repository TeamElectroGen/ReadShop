import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      {/* 404 with a gradient */}
      <h1 className="mb-6 bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500 bg-clip-text text-7xl font-bold text-transparent sm:text-9xl">
        404
      </h1>

      {/* PAGE NOT FOUND text */}
      <p className="mb-8 text-2xl tracking-wider text-gray-400 sm:text-3xl">
        PAGE NOT FOUND
      </p>

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* REPORT button with custom colors */}
        <Link
          href={"/contact-us"}
          // className="rounded border border-green-500 px-6 py-3 font-semibold text-blue-500 transition-colors duration-300 hover:bg-green-500 hover:text-black"
        >
          <button className="cursor-pointer rounded-lg border border-[#e8e8e8] bg-[#e8e8e8] px-7 py-2 font-medium text-[#090909] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:border-white active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff] sm:text-lg">
            Report
          </button>
        </Link>

        {/* HOMEPAGE button with custom colors */}
        <Link
          href={"/"}
          // className="rounded border border-blue-500 px-6 py-3 font-semibold text-yellow-500 transition-colors duration-300 hover:bg-blue-500 hover:text-black"
        >
          <button className="cursor-pointer rounded-lg border border-[#e8e8e8] bg-[#e8e8e8] px-7 py-2 font-medium text-[#090909] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:border-white active:shadow-[4px_4px_12px_#c5c5c5,-4px_-4px_12px_#ffffff] sm:text-lg">
            Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
