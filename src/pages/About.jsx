import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-4 2xl:px-36">
        <header style={{ borderRadius: '32px' }} className="relative mt-12 flex h-72 w-full items-center justify-center bg-lightGray-200"
       
        >
          <Image
             src="/assets/custom banner.png"
              alt="Custom banner"
               layout="fill" 
    
  
              />
          <div className="relative z-10" >
            <h1 className="text-3xl font-bold text-darkGray-800 font-display">About Us</h1>
            <p className="py-3 text-center text-sm font-medium text-mediumGray-500 font-mono">
              Home / About us
            </p>
          </div>
        </header>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-background p-6 lg:flex-row lg:gap-6">
          <div className=" relative flex items-center justify-center border bg-white lg:w-1/2">
            <Image  layout="fill" className="object-cover" src="/assets/about.png" alt="About image" />
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

        <div className="mt-12 gap-4 rounded-2xl bg-lightGray-200 p-6 lg:flex-row lg:gap-6">
          <h3 className="text-center text-2xl font-semibold">Our team</h3>

          {/* Team container */}
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
              <div className="flex relative h-3/4 items-center justify-center rounded-full border bg-white">
                <Image   sizes="(max-width: 768px) 100vw, 50vw" className="rounded-full object-cover" layout="fill" src="	https://images.pexels.com/photos/7641824/pexels-photo-7641824.jpeg?auto=compress&cs=tinysrgb&w=600" alt="team member" />
              </div>
              <div className="mt-2 h-10 w-full bg-white hover:bg-[#33C24D] rounded-2xl">
                <h1 className="text-center font-mono text-2xl text-[#33C24D] hover:text-white">Ayub</h1>
              </div>
            </div>
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
              <div className="flex relative h-3/4 items-center justify-center rounded-full border bg-white">
                <Image className="rounded-full object-cover"    sizes="(max-width: 768px) 100vw, 50vw" layout="fill" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" alt="team member" />
              </div>
              <div className="mt-2 h-10 w-full bg-white hover:bg-[#33C24D] rounded-2xl">
                <h1 className="text-center font-mono text-2xl text-[#33C24D] hover:text-white">Nazrul</h1>
              </div>
            </div>
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
            <div className="flex relative h-3/4 items-center justify-center rounded-full border bg-white">
                <Image  className="rounded-full object-cover"   sizes="(max-width: 768px) 100vw, 50vw" layout="fill" src="	https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600" alt="team member" />
              </div>
              <div className="mt-2 h-10 w-full bg-white hover:bg-[#33C24D] rounded-2xl">
                <h1 className="text-center font-mono text-2xl text-[#33C24D] hover:text-white">Albab</h1>
              </div>
            </div>
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
            <div className="flex relative h-3/4 items-center justify-center rounded-full border bg-white">
                <Image  className="rounded-full object-cover"   sizes="(max-width: 768px) 100vw, 50vw" layout="fill" src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600" alt="team member" />
              </div>
              <div className="mt-2 h-10 w-full bg-white hover:bg-[#33C24D] rounded-2xl">
                <h1 className="text-center font-mono text-2xl text-[#33C24D] hover:text-white">Imran</h1>
              </div>
            </div>
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
            <div className="flex relative h-3/4 items-center justify-center rounded-full border bg-white">
                <Image  className="rounded-full object-cover"   sizes="(max-width: 768px) 100vw, 50vw" layout="fill" src="	https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600" alt="team member" />
              </div>
              <div className="mt-2 h-10 w-full bg-white hover:bg-[#33C24D] rounded-2xl">
                <h1 className="text-center font-mono text-2xl text-[#33C24D] hover:text-white">Abdullah</h1>
              </div>
            </div>
            {/* team card */}
            <div className="h-52 w-40 rounded-t-full border-4 p-2">
            <div className="flex relative h-3/4 items-center justify-center rounded-full border bg-white">
                <Image  className="rounded-full object-cover"   sizes="(max-width: 768px) 100vw, 50vw" layout="fill" src="	https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600" alt="team member" />
              </div>
              <div className="mt-2 h-10 w-full bg-white hover:bg-[#33C24D] rounded-2xl">
                <h1 className="text-center font-mono text-2xl text-[#33C24D] hover:text-white">Masud</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
