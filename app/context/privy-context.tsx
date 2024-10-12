"use client";

import { PrivyProvider } from "@privy-io/react-auth";
export default function PrivyAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider appId={process.env.PRIVY_APP_ID as string}>
      {children}
    </PrivyProvider>
  );
}
