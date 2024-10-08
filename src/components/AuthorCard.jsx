import Image from "next/image";
import Link from "next/link";

const AuthorCard = ({ authors }) => {
  return (
    <Link
      href={`/view-details/${authors?._id}`}
      className="z-50 mb-4 flex h-full w-full max-w-[212px] flex-col space-y-3 overflow-hidden rounded-xl border-2 border-white/70 bg-background/50 p-4 backdrop-blur-md transition-all duration-300 ease-in hover:shadow-md"
    >
      {/* author Cover Image */}
      <div className="relative h-[260px] overflow-hidden rounded-md bg-[#f3f2f2] shadow-sm">
        <Image
          src={authors?.image}
          alt={authors?.image}
          className="h-full w-full object-cover"
          height={228}
          width={168}
        />
      </div>
      {/* Author Info */}
      <div className="text-center">
        <h1>{authors?.name}</h1>
      </div>
    </Link>
  );
};

export default AuthorCard;
