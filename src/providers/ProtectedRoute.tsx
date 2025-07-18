"use client";
import { useUserStore } from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((state) => state.currentUser);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const router = useRouter();
  const pathname = usePathname();

  // memoized public routes to avoid unnecessary re-renders
  const publicRoutes = useMemo(() => ["/login", "/register"], []);

  useEffect(() => {
    if (!hasHydrated) return; //  Waits until hydrated

    if (!user?.id && !publicRoutes.includes(pathname)) {
      router.replace("/login"); // Redirect to login if not authorized
    }
  }, [user, pathname, router, hasHydrated, publicRoutes]);

  if (!hasHydrated) {
    return <div className="min-h-[calc(100vh-12rem)]">Loading...</div>;
  }

  if (!user?.id && !publicRoutes.includes(pathname)) {
    return (
      <div className="min-h-[calc(100vh-12rem)]">
        Not authorized. Redirecting to login...
      </div>
    );
  }

  return <>{children}</>;
}
