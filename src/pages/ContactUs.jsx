import Image from "next/image";
import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/*  */}
      <div className="bg-lightGray-400 p-4">
        <div className="bg-lightGray-500 text-center w-1/4 mx-auto ">
          write something
        </div>
        <div className="mt-4 h-full flex-row-reverse max-w-7xl gap-4 md:flex lg:flex">
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
                required
              >
                <option disabled selected>
                  Select Subject
                </option>
                <option value=" Order Related Issue ">
                  {" "}
                  Order Related Issue{" "}
                </option>
                <option value=" Payment/Balance/Wallet/Refund ">
                  {" "}
                  Payment/Balance/Wallet/Refund{" "}
                </option>
                <option value=" Delivery Related Issue ">
                  {" "}
                  Delivery Related Issue{" "}
                </option>
                <option value=" Product-Related info ">
                  {" "}
                  Product-Related info{" "}
                </option>
                <option value=" Product Info Missing/Mistake ">
                  {" "}
                  Product Info Missing/Mistake{" "}
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
            <div class="relative w-24 h-24">

            </div>
          </div>
        </div>
      </div>


      {/* map section */}


      <section>
        <div className="bg-lightGray-400 mt-5 h-[70vh] border">

          <div className="bg-lightGray-500 text-center w-1/4 mx-auto mt-4 p-3">
            <h1>Text will appear</h1>
          </div>

          <div className="flex gap-4 items-center mx-auto w-full p-2 mt-4">
            <div className="bg-lightGray-500 w-1/2 h-72">
              {/* Content for this div */}
            </div>
            <div className="bg-lightGray-100 w-1/2 h-72 flex items-center justify-center">
              <h1>Map</h1>
            </div>
          </div>

        </div>
      </section>




    </div>
  );
};

export default ContactUs;
