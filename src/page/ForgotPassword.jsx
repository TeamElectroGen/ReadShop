"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/forgot-password", {
        email: data.email,
      });

      if (res.data.status === 200) {
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
      <div className="rounded-md bg-white p-4 shadow-md xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label className="text-base font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  defaultValue={email || ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <button
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              type="submit"
            >
              {isLoading ? (
                <CgSpinnerTwo className="animate-spin text-2xl" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
