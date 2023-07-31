import React from "react";

function Section({ children, id, title, className }) {
  return (
    <section
      id={id}
      className={
        `flex flex-col justify-center items-center m-2 h-full` + className
      }
    >
      <h1 className="w-full text-4xl font-extrabold dark:text-white p-4">
        {title}
      </h1>
      {children}
    </section>
  );
}

export default Section;
