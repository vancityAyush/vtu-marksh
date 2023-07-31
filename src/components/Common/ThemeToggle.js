import React, { useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import Router from 'next/router'


const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
    Router.reload(window.location.pathname)
  };

  const darkIcon = <MoonIcon />;
  const lightIcon = <SunIcon />;

  return (
    <button
      className="m-2 w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition duration-300 focus:outline-none shadow"
      onClick={toggleTheme}
    >
      <div
        id="switch-toggle"
        className={`w-6 h-6 relative rounded-full transition duration-500 transform p-1 text-white ${isDarkMode
            ? "bg-gray-500 translate-x-full"
            : "bg-yellow-500 -translate-x-2"
          }`}
      >
        {isDarkMode ? darkIcon : lightIcon}
      </div>
    </button>
  );
};

export default ThemeToggle;
