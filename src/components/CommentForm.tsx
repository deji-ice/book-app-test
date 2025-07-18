"use client";

import { useAddComment } from "@/hooks/useBooks";
import { useUserStore } from "@/store/userStore";
import React, { useState } from "react";

interface CommentFormProps {
  bookId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ bookId }) => {
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useUserStore((state) => state?.currentUser);
  const addComment = useAddComment();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.comment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await addComment.mutateAsync({
        bookId,
        comment: {
          userId: user.id,
          comment: formData.comment,
          rating: formData.rating,
        },
      });
      setFormData({ comment: "", rating: 0 });
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
    >
      <textarea
        name="comment"
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        placeholder="Write your comment here..."
        value={formData.comment}
        onChange={handleChange}
        required
      />

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Rating:</label>
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            value={formData.rating}
            onChange={handleChange}
            className="w-16 border border-gray-300 rounded px-2 py-1 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !user}
          className="bg-teal-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 text-sm"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </div>

      {!user && (
        <p className="text-xs text-red-500 mt-2">
          You must be logged in to post a comment.
        </p>
      )}
    </form>
  );
};

export default CommentForm;
