"use client";

import React from "react";
import Link from "next/link";
import { useGetSingleBook } from "@/hooks/useBooks";
import { useAllUsers } from "@/hooks/useUsers";

type CommentListProps = {
  bookId: string;
};

const CommentList = ({ bookId }: CommentListProps) => {
  const {
    data: book,
    isLoading: bookLoading,
    error: bookError,
  } = useGetSingleBook(bookId);
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useAllUsers();

  if (bookLoading || usersLoading) return <p>Loading comments...</p>;
  if (bookError || usersError || !book) return <p>Failed to load comments.</p>;

  const getUserName = (userId: string) =>
    users?.find((u) => u.id === userId)?.userName || "Unknown User";

  const comments = book.comments || [];

  if (comments.length === 0) {
    return <div className="text-gray-500">No comments yet.</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 "
        >
          <Link
            href={`/users/${comment.userId}`}
            className="font-semibold text-teal-700 hover:underline"
          >
            {getUserName(comment.userId)}
          </Link>
          <p className="text-gray-800 mt-1">{comment.comment}</p>
          {comment.rating && (
            <p className="text-yellow-600 text-xs mt-2 font-medium">
              ★ {comment.rating} / 5
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
