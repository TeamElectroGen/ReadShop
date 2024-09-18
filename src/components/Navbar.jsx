import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="bg-gray-200">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-gray-800 px-6">
          <div className="text-xl text-white">Logo</div>
          <div className="flex items-center">
            <div className="ml-4 h-8 w-8 bg-purple-400"></div>
            <div className="ml-4 h-8 w-8 rounded-full bg-orange-400"></div>
          </div>
        </nav>

        {/* Search Bar */}
        <div className="bg-gray-500 py-4">
          <div className="flex justify-center gap-2">
            <div>
              <input
                className="rounded-sm p-1"
                type="text"
                placeholder="Search book"
              />
            </div>
            <button className="rounded-sm bg-orange-400 p-1 font-bold">
              Search
            </button>
          </div>
        </div>
        {/*Section*/}
        <section>
          <h1 className="text-center font-bold">All Books</h1>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
