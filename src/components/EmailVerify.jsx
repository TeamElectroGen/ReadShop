"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function EmailVerify() {
  const [status, setStatus] = useState("verifying");
  const [userEmail, setUserEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const verificationAttempted = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) {
      setUserEmail(email);
    }
  }, [email]);

  const verifyEmail = useCallback(async () => {
    if (verificationAttempted.current) {
      return;
    }

    verificationAttempted.current = true;

    try {
      const response = await axios.get(`/api/verify-email?token=${token}`);
      if (response.data.status === 200) {
        setStatus("success");
        toast.success("Email verified successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        return;
      }
      setStatus("error");
      toast.error(response.data.message || "Verification failed");
    } catch (error) {
      setStatus("error");
      toast.error(error.message || "Invalid or expired verification token");
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token, verifyEmail]);

  const handleResendEmail = async () => {
    if (!userEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResending(true);
    try {
      const res = await axios.post("/api/resend-verification", {
        email: userEmail,
      });

      if (res.data.status === 200) {
        toast.success("Verification email sent successfully!");
      } else {
        toast.error(res.data.message || "Failed to resend verification email");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to resend verification email"
      );
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    if (!token) {
      return (
        <>
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Check your inbox, please!
          </h2>
          <p className="mb-4 text-gray-600">
            To start using this, we need to verify your email. We&apos;ve
            already sent out the verification link. Please check it and confirm
            it&apos;s really you.
          </p>

          <Link href="/login" className="inline-block">
            <Button className="font-bold">Sure</Button>
          </Link>
          <div className="mt-4 text-gray-500">
            <p>Didn&apos;t get e-mail?</p>
            {searchParams.get("email") ? (
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="disabled:opacity-50"
              >
                {isResending ? (
                  <span className="text-gray-500 hover:no-underline">
                    Sending...
                  </span>
                ) : (
                  <span className="text-blue-500 hover:underline">
                    Send verification email
                  </span>
                )}
              </button>
            ) : (
              <div className="mt-2">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mb-2 w-full rounded border p-2"
                />
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="disabled:opacity-50"
                >
                  {isResending ? (
                    <span className="text-gray-500 hover:no-underline">
                      Sending...
                    </span>
                  ) : (
                    <span className="text-blue-500 hover:underline">
                      Send verification email
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      );
    }

    if (status === "verifying") {
      return (
        <h2 className="text-xl font-semibold text-gray-800">
          Verifying your email...
        </h2>
      );
    }

    if (status === "success") {
      return (
        <>
          <h2 className="mb-2 text-xl font-semibold text-green-600">
            Email verified successfully!
          </h2>
          <p className="text-gray-600">Redirecting to login page...</p>
        </>
      );
    }

    return (
      <>
        <h2 className="mb-2 text-xl font-semibold text-red-600">
          Invalid or expired verification link
        </h2>
        <Button className="mt-4" onClick={handleResendEmail}>
          Resend Verification Email
        </Button>
      </>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center to-white">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50">
          <Image
            src="/assets/messageBox.png"
            alt="Message Icon"
            width={62}
            height={62}
            className="h-12 w-12"
          />
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
