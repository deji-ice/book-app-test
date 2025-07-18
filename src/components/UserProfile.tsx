import React from "react";
import type { User } from "@/types";
import UserList from "./UserList";
import FollowButton from "./FollowButton";

interface UserProfileProps {
  user: User;
  followers: User[];
  following: User[];
  isCurrentUser?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  followers,
  following,
  isCurrentUser,
}) => (
  <div className=" mx-auto bg-white   p-8 flex flex-col gap-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-1">{user.userName}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
      {!isCurrentUser && (
        <FollowButton userId={user.id} />
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UserList users={followers} title="Followers" />
      <UserList users={following} title="Following" />
    </div>
  </div>
);

export default UserProfile;
