"use client";

import { AuthProvider } from "@/modules/auth/context/AuthContext";

export default function Layout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
