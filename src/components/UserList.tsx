import React from "react";
import type { User } from "@/types";
import Link from "next/link";

const UserList: React.FC<{ users: User[]; title?: string }> = ({
  users,
  title,
}) => (
  <div className="bg-white rounded-lg shadow p-4">
    {title && <h3 className="font-semibold mb-2">{title}</h3>}
    {users.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <svg
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mb-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4zm0-4a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
        <span>No users found.</span>
      </div>
    ) : (
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="py-2 flex items-center justify-between">
            <span>{user.userName}</span>
            <Link
              href={`/users/${user.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default UserList;
