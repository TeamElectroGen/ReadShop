"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Lottie from "lottie-react";
import successAnimation from "../../../../../public/assets/successAnimation.json";
import { ArrowLeftIcon } from "lucide-react";

const Success = () => {
  return (
    <section className="container flex min-h-[calc(100vh-64px)] items-center justify-center">
      <div className="-mt-5 flex items-center justify-center rounded-lg border bg-background px-28 py-12 drop-shadow-2xl">
        <div className="flex flex-col items-center gap-1 text-center">
          <Lottie
            className="size-44"
            animationData={successAnimation}
            loop={true}
          />
          <h3 className="text-md -mt-5 flex items-center gap-1.5 font-bold tracking-tight md:text-xl">
            Thank you for your order
          </h3>
          <p className="max-w-sm text-xs text-muted-foreground md:text-sm">
            Your order has been placed. You will receive orders in 4-7 working
            days
          </p>
          <Button asChild size="sm" className="mt-4 font-semibold">
            <Link href={"/"}>
              <ArrowLeftIcon className="mr-2 size-4" />
              Back to homepage
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Success;
