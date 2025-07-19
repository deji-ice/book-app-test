import { RegisterForm } from "@/components/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <main className=" p-6 bg-white flex flex-col lg:flex-row lg:justify-center items-center">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
