import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-4 2xl:px-36">
        {/* <header className="relative mt-12 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-green-500">
          <div className="container px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative z-10 text-center">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                About
              </h1>

              <p className="mt-4 text-xl leading-7 text-white/90">
                Discover Our Story and Mission
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <Link
                  href="/"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Home
                </Link>
                <span className="inline-flex items-center text-sm text-white/70">
                  / About
                </span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </header> */}
        <div className="relative w-full border-red-400">
          <Image
            src="/assets/banner.jpg"
            alt=""
            width={1920}
            height={1080}
            className="h-auto w-full"
          />
      
          {/* Centered "About Us" text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold text-white">ABOUT US</h1>

            {/* Buttons centered below the text */}
            <div className="flex space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                Home /
              </Link>
              <Link href="/about" className="text-2xl font-bold text-sky-400">
                About
              </Link>
            </div>
          </div>
        </div>

        <section className="dark:bg-dark overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
          <div className="">
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full lg:w-6/12">
                <div className="flex items-center">
                  <div className="w-full lg:w-96">
                    <div className="relative z-10 my-4">
                      <Image
                        src="/assets/book.webp"
                        alt=""
                        className="w-full rounded-2xl"
                        width={800}
                        height={800}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 xl:w-5/12">
                <div className="mt-10 lg:mt-0">
                  <span className="mb-4 block text-3xl font-bold text-primary">
                    Why Choose Us
                  </span>

                  <p className="text-body-color dark:text-dark-6 mb-5 text-justify text-base">
                    Immerse yourself in captivating stories, explore diverse
                    genres, and find books that ignite your passion. Our curated
                    collection offers something for every reader.
                  </p>
                  <p className="text-body-color dark:text-dark-6 mb-8 text-justify text-base">
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
