"use client";

import { PrivyProvider } from "@privy-io/react-auth";
export default function PrivyAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider appId={String(process.env.NEXT_PUBLIC_PRIVY_APP_ID)}>
      {children}
    </PrivyProvider>
  );
}
