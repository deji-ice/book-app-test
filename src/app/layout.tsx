import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryClientProvider";
import ProtectedRoute from "@/providers/ProtectedRoute";

export const metadata: Metadata = {
  title: "Book Store App",
  description: "Created by Deji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased  w-full mx-auto` }>
        <QueryProvider>
          <NavBar />
          <ProtectedRoute>
            <main className=" h-full min-h-[calc(100vh-300px)] max-w-[1300px] mt-10 mx-auto p-4">
              {children}
            </main>
          </ProtectedRoute>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
