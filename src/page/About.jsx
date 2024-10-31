import Link from "next/link";
import { AiFillWechat } from "react-icons/ai";
import { BsFillStarFill, BsGlobe } from "react-icons/bs";
import { FaDonate, FaHandHoldingWater } from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";

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
        <section className="mb-8 mt-8 bg-white py-12">
          <div className="container mx-auto">
            <h2 className="mb-6 text-center text-3xl font-bold text-[#0B1931]">
              Our Mission
            </h2>
            {/* Inspire Section */}
            <div className="flex justify-around pt-8">
              <hr className="mx-4 h-40 border border-gray-300" />
              <div className="flex flex-col items-center space-y-4">
                <BsFillStarFill size={40} className="text-yellow-500" />
                <h3 className="text-xl font-semibold text-[#0B1931]">
                  Inspire
                </h3>
                <p className="max-w-xs text-center text-gray-600">
                  We aim to spark a passion for reading.
                </p>
              </div>

              {/* Divider */}
              <hr className="mx-4 h-40 border border-gray-300" />

              {/* Empower Section */}
              <div className="flex flex-col items-center space-y-4">
                <SlBookOpen size={40} className="text-blue-500" />
                <h3 className="text-xl font-semibold text-[#0B1931]">
                  Empower
                </h3>
                <p className="max-w-xs text-center text-gray-600">
                  Our recommendations help you find books that resonate with
                  you.
                </p>
              </div>

              {/* Divider */}
              <hr className="mx-4 h-40 border border-gray-300" />

              {/* Connect Section */}
              <div className="flex flex-col items-center space-y-4">
                <BsGlobe size={40} className="text-green-500" />
                <h3 className="text-xl font-semibold text-[#0B1931]">
                  Connect
                </h3>
                <p className="max-w-xs text-center text-gray-600">
                  Bringing readers together to create a thriving book-loving
                  community.
                </p>
              </div>
              <hr className="mx-4 h-40 border border-gray-300" />
            </div>
          </div>
        </section>

        <section className="dark:bg-dark overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
          <div className="container mx-auto">
            <div className="mx-4 mb-10 text-center">
              <span className="mb-4 block text-6xl font-semibold">
                Why Choose Us
              </span>
            </div>
            <div className="flex gap-4">
              <div className="group flex w-96 flex-col items-center space-y-4 rounded-2xl bg-[#FAD02E] p-6 hover:bg-white">
                <FaHandHoldingWater
                  className="text-white group-hover:text-[#C31C37]"
                  size={40}
                />
                <h1 className="text-[#A99F8D ] font-mono group-hover:text-[#C31C37]">
                  24X7 Support
                </h1>
                <h3 className="text-[#A99F8D ] text-center font-mono group-hover:text-[#C31C37]">
                  Contact us 24 hours a day, 7 <br /> days a week
                </h3>
              </div>
              <div className="group flex w-96 flex-col items-center space-y-4 rounded-2xl bg-[#FAD02E] p-6 hover:bg-white">
                <FaDonate
                  className="text-white group-hover:text-[#C31C37]"
                  size={40}
                />
                <h1 className="text-[#A99F8D ]font-mono group-hover:text-[#C31C37]">
                  Payment Secure
                </h1>
                <h3 className="text-[#A99F8D ] text-center font-mono group-hover:text-[#C31C37]">
                  Safe and reliable transactions <br /> every time you shop
                </h3>
              </div>
              <div className="group flex w-96 flex-col items-center space-y-4 rounded-2xl bg-[#FAD02E] p-6 hover:bg-white">
                <AiFillWechat
                  className="text-white group-hover:text-[#C31C37]"
                  size={40}
                />
                <h1 className="text-[#A99F8D ] font-mono group-hover:text-[#C31C37]">
                  AI Chat Support
                </h1>
                <h3 className="text-[#A99F8D ] text-center font-mono group-hover:text-[#C31C37]">
                  Get instant assistance 24/7 with <br /> our AI-powered support
                </h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
