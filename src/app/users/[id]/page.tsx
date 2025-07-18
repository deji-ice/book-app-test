"use client";

import React from "react";
import { useParams } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { useUsers } from "@/hooks/useUsers";
import { useUserStore } from "@/store/userStore";

export default function UserPage() {
  const params = useParams();
  const userId = params?.id as string;
  const currentUser = useUserStore((state) => state.currentUser);
  // Use your React Query hook to get this user
  const { getSingleUser, getFollowers, getAllUsers } = useUsers();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = getSingleUser(userId);

  const {
    data: followers,
    isLoading: followersLoading,
    error: followersError,
  } = getFollowers(userId);

  const { data: allUsers } = getAllUsers;

  const following =
    allUsers?.filter((u) => user?.following.includes(u.id)) ?? [];

  if (userLoading || followersLoading)
    return <div className="text-center mt-10">Loading...</div>;
  if (userError)
    return <div className="text-center mt-10">Failed to load user.</div>;
  if (!user) return <div className="text-center mt-10">User not found.</div>;

  return (
    <UserProfile
      user={user!}
      isCurrentUser={currentUser?.id === user.id}
      followers={followers ?? []}
      following={following ?? []}
    />
  );
}
