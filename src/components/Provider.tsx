"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";


interface Props {
  children: React.ReactNode;
}

// This is a client component that wraps the SessionProvider
export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
