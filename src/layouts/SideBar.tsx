"use client";
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
}

