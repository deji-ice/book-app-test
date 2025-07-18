"use client";

import BookList from "@/components/BookList";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const user = useUserStore((state) => state.currentUser);
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center text-gray-800">

        <div className=" w-full flex flex-col justify-center px-4 py-3">
          <h2 className="text-2xl lg:text-4xl font-semibold">
            Available books
          </h2>
          <p className="mb-5">Explore our collection of books.</p>
          <BookList />
        </div>
    </div>
  );
}
