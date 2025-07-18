"use client";

import React, { useState } from "react";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";
import { useGetAllBooks } from "@/hooks/useBooks";

const BookList = () => {
  const { data, isLoading, isError } = useGetAllBooks(1, 9999);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const books = data?.books || [];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      !genreFilter || book.genre.toLowerCase() === genreFilter.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  const paginatedBooks = filteredBooks.slice((page - 1) * limit, page * limit);

  const totalPages = Math.ceil(filteredBooks.length / limit);

  const hasMore = page < totalPages;

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Failed to load books.</p>;

  return (
    <div className="w-full min-h-[calc(100vh-12rem)] h-full flex flex-col justify-between items-center">
      <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <GenreFilter selected={genreFilter} onChange={setGenreFilter} />
      </div>

      {paginatedBooks.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {paginatedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <div className="flex justify-center  mt-10 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-teal-600 text-white rounded cursor-pointer disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMore}
          className="px-4 py-2 bg-teal-600 text-white rounded cursor-pointer disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
