import React from "react";
import type { Book } from "@/types";
import Link from "next/link";
import Image from "next/image";

const BookCard: React.FC<{ book: Book }> = ({ book }) => (
  <div className="bg-white rounded-lg border border-slate-400 py-4 flex flex-col items-center">
    <Image
      src={book.coverImage}
      alt={book.title}
      className="w-full h-46 object-contain rounded mb-2"
      width={228}
      height={192}
    />
    <h3 className="font-bold text-lg text-center">{book.title}</h3>
    <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
    <Link
      href={`/books/${book.id}`}
      className="text-white bg-teal-800 hover:bg-teal-700 transition mt-auto px-4 py-1 rounded-lg"
    >
      View Details
    </Link>
  </div>
);

export default BookCard;
