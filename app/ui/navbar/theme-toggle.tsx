"use client";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
const iconClassname = "w-[24px] h-[24px] ";
const buttonClassname =
  "h-full mr-2 p-2 w-[40px] w-full flex items-center justify-center dark:hover:bg-gray-600 hover:bg-gray-200 rounded-[12px] border-[2px] ";
export const ThemeToggle = () => {
  const themeSwitch = useTheme();
  const theme = useRef(themeSwitch.theme);
  const ToggleTheme = () => {
    if (theme.current === "dark") {
      themeSwitch.setTheme("light");
      theme.current = "light";
    } else {
      themeSwitch.setTheme("dark");
      theme.current = "dark";
    }
  };
  if (themeSwitch.theme === "dark") {
    return (
      <button onClick={ToggleTheme} className={buttonClassname}>
        <IconMoon className={iconClassname} />
      </button>
    );
  } else {
    return (
      <button onClick={ToggleTheme} className={buttonClassname}>
        <IconSun className={iconClassname} />
      </button>
    );
  }
};
