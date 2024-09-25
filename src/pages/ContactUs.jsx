"use client";
import React, { useEffect, useState } from "react";
import contactBg from "../../public/assets/contact-us.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaAngleDown, FaEnvelope, FaLocationArrow, FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
const ContactUs = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const watchFields = watch();

  useEffect(() => {
    const areFieldsValid =
      watchFields.name &&
      watchFields.email &&
      watchFields.phone &&
      watchFields.issues &&
      watchFields.message &&
      !Object.keys(errors).length;

    setIsButtonDisabled(!areFieldsValid);
  }, [watchFields, errors]);

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <section className="">
      <Toaster />

      {/* Form part */}
      <div className="flex justify-end relative h-[600px] items-end overflow-clip -mt-16">
        {/* Pages Feature Images */}
        <div className="-z-50 hidden lg:flex relative -left-10 lg:-left-10 -bottom-[380px]">
          <Image className="" height={1500} src={contactBg} alt="Contact Form Background" />
        </div>
        {/* Contact Form Part */}
        <main className="w-[800px] lg:pr-10 bg-[url('../../public/assets/contact-us.svg')] lg:bg-none bg-cover bg-opacity-50">
          <div className="bg-white/20 backdrop-blur-sm mx-4 mb-2">
            <div className="p-8 rounded-b-lg shadow-md">
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-full">
                  <h2 className="text-right text-sm">Get in touch</h2>
                  <h2 className="text-right text-2xl font-semibold mb-4">Send a message</h2>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Name Input */}
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                    className={`border ${errors.name ? "border-red-500" : "border-gray-300"} bg-white`}
                  />
                  {errors.name && <p className="text-red-500">Name is required</p>}
                </div>

                {/* Email Input */}
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    })}
                    className={`border ${errors.email ? "border-red-500" : "border-gray-300"} bg-white`}
                  />
                  {errors.email && <p className="text-red-500">Valid email is required</p>}
                </div>

                {/* Phone Input */}
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone"
                    {...register("phone", { required: true, minLength: 11 })}
                    className={`border ${errors.phone ? "border-red-500" : "border-gray-300"} bg-white`}
                  />
                  {errors.phone && <p className="text-red-500">Valid phone number is required</p>}
                </div>

                {/* Subject Select */}
                <div>
                  <select
                    className={`border p-2 ${errors.issues ? "border-red-500" : "border-gray-300"} rounded-sm w-full`}
                    {...register("issues", { required: true })}
                  >
                    <option value="">Select Subject</option>
                    <option value="Order Related Issue">Order Related Issue</option>
                    <option value="Payment/Balance/Wallet/Refund">Payment/Balance/Wallet/Refund</option>
                    <option value="Delivery Related Issue">Delivery Related Issue</option>
                    <option value="Product-Related Info">Product-Related Info</option>
                    <option value="Product Info Missing/Mistake">Product Info Missing/Mistake</option>
                  </select>
                  {errors.issues && <p className="text-red-500">Please select a subject</p>}
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    placeholder="Your Message"
                    {...register("message", { required: true })}
                    className={`border ${errors.message ? "border-red-500" : "border-gray-300"} w-full resize-none rounded-sm px-3 py-1 outline-none`}
                    rows={4}
                  ></textarea>
                  {errors.message && <p className="text-red-500">Message is required</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="" disabled={isButtonDisabled}>
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* Divider */}
      <div className="relative">
        <hr className="border-2 border-yellow-900 z-0" />
        <div className="bg-lightGray-400 w-fit p-2 rounded-full absolute z-10 -bottom-3.5 left-1/2">
          <FaAngleDown />
        </div>
      </div>

      <div className="bg-yellow-100">
        <div className="w-11/12 md:container mx-auto flex flex-col lg:flex-row py-10 rounded-sm gap-5">

          <div className="w-full flex flex-col gap-5">

            <div className="bg-orange-200/50 shadow-md rounded-sm p-5">
              <div className="flex gap-3 mb-5">
                <div className="w-1  bg-yellow-800">
                </div>
                <div>
                  <h2 className="font-semibold text-2xl">Connect</h2>
                  <p className="text-yellow-950">Reach us with your question!</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-4 border rounded-sm">
                  <div className="bg-white/50 w-fit p-2 rounded-md">
                    <FaEnvelope />
                  </div>
                  <p>info@readshop.com</p>
                </div>
                <div className="flex items-center gap-4 border rounded-sm">
                  <div className="bg-white/50 w-fit p-2 rounded-md">
                    <FaPhone />
                  </div>
                  <p>(+880) 1000 00 00 00</p>
                </div>
                <div className="flex items-center gap-4 border rounded-sm">
                  <div className="bg-white/50 w-fit p-2 rounded-md">
                    <FaTelegram />
                  </div>
                  <p>@readshop.official</p>
                </div>
                <div className="flex items-center gap-4 border rounded-sm">
                  <div className="bg-white/50 w-fit p-2 rounded-md">
                    <FaWhatsapp />
                  </div>
                  <p>(+880) 1000 00 00 00</p>
                </div>
              </div>
            </div>

            <div className="bg-red-200/50 shadow-md rounded-sm p-5">
              <div className="flex gap-3 mb-5">
                <div className="w-1  bg-yellow-800">

                </div>
                <div>
                  <h2 className="font-semibold text-2xl">Address</h2>
                  <p className="text-yellow-950">Where we live!</p>
                </div>
              </div>
              <div className="gap-3">
                <div className="flex items-center gap-4 border rounded-sm">
                  <div className="bg-white/50 w-fit p-2 rounded-md">
                    <FaLocationArrow />
                  </div>
                  <p>51/A, Kamal Ataturk Avenue, Dhaka-1218</p>
                </div>
              </div>
            </div>

          </div>

          {/* Map */}
          <div className="w-full">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d51905.734490399715!2d90.40939901317851!3d23.801212593519956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1727093620013!5m2!1sen!2sbd" allowfullscreen="" loading="lazy" className="rounded-sm border shadow w-full h-80 lg:h-full" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;