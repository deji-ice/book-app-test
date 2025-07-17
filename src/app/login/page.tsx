import LoginForm from "@/components/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <main className=" mx-auto p-6 bg-white flex flex-col lg:flex-row lg:justify-between items-center">
      <h1 className="flex-1">Login page</h1>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
