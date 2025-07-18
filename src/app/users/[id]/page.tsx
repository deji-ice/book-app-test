"use client";

import React from "react";
import { useParams } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { useUserStore } from "@/store/userStore";
import { useAllUsers, useFollowers, useSingleUser } from "@/hooks/useUsers";

const UserPage = () => {
  const params = useParams();
  const userId = params?.id as string;

  const currentUser = useUserStore((state) => state.currentUser);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSingleUser(userId);

  const { data: followers, isLoading: followersLoading } = useFollowers(userId);
  const { data: allUsers } = useAllUsers();

  const following =
    allUsers?.filter((u) => user?.following.includes(u.id)) ?? [];

  if (userLoading || followersLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (userError) {
    return <div className="text-center mt-10">Failed to load user.</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">User not found.</div>;
  }

  return (
    <UserProfile
      user={user}
      followers={followers ?? []}
      following={following}
      isCurrentUser={currentUser?.id === user.id}
    />
  );
};

export default UserPage;
