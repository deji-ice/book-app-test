import LoginForm from "@/components/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <main className=" p-6 bg-white flex flex-col lg:flex-row lg:justify-center items-center">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
