import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-4 2xl:px-36">
        <header
          style={{ borderRadius: "32px" }}
          className="relative mt-12 flex h-96 w-full items-center justify-center bg-lightGray-200"
        >
          <Image
            src="/assets/custom banner.png"
            alt="Custom banner"
            layout="fill"
            className="rounded-md object-cover"
          />
          <div className="absolute text-center top-4 z-10">
            <h1 className="text-3xl font-bold text-white font-display">
              About Us
            </h1>
           
          </div>
        </header>

        {/* Welcome section */}
        <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-background p-6 lg:flex-row lg:gap-6">
          <div className="relative flex items-center justify-center border bg-white lg:w-1/2">
            <Image
              layout="fill"
              className="object-cover"
              src="/assets/about.png"
              alt="About image"
            />
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

        {/* Our team section */}
        <div className="mt-12 gap-4 rounded-2xl bg-lightGray-200 p-6 lg:flex-row lg:gap-6">
          <h3 className="text-center text-2xl font-semibold">Our team</h3>

          {/* Team container */}
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
              <div className="relative flex h-3/4 items-center justify-center rounded-full border bg-white">
                <Image
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-full object-cover"
                  layout="fill"
                  src="	https://images.pexels.com/photos/7641824/pexels-photo-7641824.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="team member"
                />
              </div>
              <div className="mt-2 h-10 w-full rounded-2xl bg-white hover:bg-[#33C24D]">
                <h1 className="text-center font-mono text-2xl text-[#33C24D] hover:text-white">
                  Ayub
                </h1>
              </div>
            </div>
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
              <div className="relative flex h-3/4 items-center justify-center rounded-full border bg-white">
                <Image
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  layout="fill"
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="team member"
                />
              </div>

              <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                <div className="mt-10 lg:mt-0">
                  <span className="mb-4 block text-lg font-semibold text-primary">
                    Why Choose Us
                  </span>
                  <h2 className="text-dark mb-5 text-3xl font-bold dark:text-white sm:text-[40px]/[48px]">
                    Discover Your Next Favorite Read
                  </h2>
                  <p className="text-body-color dark:text-dark-6 mb-5 text-base">
                    Immerse yourself in captivating stories, explore diverse
                    genres, and find books that ignite your passion. Our curated
                    collection offers something for every reader.
                  </p>
                  <p className="text-body-color dark:text-dark-6 mb-8 text-base">
                    From classic literature to modern bestsellers, we have a
                    wide range of books to suit your taste. Whether you&apos;re
                    a seasoned reader or just starting your literary journey,
                    we&apos;re here to help you find your perfect match.
                  </p>
                  <Link
                    href={"/"}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
                  >
                    Explore Our Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* team here */}
        {/* <section className="bg-white py-12">
          <div className="container mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">
              Our Professional <span className="text-blue-600">Members</span>
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div className="transform rounded-2xl bg-[#4B5563] p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Rayna Torff"
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                  width={100}
                  height={100}
                />
                <h3 className="text-lg font-semibold text-white">Ayuib Ali</h3>
                <p className="text-sm text-gray-400">Lead, Design Systems</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-500 hover:underline"
                >
                  Read more &rarr;
                </a>
              </div>

              <div className="mt-8 transform rounded-2xl bg-[#4B5563] p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Gustavo Workman"
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                  width={100}
                  height={100}
                />
                <h3 className="text-lg font-semibold text-white">Abdullah</h3>
                <p className="text-sm text-gray-400">Head, Product Design</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-500 hover:underline"
                >
                  Read more &rarr;
                </a>
              </div>

              <div className="transform rounded-2xl bg-[#4B5563] p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <Image
                  src="	https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Marcus Dorwart"
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                  width={100}
                  height={100}
                />
                <h3 className="text-lg font-semibold text-white">Nazrul</h3>
                <p className="text-sm text-gray-400">VP, Operations</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-500 hover:underline"
                >
                  Read more &rarr;
                </a>
              </div>

              <div className="mt-12 transform rounded-2xl bg-[#4B5563] p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <Image
                  src="	https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Casy Camilari Marx"
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                  width={100}
                  height={100}
                />
                <h3 className="text-lg font-semibold text-white">albab ibne</h3>
                <p className="text-sm text-gray-400">
                  Digital Marketing Director
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-500 hover:underline"
                >
                  Read more &rarr;
                </a>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </section>
  );
};

export default About;
