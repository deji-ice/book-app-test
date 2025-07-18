"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";

export const useUsers = () => {
    const queryClient = useQueryClient();
    //  Get all users
    const getAllUsers = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("/api/users");
            return res.json();
        },
    });


    // Get a single user by ID
    const getSingleUser = (id: string | undefined) =>
        useQuery<User>({
            queryKey: ["user", id],
            queryFn: async () => {
                if (!id) throw new Error("No user ID"); // Ensure id is defined
                const res = await fetch(`/api/users/${id}`);
                if (!res.ok) throw new Error("Failed to fetch user");
                return res.json();
            },
            enabled: !!id, //  prevents query if id is empty
        });


    // Get followers for a user by ID
    const getFollowers = (id: string) =>
        useQuery<User[]>({
            queryKey: ["users", id, "followers"],
            queryFn: async () => {
                const res = await fetch(`/api/users/${id}/followers`);
                if (!res.ok) throw new Error("Failed to fetch followers");
                return res.json();
            },
        });

    // 3️⃣ Follow a user
    const followUser = useMutation({
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
            // Invalidate both the user's followers list AND the user data if needed
            queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
            queryClient.invalidateQueries({
                queryKey: ["users", variables.userId, "followers"],
            });
        },
    });

    // 4️⃣ Unfollow a user
    const unfollowUser = useMutation({
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
            queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
            queryClient.invalidateQueries({
                queryKey: ["users", variables.userId, "followers"],
            });
        },
    });

    return {
        getAllUsers,
        getSingleUser,
        getFollowers,
        followUser: followUser.mutate,
        unfollowUser: unfollowUser.mutate,
    };
};
