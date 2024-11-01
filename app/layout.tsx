import type { Metadata } from "next";
import "@/app/globals.css";

import { ThemeWrapper } from "./context/theme-context";
import SessionAuthContext from "./context/session-context";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ThemeWrapper
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange={true}
          enableSystem={true}
        >
          <SessionAuthContext>
            {children}
            <Toaster />
          </SessionAuthContext>
        </ThemeWrapper>
      </body>
    </html>
  );
}
