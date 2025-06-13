"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useAuthStore } from "@/store/useAuthStore";
import SideBar from "./SideBar";

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const { isLoggedIn, user, logout, isLoadingUser } = useAuthStore();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Hubo un error al cerrar sesión", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        setDarkMode(true);
      }
    }
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/cabins", label: "Cabañas" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <div>
      {/* <header className="fixed w-full h-16 md:h-20 top-0 bg-primary dark:bg-darkPrimary shadow-md p-4 text-white dark:text-darkText font-semibold z-10 flex">
        <div className="container mx-auto flex items-center justify-between relative"> */}
      <header className="fixed w-full top-0 bg-primary dark:bg-darkPrimary shadow-md text-white dark:text-darkText z-10">
        <div className="h-16 md:h-20 px-4 container mx-auto flex items-center justify-between">

          <h1 className="text-xl md:text-2xl font-bold leading-none text-white dark:text-darkText">
            Cabañas Natura
          </h1>

          <nav className="hidden md:block">
            <ul className="flex space-x-4 lg:space-x-8 xl:space-x-12 2xl:space-x-16">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                const baseClasses =
                  "relative text-sm sm:text-base md:text-lg lg:text-xl transition duration-200 hover:text-secondary dark:hover:text-darkSecondary";

                const activeText = isActive
                  ? "text-secondary dark:text-darkSecondary"
                  : "";

                const activeAfter = isActive
                  ? "after:absolute after:left-0 after:right-0 after:bottom-[-6px] after:mx-auto after:w-6 after:h-[2px] after:bg-secondary dark:after:bg-darkSecondary after:rounded-md"
                  : "";

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${baseClasses} ${activeText} ${activeAfter}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              {isLoadingUser ? null : !isLoggedIn && !user ? (
                <li className="relative">
                  <FiUser
                    className="cursor-pointer text-lg"
                    size={22}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  />
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 bg-white dark:bg-darkPrimary text-black dark:text-white shadow-md rounded w-40 z-50">
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkSecondary"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkSecondary"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Crear cuenta
                      </Link>
                    </div>
                  )}
                </li>
              ) : (
                isLoggedIn &&
                user && (
                  <li className="flex items-center gap-2 bg-secondary dark:bg-darkSecondary text-gray-800 dark:text-gray-900 px-2 py-1 rounded max-w-[200px] overflow-hidden">
  <FiUser size={20} />
  <p className="hidden md:block text-sm truncate">{user.name}</p>
  <button
    onClick={handleLogout}
    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
  >
    Cerrar sesión
  </button>
</li>

                )
              )}
            </ul>
          </nav>

          <button
            onClick={toggleDarkMode}
            className="p-2 bg-transparent rounded-full text-textPrimary dark:text-darkText hover:text-secondary dark:hover:text-darkSecondary transition duration-200"
          >
            {darkMode ? (
              <FaSun className="text-yellow-500 text-xl hover:text-yellow-400 transform hover:scale-110" />
            ) : (
              <FaMoon className="text-blue-500 text-xl hover:text-blue-400 transform hover:scale-110" />
            )}
          </button>

          {/* Botón hamburguesa solo en móvil */}
          <button
            onClick={() => setShowSideBar(true)}
            className="md:hidden text-white dark:text-darkText p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <SideBar
          isOpen={showSideBar}
          onClose={() => setShowSideBar(false)}
          navLinks={navLinks}
          isLoggedIn={isLoggedIn}
          user={user}
          handleLogout={handleLogout}
        />
      </header>
    </div>
  );
}
