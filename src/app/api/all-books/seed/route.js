// import { books } from "@/lib/books";
// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const GET = async () => {
//   const db = await connectDB();
//   const booksCollection = await db.collection("books");
//   try {
//     const bulkOperations = books.map((book) => ({
//       updateOne: {
//         filter: { BookName: book.BookName },
//         update: {
//           $set: {
//             AuthorName: book.AuthorName,
//             AuthorUsername: book.AuthorUsername,
//             CoverImage: book.CoverImage,
//             Description: book.Description,
//             PublicationName: book.PublicationName,
//             PublicationId: book.PublicationId,
//             PublishDate: book.PublishDate,
//             Price: book.Price,
//             Rating: book.Rating,
//             Genre: book.Genre,
//             wishList: book.wishList || [],
//             readList: book.readList || [],
//           },
//         },
//         upsert: true,
//       },
//     }));

//     const result = await booksCollection.bulkWrite(bulkOperations);

//     return NextResponse.json({
//       message: "Books updated successfully",
//       matchedCount: result.matchedCount,
//       modifiedCount: result.modifiedCount,
//       upsertedCount: result.upsertedCount,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Update failed", error });
//   }
// };
