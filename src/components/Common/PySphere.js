import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

function PySphere(props) {
  const { systemTheme, theme, setTheme } = useTheme();
  console.log(theme);
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <Image
      src="/pysphere.svg"
      alt="PySphere"
      className="dark:invert"
      width={props.width}
      height={props.height}
      priority
    />
  );
}

PySphere.defaultProps = {
  width: 150,
  height: 48,
};

export default PySphere;
