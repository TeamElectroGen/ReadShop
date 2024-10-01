import Image from "next/image";
import React from "react";
import poster from "../../public/assets/poster.jpg";

const HomePageCategoryGrid = ({ books }) => {
  return (
    <div className="mt-10 flex grid-cols-1 flex-col gap-2 rounded-sm bg-primary px-10 py-10 shadow-md lg:grid lg:h-[33rem] lg:grid-cols-12">
      <h1 className="col-span-12 mb-5 text-center text-2xl font-bold">
        New Section
      </h1>
      <div className="scrollbar-none hide-scrollbar col-span-1 flex h-[33rem] flex-col gap-2 overflow-scroll rounded-sm border bg-secondary/80 px-10 lg:col-span-6 lg:h-[24rem]">
        <div className="py-10">
          {books?.map((book) => (
            <div
              key={book._id}
              className="flex items-center justify-between gap-2 rounded-sm border-b border-secondary bg-secondary-foreground/5 pr-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="min-h-16">
                  <Image
                    className="min-h-16 bg-primary-foreground object-contain"
                    src={book?.CoverImage}
                    width={50}
                    height={100}
                    alt={book.BookName}
                  ></Image>
                </div>
                <div>
                  <p>{book.BookName}</p>
                  <p>{book.AuthorName}</p>
                </div>
              </div>
              <p>$ {book.Price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1 grid h-full grid-cols-1 grid-rows-4 gap-2 lg:col-span-3 lg:h-[24rem]">
        <div className="row-span-1 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-violet-500 to-violet-900 text-xl text-white lg:h-full">
          Islamic
        </div>
        <div className="row-span-1 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-teal-500 to-teal-900 text-xl text-white lg:h-full">
          Fiction
        </div>
        <div className="row-span-1 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-orange-500 to-orange-900 text-xl text-white lg:h-full">
          Non-Fiction
        </div>
        <div className="row-span-1 flex h-32 w-full items-center justify-center rounded-sm bg-gradient-to-tr from-orange-500 to-orange-900 text-xl text-white lg:h-full">
          Non-Fiction
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3 lg:h-[24rem]">
        <Image
          src={poster}
          alt={"Banner Images"}
          width={100}
          height={0}
          className="h-full w-full rounded-sm object-cover"
        />
      </div>
    </div>
  );
};

export default HomePageCategoryGrid;
