import Image from "next/image";
import React from "react";

const ContactUs = () => {
  return (
    <div className="mb-5">
      {/* there will be a backgorund image next ..youhave to add a bg image down */}
      <div className="bg-custom-gray h-[20vh]">
        <Image src="" alt="" height={300} width={600} />
      </div>

      {/*  */}
      <div className="mt-4 h-full max-w-7xl gap-4 md:flex lg:flex">
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
          {/* map will be add here */}
          map will be add here
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
