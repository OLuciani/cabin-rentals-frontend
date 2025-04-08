"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from "react-icons/fa"; 

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return (
    <header className="fixed w-full h-16 top-0 bg-primary dark:bg-darkPrimary shadow-md p-4 text-white dark:text-darkText z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Título con tamaño adaptable */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white dark:text-darkText">
          Cabañas Natura
        </h1>

        {/* Menú de navegación */}
        <nav className="hidden sm:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-sm sm:text-base md:text-lg hover:text-secondary dark:hover:text-darkSecondary">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/cabanas" className="text-sm sm:text-base md:text-lg hover:text-secondary dark:hover:text-darkSecondary">
                Cabañas
              </Link>
            </li>
            <li>
              <a href="contacto" className="text-sm sm:text-base md:text-lg hover:text-secondary dark:hover:text-darkSecondary">
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        {/* Botón para cambiar entre modo claro y oscuro */}
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-transparent dark:bg-transparent rounded-full text-textPrimary dark:text-darkText hover:text-secondary dark:hover:text-darkSecondary transition duration-200 ease-in-out">
          {darkMode ? (
            <FaSun className="text-yellow-500 text-xl hover:text-yellow-400 transform hover:scale-110 transition duration-200 ease-in-out" />
          ) : (
            <FaMoon className="text-blue-500 text-xl hover:text-blue-400 transform hover:scale-110 transition duration-200 ease-in-out" />
          )}
        </button>
      </div>
    </header>
  );
}


  