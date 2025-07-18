import React from "react";
import type { Book } from "@/types";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Image from "next/image";

const BookDetail = ({ book }: { book: Book }) => (
  <div className="bg-white rounded-lg p-6">
    <div className="flex flex-col lg:flex-row gap-8">
      <Image
        src={book.coverImage}
        alt={book.title}
        width={300}
        height={450}
        className="w-full max-h-full  lg:w-80 lg:h-auto object-cover rounded-lg shadow"
      />
      <div className="flex-1 flex flex-col">
        <h2 className="text-3xl font-bold mb-3">{book.title}</h2>
        <p className="text-gray-700 text-lg mb-1">by {book.author}</p>
        <p className="text-gray-500 text-sm mb-4">
          Published: {book.publishedDate}
        </p>
        <p className="text-gray-800 mb-6 leading-relaxed">{book.description}</p>
        <span className="inline-block bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-xs font-medium w-fit">
          {book.genre}
        </span>
      </div>
    </div>

    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <div className="max-h-[300px] overflow-y-auto mb-6">
        <CommentList bookId={book.id} />
      </div>

      <CommentForm bookId={book.id} />
    </div>
  </div>
);

export default BookDetail;
