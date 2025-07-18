"use client";

import React from "react";
import { useUserStore } from "@/store/userStore";
import { useUsers } from "@/hooks/useUsers";

interface FollowButtonProps {
  userId: string; // The profile being viewed
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { followUser, unfollowUser } = useUsers(); 

  if (!currentUser) return null;

  // Check: is the current user already following this profile
  const isFollowing = currentUser.following.includes(userId);

  const handleFollow = () => {
    followUser({
      userId, // The profile you want to follow
      followerId: currentUser.id,
    });
  };

  const handleUnfollow = () => {
    unfollowUser({
      userId, // The profile you want to unfollow
      followerId: currentUser.id,
    });
  };

  return (
    <button
      className={`px-4 py-1 rounded font-semibold transition cursor-pointer text-sm ${
        isFollowing
          ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
