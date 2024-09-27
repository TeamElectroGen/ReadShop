"use client";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import SocialLogin from "./SocialLogin";

const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const confirmPassword = form.confirmPassword.value;
    const password = form.password.value;
    if (password !== confirmPassword)
      return toast.error("Password does't match!");
    const userData = { name, email, phone, password };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`,
        userData
      );
      console.log(res);
      if (res.status === 200) {
        form.reset();
        if (res.data.status === 200) {
          return toast.success(res.data.message);
        }
        if (res.data.status === 304) {
          return toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="rounded-md bg-white p-4 shadow-md xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-sky-400">
              Sign in
            </Link>
          </p>
          {/* TODO: REGEX implementation */}
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/*Name*/}
              <div>
                <label className="text-base font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              {/*Email*/}
              <div>
                <label className="text-base font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/*Phone*/}
              <div>
                <label className="text-base font-medium text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Phone"
                    type="tel"
                    name="phone"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/*Password*/}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              {/*Confirm Password*/}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="confirmPassword"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  type="submit"
                >
                  Get started
                </button>
              </div>
            </div>
          </form>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
