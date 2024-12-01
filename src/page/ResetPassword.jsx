"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/reset-password", {
        token,
        email,
        password: data.password,
      });

      if (res.data.status === 200) {
        toast.success("Password reset successful!");
        router.push("/login");
      } else {
        toast.error(res.data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
      <div className="rounded-md bg-white p-4 shadow-md xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Create New Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label className="text-base font-medium text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  placeholder="Enter new password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                  type="password"
                  placeholder="Confirm new password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
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
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword; 