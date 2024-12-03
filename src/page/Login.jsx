"use client";
import SocialLogin from "@/components/SocialLogin";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

const LoginContent = () => {
  const path = useSearchParams().get("redirect");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { emailOrPhone, password } = data;
    try {
      const res = await signIn("credentials", {
        emailOrPhone,
        password,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "Please verify your email before logging in") {
          if (!emailOrPhone.includes("@")) {
            toast.error("Please enter your email address for verification");
            setIsLoading(false);
            return;
          }
          await axios.post("/api/resend-verification", {
            email: emailOrPhone,
          });
          window.location.href = `/email-verify?email=${emailOrPhone}`;
          return;
        }
        toast.error(res.error || "Invalid credentials");
        setIsLoading(false);
      } else {
        window.location.href = path || "/";
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setIsLoading(false);
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
          Do not have an account?{" "}
          <Link href="/signup" className="font-bold text-sky-400">
            Sign up
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            {/*Email or phone*/}
            <div>
              <label className="text-base font-medium text-gray-900">
                Email Or Phone
              </label>
              <div className="mt-2">
                <input
                  placeholder="Enter Email or Phone Number"
                  type="text"
                  {...register("emailOrPhone", { required: true })}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.emailOrPhone && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            {/*Password*/}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-900">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Enter Password"
                  type="password"
                  {...register("password", { required: true })}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                type="submit"
              >
                {isLoading ? (
                  <CgSpinnerTwo className="animate-spin text-2xl" />
                ) : (
                  "Sign in"
                )}
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
