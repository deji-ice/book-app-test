import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const registerUser = async (data: {
  email: string;
  password: string;
  userName: string;
}) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export function RegisterForm() {
  const mutation = useMutation({
    mutationFn: registerUser,
  });

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ userName, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User Name</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={mutation.status === "pending"}>
        {mutation.status === "pending" ? "Registering..." : "Register"}
      </button>
      {mutation.isError && (
        <div style={{ color: "red" }}>
          {(mutation.error as any)?.message || "Registration failed"}
        </div>
      )}
      {mutation.isSuccess && (
        <div style={{ color: "green" }}>Registration successful!</div>
      )}
    </form>
  );
}
