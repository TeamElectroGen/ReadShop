import React from "react";

const ContactUs = () => {
  return (
    <div className="mx-auto max-w-6xl">
      {/*  */}
      <div className="bg-lightGray-400 p-4">
        <div className="mx-auto w-1/4 bg-lightGray-500 text-center">
          write something
        </div>
        <div className="mt-4 h-full max-w-7xl flex-row-reverse gap-4 md:flex lg:flex">
          <div className="ml-6 w-1/2">
            <form className="flex flex-col gap-4">
              <input
                className="w-full border border-gray-300 p-2"
                type="text"
                name="name"
                required
              />
              <input
                className="border border-gray-300 p-2"
                type="text"
                name="email"
                required
              />
              <input
                className="border border-gray-300 p-2"
                type="text"
                name="phone"
                required
              />
              <select
                className="border border-gray-300 p-2"
                name="issues"
                id=""
                defaultValue={"Select Subject"}
                required
              >
                <option value="Select Subject">Select Subject</option>
                <option value=" Order Related Issue ">
                  Order Related Issue
                </option>
                <option value=" Payment/Balance/Wallet/Refund ">
                  Payment/Balance/Wallet/Refund
                </option>
                <option value=" Delivery Related Issue ">
                  Delivery Related Issue
                </option>
                <option value=" Product-Related info ">
                  Product-Related info
                </option>
                <option value=" Product Info Missing/Mistake ">
                  Product Info Missing/Mistake
                </option>
              </select>
              <textarea
                className="border border-gray-300 p-2"
                name="message"
                id=""
                cols={30}
                rows={7}
              ></textarea>
              <button className="bg-green-600 p-4" style={{ width: "100px" }}>
                Submit
              </button>
            </form>
          </div>
          <div className="w-1/2">
            {/* image will be added here */}
            <div className="relative h-24 w-24"></div>
          </div>
        </div>
      </div>

      {/* map section */}

      <section>
        <div className="mt-5 h-[70vh] border bg-lightGray-400">
          <div className="mx-auto mt-4 w-1/4 bg-lightGray-500 p-3 text-center">
            <h1>Text will appear</h1>
          </div>

          <div className="mx-auto mt-4 flex w-full items-center gap-4 p-2">
            <div className="h-72 w-1/2 bg-lightGray-500">
              {/* Content for this div */}
            </div>
            <div className="flex h-72 w-1/2 items-center justify-center bg-lightGray-100">
              <h1>Map</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
