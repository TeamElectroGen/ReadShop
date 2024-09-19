import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-4 2xl:px-36">
        <header className="mt-12 flex h-40 items-center justify-center rounded-2xl bg-lightGray-200">
          <div>
            <h1 className="text-3xl font-bold text-darkGray-800">About Us</h1>
            <p className="text-mediumGray-500 text-sm font-medium text-center py-3">Home / About us</p>
          </div>
        </header>

        <div className="mt-12 flex flex-col gap-4 p-6 rounded-2xl bg-background lg:flex-row lg:gap-6">
          <div className="flex bg-white items-center justify-center border lg:w-1/2">
            <Image alt="About image" />
          </div>
          <div className="flex-1">
            <h2 className="mb-6 text-3xl font-semibold">Welcome to ReadShop</h2>
            <div className="text-md space-y-5 text-darkGray-800">
              <p>
                At ReadShop, we believe in the magic of books and the power they
                hold to inspire, educate, and transform lives. Whether you’re a
                lifelong reader or just beginning your journey, we’re here to
                offer a carefully curated collection of books that caters to
                every kind of reader.
              </p>
              <p>
                With a focus on quality and variety, we offer a wide range of
                genres—from fiction, non-fiction, and textbooks to self-help,
                spirituality, and more. Our platform makes it easy to discover,
                explore, and purchase books with just a few clicks. We are
                committed to creating a seamless and enjoyable experience for
                every book lover.
              </p>
              <p>
                Let us be part of your reading adventure—wherever it may lead
                you.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 gap-4 p-6 bg-lightGray-200 rounded-2xl lg:flex-row lg:gap-6">
          <h3 className="text-center font-semibold text-2xl">Our team</h3>
        
          {/* Team container */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5">
            {/* team card */}
            <div className="h-52 p-2 w-40 rounded-t-full border-4">
              <div className="h-3/4 flex justify-center items-center border rounded-full bg-white">
                <Image alt="team member" />
              </div>
              <div className="bg-mediumGray-500 mt-2 h-10 w-full"></div>
            </div>
            {/* team card */}
            <div className="h-52 p-2 w-40 rounded-t-full border-4">
              <div className="h-3/4 flex justify-center items-center border rounded-full bg-white">
                <Image alt="team member" />
              </div>
              <div className="bg-mediumGray-500 mt-2 h-10 w-full"></div>
            </div>
            {/* team card */}
            <div className="h-52 p-2 w-40 rounded-t-full border-4">
              <div className="h-3/4 flex justify-center items-center border rounded-full bg-white">
                <Image alt="team member" />
              </div>
              <div className="bg-mediumGray-500 mt-2 h-10 w-full"></div>
            </div>
            {/* team card */}
            <div className="h-52 p-2 w-40 rounded-t-full border-4">
              <div className="h-3/4 flex justify-center items-center border rounded-full bg-white">
                <Image alt="team member" />
              </div>
              <div className="bg-mediumGray-500 mt-2 h-10 w-full"></div>
            </div>
            {/* team card */}
            <div className="h-52 p-2 w-40 rounded-t-full border-4">
              <div className="h-3/4 flex justify-center items-center border rounded-full bg-white">
                <Image alt="team member" />
              </div>
              <div className="bg-mediumGray-500 mt-2 h-10 w-full"></div>
            </div>
            {/* team card */}
            <div className="h-52 p-2 w-40 rounded-t-full border-4">
              <div className="h-3/4 flex justify-center items-center border rounded-full bg-white">
                <Image alt="team member" />
              </div>
              <div className="bg-mediumGray-500 mt-2 h-10 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
