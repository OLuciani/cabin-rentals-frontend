/* "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import type { User } from "../types/User"; 
import { useUIStore } from "../store/useUIStore";


interface NavLink {
  href: string;
  label: string;
}

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  isLoggedIn: boolean;
  user: User | null;
  handleLogout: () => Promise<void>;
}

export default function SideBar({
  isOpen,
  onClose,
  navLinks,
  isLoggedIn,
  user,
  handleLogout,
}: SideBarProps) {
  const pathname = usePathname();

  const { openGeneralSidebar, closeGeneralSidebar } = useUIStore();


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      openGeneralSidebar(); // ← Marca como abierto en Zustand
    } else {
      document.body.style.overflow = "";
      closeGeneralSidebar(); // ← Marca como cerrado en Zustand
    }
  }, [isOpen, openGeneralSidebar, closeGeneralSidebar]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" onClick={onClose}>
      <div
        className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-primary dark:bg-darkPrimary text-white dark:text-darkText p-6 shadow-lg z-[9999]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end">
            <button
            onClick={onClose}
            className="mb-6 text-white dark:text-darkText text-xl font-semibold"
            >
            ✕
            </button>
        </div>

        <nav>
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-lg transition duration-200 ${
                    pathname === link.href
                      ? "text-secondary dark:text-darkSecondary font-semibold"
                      : "hover:text-secondary dark:hover:text-darkSecondary"
                  }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {!isLoggedIn && !user && (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className="block text-lg hover:text-secondary dark:hover:text-darkSecondary"
                    onClick={onClose}
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="block text-lg hover:text-secondary dark:hover:text-darkSecondary"
                    onClick={onClose}
                  >
                    Crear cuenta
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && user && (
              <li className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 items-start bg-secondary dark:bg-darkSecondary text-gray-800 dark:text-gray-900 px-3 py-1 rounded text-lg font-semibold">
                  <div className="flex flex-row items-center gap-2 ">
                    <FiUser size={20} />
                    <span className="">{user.name}</span>
                  </div>
                  <button
                    onClick={async () => {
                      await handleLogout();
                      onClose();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
} */




  "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { User } from "../types/User";
import { useUIStore } from "../store/useUIStore";

interface NavLink {
  href: string;
  label: string;
}

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  isLoggedIn: boolean;
  user: User | null;
  handleLogout: () => Promise<void>;
}

export default function SideBar({
  isOpen,
  onClose,
  navLinks,
  isLoggedIn,
  user,
  handleLogout,
}: SideBarProps) {
  const pathname = usePathname();
  const { openGeneralSidebar, closeGeneralSidebar } = useUIStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      openGeneralSidebar();
    } else {
      document.body.style.overflow = "";
      closeGeneralSidebar();
    }
  }, [isOpen, openGeneralSidebar, closeGeneralSidebar]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" onClick={onClose}>
      <div
        className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-primary dark:bg-darkPrimary text-white dark:text-darkText p-6 shadow-lg z-[9999] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cierre */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={onClose}
            className="text-white dark:text-darkText text-xl"
          >
            ✕
          </button>
        </div>

        {/* Usuario logueado */}
        {isLoggedIn && user && (
          <div className="mb-6 flex items-center gap-3 p-3 rounded-lg bg-white/10 dark:bg-white/10">
            <div className="w-10 h-10 rounded-full bg-secondary dark:bg-darkSecondary text-gray-900 dark:text-white flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-base">{user.name}</p>
              <button
                onClick={async () => {
                  await handleLogout();
                  onClose();
                }}
                className="text-sm mt-1 text-white hover:text-secondary dark:hover:text-darkSecondary transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {/* Navegación */}
        <nav>
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-base transition duration-200 ${
                    pathname === link.href
                      ? "text-secondary dark:text-darkSecondary font-semibold"
                      : "hover:text-secondary dark:hover:text-darkSecondary"
                  }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {!isLoggedIn && !user && (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className="block text-base hover:text-secondary dark:hover:text-darkSecondary"
                    onClick={onClose}
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="block text-base hover:text-secondary dark:hover:text-darkSecondary"
                    onClick={onClose}
                  >
                    Crear cuenta
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
