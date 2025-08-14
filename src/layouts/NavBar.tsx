"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  const router = useRouter();

  const userMenuRef = useRef<HTMLLIElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
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

  // Cierra el menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/cabins", label: "Cabañas" },
    { href: "/contact", label: "Contacto" },
    ...(user?.role === "admin"
      ? [{ href: "/dashboardAppAdmin", label: "Admin" }]
      : []),
    ...(user?.role === "client"
      ? [{ href: "/reservations/current", label: "Mis reservas" }]
      : []),
  ];

  return (
    <div>
      <header className="fixed w-full top-0 bg-primary dark:bg-darkPrimary shadow-md text-white dark:text-darkText z-10">
        <div className="h-16 max-h-16 md:h-[74px] md:max-h-[74px] px-4 container mx-auto flex items-center justify-between">
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

              {isLoadingUser ? null : (
                <li className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="bg-secondary dark:bg-darkSecondary text-gray-800 dark:text-gray-200 font-bold rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition"
                  >
                    {user?.name?.charAt(0).toUpperCase() || <FiUser size={20} />}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 bg-white dark:bg-darkPrimary text-black dark:text-white shadow-md rounded w-40 z-50">
                      {isLoggedIn && user ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 font-medium">
                            {user.name}
                          </div>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkSecondary"
                          >
                            Cerrar sesión
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/auth/login"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkSecondary"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Iniciar sesión
                          </Link>
                          <Link
                            href="/auth/register"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkSecondary"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Crear cuenta
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </li>
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

