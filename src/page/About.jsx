import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-4 2xl:px-36">
        <header className="relative mt-12 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-green-500">
          <div className="container px-4 py-8 sm:px-6 lg:px-8">
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
        </header>

        <section className="dark:bg-dark overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap items-center justify-between">
              <div className="w-full px-4 lg:w-6/12">
                <div className="-mx-3 flex items-center sm:-mx-4">
                  <div className="w-full px-3 sm:px-4 xl:w-1/2">
                    <div className="py-3 sm:py-4">
                      <Image
                        src="https://images.pexels.com/photos/4440123/pexels-photo-4440123.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                        className="w-full rounded-2xl"
                        width={100}
                        height={60}
                      />
                    </div>
                    <div className="py-3 sm:py-4">
                      <Image
                        src="https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                        className="w-full rounded-2xl"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:px-4 xl:w-1/2">
                    <div className="relative z-10 my-4">
                      <Image
                        src="https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                        className="w-full rounded-2xl"
                        width={100}
                        height={100}
                      />
                      <span className="absolute -bottom-7 -right-7 z-[-1]">
                        <svg
                          width={134}
                          height={106}
                          viewBox="0 0 134 106"
                          fill="none"
                          // xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="1.66667"
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 1.66667 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 16.3333 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 31 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 45.6667 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3334"
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 60.3334 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 88.6667 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 117.667 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 74.6667 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 103 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy={104}
                            r="1.66667"
                            transform="rotate(-90 132 104)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.66667"
                            cy="89.3333"
                            r="1.66667"
                            transform="rotate(-90 1.66667 89.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy="89.3333"
                            r="1.66667"
                            transform="rotate(-90 16.3333 89.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy="89.3333"
                            r="1.66667"
                            transform="rotate(-90 31 89.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy="89.3333"
                            r="1.66667"
                            transform="rotate(-90 45.6667 89.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3333"
                            cy="89.3338"
                            r="1.66667"
                            transform="rotate(-90 60.3333 89.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy="89.3338"
                            r="1.66667"
                            transform="rotate(-90 88.6667 89.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy="89.3338"
                            r="1.66667"
                            transform="rotate(-90 117.667 89.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy="89.3338"
                            r="1.66667"
                            transform="rotate(-90 74.6667 89.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy="89.3338"
                            r="1.66667"
                            transform="rotate(-90 103 89.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy="89.3338"
                            r="1.66667"
                            transform="rotate(-90 132 89.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.66667"
                            cy="74.6673"
                            r="1.66667"
                            transform="rotate(-90 1.66667 74.6673)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.66667"
                            cy="31.0003"
                            r="1.66667"
                            transform="rotate(-90 1.66667 31.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 16.3333 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy="31.0003"
                            r="1.66667"
                            transform="rotate(-90 16.3333 31.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 31 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy="31.0003"
                            r="1.66667"
                            transform="rotate(-90 31 31.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 45.6667 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy="31.0003"
                            r="1.66667"
                            transform="rotate(-90 45.6667 31.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3333"
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 60.3333 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3333"
                            cy="30.9998"
                            r="1.66667"
                            transform="rotate(-90 60.3333 30.9998)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 88.6667 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy="30.9998"
                            r="1.66667"
                            transform="rotate(-90 88.6667 30.9998)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 117.667 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy="30.9998"
                            r="1.66667"
                            transform="rotate(-90 117.667 30.9998)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 74.6667 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy="30.9998"
                            r="1.66667"
                            transform="rotate(-90 74.6667 30.9998)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 103 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy="30.9998"
                            r="1.66667"
                            transform="rotate(-90 103 30.9998)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy="74.6668"
                            r="1.66667"
                            transform="rotate(-90 132 74.6668)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy="30.9998"
                            r="1.66667"
                            transform="rotate(-90 132 30.9998)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.66667"
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 1.66667 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.66667"
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 1.66667 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 16.3333 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 16.3333 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 31 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 31 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 45.6667 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 45.6667 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3333"
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 60.3333 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3333"
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 60.3333 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 88.6667 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 88.6667 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 117.667 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 117.667 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 74.6667 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 74.6667 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 103 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 103 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy="60.0003"
                            r="1.66667"
                            transform="rotate(-90 132 60.0003)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy="16.3333"
                            r="1.66667"
                            transform="rotate(-90 132 16.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.66667"
                            cy="45.3333"
                            r="1.66667"
                            transform="rotate(-90 1.66667 45.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="1.66667"
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 1.66667 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy="45.3333"
                            r="1.66667"
                            transform="rotate(-90 16.3333 45.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="16.3333"
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 16.3333 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy="45.3333"
                            r="1.66667"
                            transform="rotate(-90 31 45.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={31}
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 31 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy="45.3333"
                            r="1.66667"
                            transform="rotate(-90 45.6667 45.3333)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="45.6667"
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 45.6667 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3333"
                            cy="45.3338"
                            r="1.66667"
                            transform="rotate(-90 60.3333 45.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="60.3333"
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 60.3333 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy="45.3338"
                            r="1.66667"
                            transform="rotate(-90 88.6667 45.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="88.6667"
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 88.6667 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy="45.3338"
                            r="1.66667"
                            transform="rotate(-90 117.667 45.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="117.667"
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 117.667 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy="45.3338"
                            r="1.66667"
                            transform="rotate(-90 74.6667 45.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="74.6667"
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 74.6667 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy="45.3338"
                            r="1.66667"
                            transform="rotate(-90 103 45.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={103}
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 103 1.66683)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy="45.3338"
                            r="1.66667"
                            transform="rotate(-90 132 45.3338)"
                            fill="#3056D3"
                          />
                          <circle
                            cx={132}
                            cy="1.66683"
                            r="1.66667"
                            transform="rotate(-90 132 1.66683)"
                            fill="#3056D3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
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
