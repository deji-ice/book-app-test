"use client";

import React, { useState } from "react";
import BookCard from "./BookCard";
import { useBooks } from "@/hooks/useBooks";

const BookList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const { getAllBooks } = useBooks();
  const { data, isLoading, isError } = getAllBooks(page, limit);
  const books = data?.books || [];
  const total = data?.total || 0;

  const totalPages = Math.ceil(total / limit);

  // Filter books based on search term and genre
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      genreFilter === "" || book.genre.toLowerCase() === genreFilter.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  //  If filters/search are applied,
  // disable Next when fewer than limit remain:
  const isFiltered = searchTerm.trim() !== "" || genreFilter.trim() !== "";
  const hasMore = isFiltered
    ? filteredBooks.length === limit
    : page < totalPages;

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Failed to load books.</p>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10 space-x-4">
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
          className="px-4 py-2 bg-teal-600 text-white rounded cursor-pointer disabled:opacity-50"
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
