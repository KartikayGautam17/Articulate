"use client";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
export function ThemeWrapper({
  children,
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
  forcedTheme,
}: ThemeProviderProps) {
  const props = {
    attribute,
    defaultTheme,
    enableSystem,
    disableTransitionOnChange,
    forcedTheme,
  };
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
