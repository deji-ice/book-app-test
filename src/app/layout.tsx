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
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${geist.variable} ${geistMono.variable} w-full mx-auto`}>
        <QueryProvider>
          <NavBar /> 
          {/* Main content area with padding and max width */}
          {/* Using ProtectedRoute to ensure only authenticated users can access the main content */}
          {/* This will render the children components passed to this layout */}  
          <ProtectedRoute>
            <main className=" h-full min-h-[calc(100vh-300px)] max-w-[1300px] mt-20 lg:mt-10 mx-auto p-4">
              {children}
            </main>
          </ProtectedRoute>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
