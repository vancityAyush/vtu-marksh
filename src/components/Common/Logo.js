import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

function Logo(props) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={props.width}
      height={props.height}
      className="dark:invert"
      priority
    />
  );
}

Logo.defaultProps = {
  width: 50,
  height: 50,
};

export default Logo;
