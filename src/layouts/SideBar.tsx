"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import type { User } from "../types/User"; 

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
      <div
        className="fixed top-0 right-0 h-full w-1/2 sm:w-64 bg-primary dark:bg-darkPrimary text-white dark:text-darkText p-6 shadow-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end">
            <button
            onClick={onClose}
            className="mb-6 text-white dark:text-darkText text-xl font-bold"
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
                    href="/login"
                    className="block text-lg hover:text-secondary dark:hover:text-darkSecondary"
                    onClick={onClose}
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
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
                <div className="flex items-center gap-2 text-secondary dark:text-darkSecondary">
                  <FiUser size={20} />
                  <span>{user.name}</span>
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
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

