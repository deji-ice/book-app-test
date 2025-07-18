"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const registerUser = async (data: { email: string; password: string; userName: string; }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Registration failed");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (result) => {
      setUser(result.data);
      router.push("/"); // Redirect to home
    },
    onError: (err: any) => {
      setError(err.message || "Registration failed");
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
      className="mx-auto flex-1 max-w-3xl bg-white p-8 rounded-lg shadow-md space-y-6 border border-teal-100"
    >
      <h2 className="text-3xl font-bold text-teal-700 text-center mb-4">Create an Account</h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700">User Name</label>
        <input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
          placeholder="Your username"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
          placeholder="••••••••"
        />
      </div>

      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded font-semibold hover:bg-teal-700 transition"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Registering..." : "Register"}
      </button>

      <div className="text-center text-sm mt-2">
        Already have an account?{" "}
        <a href="/login" className="text-teal-600 hover:underline font-medium">
          Login
        </a>
      </div>
    </form>
  );
}

