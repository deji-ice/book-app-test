"use client";
import { useUserStore } from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((state) => state.currentUser);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/register"];

  useEffect(() => {
    if (!hasHydrated) return; //  Waits until hydrated 

    if (!user?.id && !publicRoutes.includes(pathname)) {
      router.replace("/login"); // Redirect to login if not authorized
    }
  }, [user, pathname, router, hasHydrated]);

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  if (!user?.id && !publicRoutes.includes(pathname)) {
    return <div>Not authorized. Redirecting to login...</div>;
  }

  return <>{children}</>;
}
