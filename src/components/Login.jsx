"use client";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import SocialLogin from "./SocialLogin";
import { useSearchParams } from "next/navigation";
const Login = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailOrPhone = form.emailOrPhone.value;
    const password = form.password.value;
    try {
      const res = await signIn("credentials", {
        emailOrPhone,
        password,
        redirect: true,
        callbackUrl: path || "/",
      });
      console.log(res);
      // if (res.status === 200) {
      //   router.push("/");
      //   // form.reset();
      //   return toast.success("Logged in successfully!");
      // }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
      <div className="rounded-md bg-white p-4 shadow-md xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-sky-400">
            Sign up
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            {/*Email or phone*/}
            <div>
              <label className="text-base font-medium text-gray-900">
                Email Or Phone
              </label>
              <div className="mt-2">
                {/* TODO: REGEX like for email type and phone type and others if needed */}
                <input
                  placeholder="Enter Email or Phone Number"
                  type="text"
                  name="emailOrPhone"
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
                <a
                  className="text-sm font-semibold text-black hover:underline"
                  title=""
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <button
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
        <SocialLogin />
      </div>
    </section>
  );
};

export default Login;
