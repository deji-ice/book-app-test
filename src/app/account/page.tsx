"use client";

import React from "react";
import UserProfile from "@/components/UserProfile";
import { useUserStore } from "@/store/userStore";
import { useSingleUser, useAllUsers } from "@/hooks/useUsers";

export default function AccountPage() {
  const currentUser = useUserStore((state) => state?.currentUser);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSingleUser(currentUser?.id ?? "");

  const {
    data: allUsers,
    isLoading: usersLoading,
  } = useAllUsers();

  if (userLoading || usersLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (userError || !user) {
    return <div className="text-center mt-10">Failed to load account.</div>;
  }

  const followers = allUsers?.filter((u) => user.followers.includes(u.id)) ?? [];
  const following = allUsers?.filter((u) => user.following.includes(u.id)) ?? [];

  return (
    <main className="mx-auto p-6">
      <UserProfile
        user={user}
        followers={followers}
        following={following}
        isCurrentUser
      />
    </main>
  );
}
