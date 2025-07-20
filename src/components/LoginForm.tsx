"use client";
import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const loginUser = async (formData: FormData) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Login failed");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (result) => {
      if (result.data) {
        setUser(result.data);
        router.push("/");
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setError(error.message || "Login failed");
      } else {
        setError("Login failed");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex-1 max-w-3xl bg-white p-10 rounded-2xl space-y-7 border border-teal-100"
    >
      <div className="flex flex-col items-center mb-2">
        <div className="w-16 h-16 mb-2">
          <Image
            src="/vercel.svg"
            alt="Logo"
            width={64}
            height={64}
            priority
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-teal-700 mb-1 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-sm">Sign in to your account</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
        />
      </div>

      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm mt-2"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>
      {/* <div className="bg-teal-50 border border-teal-200 rounded p-3 text-sm text-gray-700 mt-2">
        <span className="font-semibold text-teal-700">Demo Login:</span>
        <ul className="list-disc ml-6 mt-1">
          <li>
            <span className="font-medium">Email:</span> alice@example.com
          </li>
          <li>
            <span className="font-medium">Password:</span> password123
          </li>
        </ul>
        <span className="block mt-2 text-xs text-gray-500">
          Use these credentials to log in as a demo user.
        </span>
      </div> */}
    </form>
  );
};

export default LoginForm;
