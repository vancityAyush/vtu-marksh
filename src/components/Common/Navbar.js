import Link from "next/link";
import { useRouter } from "next/router";
import PySphere from "@/components/Common/PySphere";
import Logo from "@/components/Common/Logo";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Work",
    path: "/work",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];
const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="fixed z-10 w-full items-center justify-center font-mono text-sm md:flex md:my-4">
      <a
        className="fixed left-6 pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 invisible lg:visible"
        href="https://www.pysphere.in"
      >
        <Logo width={35} height={35} />
        &nbsp;
        <PySphere />
      </a>
      <div className="fixed left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto md:rounded-full md:border md:bg-gray-200 md:py-2 md:dark:bg-zinc-800/30 flex items-center space-x-1 px-4 text-white">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={
              currentRoute === route.path
                ? "bg-gray-400 px-5 py-2 rounded-full  dark:bg-opacity-60 bg-opacity-60 text-black dark:text-white"
                : "rounded-full px-5 py-2 transition duration-300 ease-in-out hover:bg-gray-400 hover:rounded-full  hover:dark:bg-opacity-60 hover:bg-opacity-60 text-black dark:text-white"
            }
          >
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
