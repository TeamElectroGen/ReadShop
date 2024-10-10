import Image from "next/image";
import Link from "next/link";

const AuthorCard = ({ author }) => {
  return (
    <Link
      href={`/author/${author?._id}`}
      className="flex flex-col items-center hover:bg-slate-700 rounded hover:bg-opacity-15"
    >
      {/* author Cover Image */}
      <div className="relative flex h-[150px] w-[150px] justify-center overflow-hidden rounded-full bg-[#f3f2f2] shadow-sm">
        <Image
          src={author?.image}
          alt={author?.image}
          className="h-full w-full object-cover"
          height={200}
          width={200}
        />
      </div>
      {/* Author Info */}
      <div className="mt-4 text-center font-serif">
        <h1>{author?.name}</h1>
      </div>
    </Link>
  );
};

export default AuthorCard;
