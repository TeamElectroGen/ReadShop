import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      {/* 404 with a gradient */}
      <h1 className="mb-6 bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500 bg-clip-text text-9xl font-bold text-transparent">
        404
      </h1>

      {/* PAGE NOT FOUND text */}
      <p className="mb-8 text-3xl tracking-wider text-gray-400">
        PAGE NOT FOUND
      </p>

      <div className="flex space-x-4">
        {/* REPORT button with custom colors */}
        <Link
          href={"/contact-us"}
          className="rounded border border-green-500 px-6 py-3 font-semibold text-blue-500 transition-colors duration-300 hover:bg-green-500 hover:text-black"
        >
          REPORT
        </Link>

        {/* HOMEPAGE button with custom colors */}
        <Link
          href={"/"}
          className="rounded border border-blue-500 px-6 py-3 font-semibold text-yellow-500 transition-colors duration-300 hover:bg-blue-500 hover:text-black"
        >
          HOMEPAGE
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
