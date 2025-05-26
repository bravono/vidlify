"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!auth.getCurrentUser()) {
      router.replace("/login");
    }
  }, [router]);

  return auth.getCurrentUser() ? children : null;
}