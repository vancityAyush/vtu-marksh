import React from "react";
import PySphere from "@/components/Common/PySphere";
import Logo from "@/components/Common/Logo";
import ThemeToggle from "@/components/Common/ThemeToggle";
import {
  FaLinkedin,
  FaMedium,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const routes = [
  {
    name: "Home",
    path: "/",
    subroutes: [
      {
        name: "PySphere",
        path: "/#pysphere",
      },
      {
        name: "Design",
        path: "/#design",
      },
      {
        name: "Experiment",
        path: "/#experiment",
      },
      {
        name: "Build",
        path: "/#build",
      },
    ],
  },
  {
    name: "Work",
    path: "/work",
    subroutes: [
      {
        name: "Projects",
        path: "/work#projects",
      },
    ],
  },
  {
    name: "About",
    path: "/about",
    subroutes: [
      {
        name: "About",
        path: "/about#about-us",
      },
      {
        name: "Team",
        path: "/about#team",
      },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
    subroutes: [
      {
        name: "Contact Us",
        path: "/contact#contact-us",
      },
    ],
  },
];

function Footer(props) {
  return (
    <footer
      aria-label="Site Footer"
      className="relative bg-gray-100 dark:bg-gray-950 dark:border-t dark:border-gray-800"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600 dark:text-teal-300">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
              <Logo />
              &nbsp; &nbsp;
              <PySphere />
            </a>
          </div>
        </div>
        <p className="mx-auto mt-2 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
          Your vision, our passion.
        </p>

        {/* <nav aria-label="Footer Nav" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {routes.map((route, index) => (
              <li key={route.name}>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href={route.path}
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
        </nav> */}

        <ul className="mt-8 flex justify-center gap-6 md:gap-6">
          <li>
            <a
              href="mailto:contact@pysphere.in"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
            >
              <span className="sr-only">Email</span>
              <FaEnvelope className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="tel:+919887272445"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
            >
              <span className="sr-only">Phone</span>
              <FaPhone className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/search/L-2%2F24,+Jayshree+Colony+NE,+Dholkot+Bohra+Ganeshji,+Udaipur,+Rajasthan+313001+India/@24.5907555,73.7246476,19.6z"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
            >
              <span className="sr-only">Google Map</span>
              <FaMapMarkerAlt className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/pyspheretech/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://pysphere.medium.com/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
            >
              <span className="sr-only">Medium</span>
              <FaMedium className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 right-0">
        <ThemeToggle />
      </div>
    </footer>
  );
}

export default Footer;
