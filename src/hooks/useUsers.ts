"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { useUserStore } from "@/store/userStore";

// ✅ Get all users
export const useAllUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
  });

// ✅ Get single user by ID
export const useSingleUser = (id: string | undefined) =>
  useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("No user ID");
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    enabled: !!id,
  });

// ✅ Get followers by ID
export const useFollowers = (id: string) =>
  useQuery<User[]>({
    queryKey: ["users", id, "followers"],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}/followers`);
      if (!res.ok) throw new Error("Failed to fetch followers");
      return res.json();
    },
  });

// ✅ Follow mutation with Zustand update
export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.currentUser);

  return useMutation({
    mutationFn: async ({
      userId,
      followerId,
    }: {
      userId: string;
      followerId: string;
    }) => {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId }),
      });
      if (!res.ok) throw new Error("Failed to follow user");
      return res.json();
    },
    onSuccess: (_data, variables) => {
      if (currentUser) {
        // ✅ Add followed user ID to Zustand
        setUser({
          ...currentUser,
          following: [...currentUser.following, variables.userId],
        });
      }

      queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
      queryClient.invalidateQueries({
        queryKey: ["users", variables.userId, "followers"],
      });
    },
  });
};

// ✅ Unfollow mutation with Zustand update
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.currentUser);

  return useMutation({
    mutationFn: async ({
      userId,
      followerId,
    }: {
      userId: string;
      followerId: string;
    }) => {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId }),
      });
      if (!res.ok) throw new Error("Failed to unfollow user");
      return res.json();
    },
    onSuccess: (_data, variables) => {
      if (currentUser) {
        // ✅ Remove unfollowed user ID from Zustand
        setUser({
          ...currentUser,
          following: currentUser.following.filter(
            (id) => id !== variables.userId
          ),
        });
      }

      queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
      queryClient.invalidateQueries({
        queryKey: ["users", variables.userId, "followers"],
      });
    },
  });
};
