"use client";
import { Book, Comment } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetAllBooks(page = 1, limit = 10) {
     // Fetch all books with pagination 
  return useQuery<{ books: Book[]; total: number }>({
    queryKey: ["books", page],
    queryFn: async () => {
      const res = await fetch(`/api/books?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch books");
      return res.json();
    },
  });
}

export function useGetSingleBook(id: string) {
  return useQuery<Book>({
    queryKey: ["books", id],  // Fetch a single book by ID
    queryFn: async () => {
      const res = await fetch(`/api/books/${id}`);
      if (!res.ok) throw new Error("Failed to fetch book");
      return res.json();
    },
    enabled: !!id, // only run if id is truthy
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookId,
      comment,
    }: {
      bookId: string;
      comment: Omit<Comment, "id">;
    }) => {
      const res = await fetch(`/api/books/${bookId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] }); // Invalidate books query to refetch after adding a comment
    },
  });
}
