"use client";
import React from "react";
import { useParams } from "next/navigation";
import BookDetail from "@/components/BookDetail";
import { useGetSingleBook } from "@/hooks/useBooks";

export default function BookDetailPage() {
  const { id } = useParams(); //destructure the id from the params
  console.log(id);
  const { data: book, error, isLoading } = useGetSingleBook(id as string); // Use the hook to fetch book details by ID
  console.log("book", book);

  if (isLoading)
    return <div className="text-center mt-10">Loading book details...</div>;
  if (error || !book)
    return <div className="text-center mt-10">Book not found.</div>;

  return <BookDetail book={book} />;
}
