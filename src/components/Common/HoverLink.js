import React from "react";
import Link from "next/link";
const HoverLink = ({ children, link }) => {
  return (
    <span>
      <Link href={link} className="font-display max-w-sm leading-tight">
        <span className="link link-underline link-underline-black text-">
          {" "}
          {children}
        </span>
      </Link>
      <style jsx>{`
        .link-underline {
          border-bottom-width: 0;
          background-image: linear-gradient(transparent, transparent),
            linear-gradient(#fff, #fff);
          background-size: 0 3px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 0.5s ease-in-out;
        }

        .link-underline-black {
          background-image: linear-gradient(transparent, transparent),
            linear-gradient(#f2c, #f2c);
        }

        .link-underline:hover {
          background-size: 100% 3px;
          background-position: 0 100%;
        }
      `}</style>
    </span>
  );
};

export default HoverLink;
