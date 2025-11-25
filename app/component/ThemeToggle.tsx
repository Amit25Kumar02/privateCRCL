"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md w-full cursor-pointer "
    >
      {theme === "light" ? (
        <div className=" flex gap-2 items-center">
          <Moon size={18} className="text-sidebar-text" />
          <span className="text-sidebar-text text-[16px]">Dark Mode</span>
        </div>
      ) : (
        <div className=" flex gap-2 items-center">
          <Sun size={18} className="text-sidebar-text" />
          <span className="text-sidebar-text text-[16px]">Light Mode</span>
        </div>

      )}
    </button>
  );
}
