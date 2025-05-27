"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useAuthStore } from "@/store/useAuthStore";

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/cabins", label: "Cabañas" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="fixed w-full h-16 top-0 bg-primary dark:bg-darkPrimary shadow-md p-4 text-white dark:text-darkText z-10">
      <div className="container mx-auto flex items-center justify-between relative">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white dark:text-darkText">
          Cabañas Natura
        </h1>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm sm:text-base md:text-lg transition duration-200 
                  hover:text-secondary dark:hover:text-darkSecondary
                  ${
                    pathname === link.href
                      ? "text-secondary dark:text-darkSecondary"
                      : ""
                  }
                  ${
                    pathname === link.href
                      ? "after:absolute after:left-0 after:right-0 after:bottom-[-6px] after:mx-auto after:w-6 after:h-[2px] after:bg-secondary dark:after:bg-darkSecondary after:rounded-md"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

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
                <li className="flex gap-2 items-center text-secondary dark:text-darkSecondary">
                  <FiUser size={22} />
                  <p className="hidden md:block md:text-lg">{user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
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
      </div>
    </header>
  );
}
