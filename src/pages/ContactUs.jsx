import Navbar from "@/components/Navbar";
import React from "react";

const ContactUs = () => {
  return (
    <div className="mb-5">
      <Navbar />
      {/* there will be a backgorund image next ..youhave to add a bg image down */}
      <div className=" bg-custom-gray h-[20vh]">
        <img src="" alt="" />
      </div>

      {/*  */}
      <div className="max-w-7xl h-full md:flex lg:flex  gap-4 mt-4 " >
        <div className="w-1/2 ml-6 ">
          <form className="flex flex-col gap-4  " >
            <input className="p-2 border border-gray-300 w-full" type="text" name="name" required />
            <input className="p-2 border border-gray-300" type="text" name="email" required />
            <input className="p-2 border border-gray-300" type="text" name="phone" required />
            <select className="p-2 border border-gray-300" name="issues" id="" required>
              <option disabled selected>Select Subject</option>
              <option value=" Order Related Issue "> Order Related Issue </option>
              <option value=" Payment/Balance/Wallet/Refund "> Payment/Balance/Wallet/Refund </option>
              <option value=" Delivery Related Issue "> Delivery Related Issue </option>
              <option value=" Product-Related info "> Product-Related info </option>
              <option value=" Product Info Missing/Mistake "> Product Info Missing/Mistake </option>
            </select>
            <textarea className="p-2 border border-gray-300" name="message" id="" cols={30} rows={7}></textarea>
            <button className="bg-green-600 p-4 "style={{width:'100px'}} >Submit</button>
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
