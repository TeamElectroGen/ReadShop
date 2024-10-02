import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";

const EmailVerify = () => {
  return (
    <div>
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
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Check your inbox, please!
          </h2>
          <p className="mb-4 text-gray-600">
            
            Hey Nazrul, to start using this, we need to verify your email. We’ve
            already sent out the verification link. Please check it and confirm
            it's really you.
          </p>
          
          <Button className="font-bold"><Link href={"/login"}>Sure</Link></Button>
          <p className="mt-4 text-gray-500">
            Didn’t get e-mail?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Send it again
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
