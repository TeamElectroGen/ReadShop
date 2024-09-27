"use client";
import contactBg from "../../public/assets/contactUs.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaAngleDown,
  FaEnvelope,
  FaLocationArrow,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import Link from "next/link";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          reset();
        },
        (error) => {
          toast.error("Failed to send message.");
          console.error("EmailJS error:", error.text);
        }
      );
  };

  return (
    <section className="mt-10">
      {/* Form part */}
      <div className="container mx-auto -mt-2 flex items-center justify-between gap-4 overflow-clip">
        <Image
          className="hidden lg:flex"
          height={520}
          src={contactBg}
          alt="Contact Form Background"
        />
        <main className="w-full">
          <div className="mb-2 bg-white/20 backdrop-blur-sm">
            <div className="rounded-b-lg p-8 shadow-md">
              <div className="mb-4 flex justify-center gap-2">
                <div className="flex w-full items-stretch justify-end gap-2">
                  <div>
                    <h2 className="text-right text-sm">Get in touch</h2>
                    <h2 className="mb-4 text-right text-2xl font-semibold">
                      Send a message
                    </h2>
                  </div>
                  <div className="h-full w-1 bg-primary"></div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Name Input */}
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                    className={`border ${errors.name ? "border-red-500" : "border-gray-300"} bg-white`}
                  />
                  {errors.name && (
                    <p className="text-red-500">Name is required</p>
                  )}
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
                  {errors.email && (
                    <p className="text-red-500">Valid email is required</p>
                  )}
                </div>
                {/* Phone Input */}
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone"
                    {...register("phone", { required: true, minLength: 11 })}
                    className={`border ${errors.phone ? "border-red-500" : "border-gray-300"} bg-white`}
                  />
                  {errors.phone && (
                    <p className="text-red-500">
                      Valid phone number is required
                    </p>
                  )}
                </div>
                {/* Subject Select */}
                <div>
                  <select
                    className={`border p-2 ${errors.subject ? "border-red-500" : "border-gray-300"} w-full rounded-sm`}
                    {...register("subject", { required: true })}
                  >
                    <option value="">Select Subject</option>
                    <option value="Order Related Issue">
                      Order Related Issue
                    </option>
                    <option value="Payment Related Issue">
                      Payment/Balance/Wallet/Refund
                    </option>
                    <option value="Delivery Related Issue">
                      Delivery Related Issue
                    </option>
                    <option value="Product-Related Info">
                      Product-Related Info
                    </option>
                    <option value="Product Info Missing">
                      Product Info Missing/Mistake
                    </option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500">Please select a subject</p>
                  )}
                </div>
                {/* Message Textarea */}
                <div>
                  <textarea
                    placeholder="Your Message"
                    {...register("message", { required: true })}
                    className={`border ${errors.message ? "border-red-500" : "border-gray-300"} w-full resize-none rounded-sm px-3 py-1 outline-none`}
                    rows={4}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500">Message is required</p>
                  )}
                </div>
                {/* Submit Button */}
                <Button type="submit" className="">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
      {/* Divider */}
      <div className="relative mt-8">
        <hr className="z-0 border-2 border-primary opacity-60" />
        <div className="flex items-center justify-center">
          <Link
            href={"#connect"}
            className="absolute -bottom-3.5 z-10 w-fit scroll-smooth rounded-full bg-primary p-2 duration-150 lg:left-1/2"
          >
            <FaAngleDown />
          </Link>
        </div>
      </div>
      {/* Additional Info Section */}
      <div id="connect" className="scroll-smooth bg-yellow-100/20 duration-150">
        <div className="mx-auto flex w-11/12 flex-col gap-5 rounded-sm py-10 pb-20 md:container lg:flex-row">
          <div className="flex w-full flex-col gap-5">
            <div className="rounded-sm bg-orange-200/50 p-5 shadow-md">
              <div className="mb-5 flex gap-3">
                <div className="w-1 bg-yellow-800"></div>
                <div>
                  <h2 className="text-2xl font-semibold">Connect</h2>
                  <p className="text-yellow-950">
                    Reach us with your question!
                  </p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-4 rounded-sm border">
                  <div className="w-fit rounded-md bg-white/50 p-2">
                    <FaEnvelope />
                  </div>
                  <p>info@readshop.com</p>
                </div>
                <div className="flex items-center gap-4 rounded-sm border">
                  <div className="w-fit rounded-md bg-white/50 p-2">
                    <FaPhone />
                  </div>
                  <p>(+880) 1000 00 00 00</p>
                </div>
                <div className="flex items-center gap-4 rounded-sm border">
                  <div className="w-fit rounded-md bg-white/50 p-2">
                    <FaTelegram />
                  </div>
                  <p>@readshop.official</p>
                </div>
                <div className="flex items-center gap-4 rounded-sm border">
                  <div className="w-fit rounded-md bg-white/50 p-2">
                    <FaWhatsapp />
                  </div>
                  <p>(+880) 1000 00 00 00</p>
                </div>
              </div>
            </div>
            <div className="rounded-sm bg-red-200/50 p-5 shadow-md">
              <div className="mb-5 flex gap-3">
                <div className="w-1 bg-yellow-800"></div>
                <div>
                  <h2 className="text-2xl font-semibold">Address</h2>
                  <p className="text-yellow-950">Where we live!</p>
                </div>
              </div>
              <div className="gap-3">
                <div className="flex items-center gap-4 rounded-sm border">
                  <div className="w-fit rounded-md bg-white/50 p-2">
                    <FaLocationArrow />
                  </div>
                  <p>51/A, Kamal Ataturk Avenue, Dhaka-1218</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7313.488696067517!2d90.40862637418638!3d23.796095898943886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c771b1c27b79%3A0x8c3910d9b7e11823!2s51%20Kamal%20Ataturk%20Ave%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1694377074782!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
