import Image from "next/image";
import Link from "next/link";

const AuthorCard = ({ author }) => {
  return (
    <Link href={`/author/${author?._id}`} className="group flex transform cursor-pointer flex-col items-center rounded-xl border p-8 transition-colors duration-300 hover:border-transparent hover:bg-primary/10 dark:border-gray-700 dark:hover:border-transparent">
      <Image
        className="rounded-full object-cover ring-4 ring-gray-300"
        src={author?.image}
        alt={author.name + "image"}
        height={200}
        width={200}
      />

      {/* Author Info */}
      <div className="mt-4 text-center">
        <h1 className="text-sm font-semibold capitalize text-gray-700 group-hover:text-primary-foreground dark:text-white">
          {author?.name}
        </h1>
      </div>
    </Link>
  );
};

export default AuthorCard;
