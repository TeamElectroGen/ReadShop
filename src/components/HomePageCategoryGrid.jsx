"use client";
import Image from "next/image";
import Link from "next/link";
import poster from "../../public/assets/poster.jpg";
import RatingStar from "./RatingStar";

const HomePageCategoryGrid = ({ books }) => {
  const sortedBooks = books?.sort((a, b) => b.Rating - a.Rating);
  // const bestSellerRef = useRef(null);

  // const scrollToEnd = () => {
  //   const scrollableDiv = bestSellerRef.current?.querySelector(
  //     ".scrollable-content"
  //   );
  //   if (scrollableDiv) {
  //     const scrollDistance =
  //       scrollableDiv.scrollHeight - scrollableDiv.clientHeight;
  //     scrollableDiv.scrollTo({
  //       top: scrollDistance,
  //       behavior: "smooth",
  //     });
  //     console.log("Scrolling to:", scrollDistance);
  //   } else {
  //     console.log("Scrollable div not found");
  //   }
  // };

  return (
    <section className="mt-10 flex grid-cols-1 flex-col rounded-sm bg-primary shadow-md lg:h-[40rem]">
      {/* Title Section */}
      <div className="flex min-h-28 flex-col items-center justify-center bg-secondary/20">
        <h2 className="font-white text-center text-3xl font-black">
          Explore In the hive
        </h2>
        <p className="text-center text-mediumGray-500">
          Lorem, ipsum dolor sit emit consectetur adapt lit. Very tais, fugit.
        </p>
      </div>

      <div className="flex grid-cols-1 flex-col gap-2 p-4 lg:grid lg:h-[40rem] lg:grid-cols-12">
        {/* Top Book Section */}
        <section className="relative col-span-1 rounded-sm bg-secondary pt-2 lg:col-span-6">
          <h2 className="mx-auto w-fit rounded-sm rounded-b-none border-2 border-x-0 border-b-0 border-primary p-3 text-center font-display text-xl font-bold uppercase">
            Best Seller
          </h2>
          <div className="hide-scrollbar col-span-1 flex flex-col gap-2 overflow-y-scroll rounded-sm bg-primary bg-white p-2 shadow-inner shadow-black/10 lg:col-span-6">
            <div className="h-[35rem] rounded-sm lg:h-[26rem]">
              {sortedBooks?.map((book, idx) => (
                <div key={book._id} className="flex">
                  <Link
                    href={`/view-details/${book._id}`}
                    className="mb-2 flex flex-1 flex-row-reverse items-center justify-between gap-2 rounded-sm border-secondary bg-secondary p-1 shadow-sm sm:flex-row md:flex-row md:p-2 md:pr-4"
                  >
                    <div className="mb-2 flex h-12 min-w-12 items-center justify-center rounded-full border border-primary text-2xl">
                      {idx + 1}
                    </div>
                    <div className="flex h-full w-full justify-between gap-3">
                      <div className="h-24 min-h-full w-16">
                        <Image
                          className="h-full w-full rounded-sm object-cover"
                          src={book?.CoverImage}
                          width={50}
                          height={100}
                          alt={book.BookName}
                        ></Image>
                      </div>

                      <div className="flex w-full flex-1 flex-col justify-between pr-2 sm:items-start md:flex-row md:items-center">
                        <div className="flex-1">
                          <p className="font-semibold">{book.BookName}</p>
                          <p className="text-xs">{book.AuthorName}</p>
                          <RatingStar rating={book.Rating} />
                        </div>
                        <div>
                          <p className="text-md flex w-full min-w-20 items-end text-right font-bold text-green-600">
                            $ {book.Price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* <Button className="absolute bottom-20 right-20" onClick={scrollToEnd}>
          <FaArrowAltCircleDown />
        </Button> */}
        </section>

        <div className="relative col-span-1 grid gap-2 rounded-sm bg-secondary p-4 py-10 lg:col-span-6 lg:grid-cols-6 lg:grid-rows-2">
          <div className="col-span-6 max-h-52 w-full rounded-sm bg-gray-400 lg:row-span-1">
            Above
          </div>
          <div className="col-span-3 row-span-2 max-h-52 w-full rounded-sm bg-gray-400">
            Right
          </div>
          <div className="col-span-3 row-span-2 max-h-52 w-full rounded-sm bg-gray-400">
            Left
          </div>
        </div>

        {/* Top Book Section */}
        <section className="relative col-span-1 hidden rounded-sm bg-primary/50 p-5 md:p-10 lg:col-span-6">
          <h2 className="pb-4 text-center text-xl font-bold">Best Seller</h2>
          <div className="scrollbar-none hide-scrollbar col-span-1 flex h-[35rem] flex-col gap-2 overflow-scroll lg:col-span-6 lg:h-[26rem]">
            <div className="">
              {sortedBooks?.map((book) => (
                <Link
                  href={`/view-details/${book._id}`}
                  key={book._id}
                  className="mb-2 flex flex-col items-center justify-between gap-2 rounded-sm border-secondary bg-secondary p-1 shadow-sm sm:flex-row md:p-2 md:pr-4"
                >
                  <div className="flex h-full w-full justify-between gap-3">
                    <div className="min-h-full min-w-14">
                      <Image
                        className="h-full w-full rounded-sm object-cover"
                        src={book?.CoverImage}
                        width={50}
                        height={100}
                        alt={book.BookName}
                      ></Image>
                    </div>

                    <div className="flex w-full flex-1 flex-col pr-2">
                      <div className="flex-1">
                        <p className="font-semibold">{book.BookName}</p>
                        <p className="text-xs">{book.AuthorName}</p>
                        <RatingStar rating={book.Rating} />
                      </div>
                      <p className="text-md flex w-full min-w-20 items-end text-right font-bold text-green-600">
                        $ {book.Price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* <Button className="absolute bottom-20 right-20" onClick={scrollToEnd}>
          <FaArrowAltCircleDown />
        </Button> */}
        </section>
        <div className="hidden">
          {/* Category */}
          <div className="col-span-1 grid h-full grid-cols-1 grid-rows-5 gap-2 lg:col-span-3 lg:h-full">
            <div className="row-span-1 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-violet-500 to-violet-900 text-xl text-white duration-300 ease-in-out hover:scale-95 hover:cursor-pointer lg:h-full">
              Islamic
            </div>
            <div className="row-span-1 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-teal-500 to-teal-900 text-xl text-white duration-300 ease-in-out hover:scale-95 hover:cursor-pointer lg:h-full">
              Fiction
            </div>
            <div className="row-span-1duration-30 ease-in-out0 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-red-500 to-orange-900 text-xl text-white hover:scale-95 hover:cursor-pointer lg:h-full">
              Non-Fiction
            </div>
            <div className="row-span-1 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-pink-500 to-pink-900 text-xl text-white duration-300 ease-in-out hover:scale-95 hover:cursor-pointer lg:h-full">
              History
            </div>
            <div className="row-span-1duration-30 ease-in-out0 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-orange-500 to-orange-900 text-xl text-white hover:scale-95 hover:cursor-pointer lg:h-full">
              Self Development
            </div>
          </div>

          {/* Ads or Book of the week */}
          <div className="col-span-1 hover:cursor-pointer lg:col-span-3 lg:h-full">
            <Image
              src={poster}
              alt={"Banner Images"}
              width={100}
              height={0}
              className="h-full w-full rounded-sm bg-secondary/60 object-contain hover:bg-secondary hover:duration-1000 hover:ease-in-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageCategoryGrid;
