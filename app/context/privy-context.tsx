"use client";

import { PrivyProvider } from "@privy-io/react-auth";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider appId={process.env.PRIVY_APP_ID as string}>
      {children}
    </PrivyProvider>
  );
}
