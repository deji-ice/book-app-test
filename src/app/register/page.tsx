import { RegisterForm } from "@/components/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="mx-auto p-6 bg-white flex flex-col lg:flex-row lg:justify-between items-center">
      <h1 className="flex-1">Register</h1>
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
