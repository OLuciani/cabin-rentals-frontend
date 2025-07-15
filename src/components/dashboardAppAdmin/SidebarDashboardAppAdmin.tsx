"use client";

import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "../../store/useUIStore";

interface SidebarDashboardAppAdminProps {
  setSection: (section: string) => void;
  section: string;
  setReduceHeight: (reduceHeight: boolean) => void; //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
}

const SidebarDashboardAppAdmin: React.FC<SidebarDashboardAppAdminProps> = ({
  setSection,
  section,
  setReduceHeight,
}) => {
  const { user } = useAuthStore();
  const { isGeneralSidebarOpen } = useUIStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="">
      <div
        className={`${
          isGeneralSidebarOpen ? "relative z-0" : "fixed z-30"
        } left-0 right-0 flex justify-between items-center pl-4 bg-white border-b-4 lg:static lg:border-b-0`}
      >
        <span className="lg:hidden text-xl font-semibold">{user?.name}</span>

        <button
          className="lg:hidden py-4 pr-4"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);

            window.scrollTo({ top: 0, behavior: "smooth" });

            if (isSidebarOpen) {
              setReduceHeight(true);
            } else {
              setReduceHeight(false);
            }
          }}
          aria-label="Abrir menú"
          title="Abrir menú"
        >
          {isSidebarOpen ? (
            <AiOutlineClose size={25} aria-hidden="true" />
          ) : (
            <AiOutlineMenu size={25} aria-hidden="true" />
          )}
        </button>
      </div>
      <div
        className={`bg-secondary text-[#2C2C2C] font-bold w-full lg:w-96
        ${
          isSidebarOpen
            ? "fixed top-28 md:top-32  left-0 z-[60] h-auto"
            : "hidden lg:block"
        } 
        lg:static lg:min-h-screen flex flex-col overflow-y-auto`}
      >
        <h1 className="text-2xl font-bold text-[#2C2C2C] text-center px-2 pt-4">
          {user?.name}
        </h1>

        <nav className="flex-grow p-4">
          <h2 className="text-lg text-center font-bold mt-6 mb-4">
            ADMINISTRACION DE LA APP:
          </h2>
          <div className="button-group flex flex-col gap-2">
            {" "}
            <button
              onClick={() => {
                setSection("createCabin");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
              }}
              className={`block w-full text-left text p-2 rounded transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white ${
                section === "createCabin"
                  ? "border-[2px] border-[#2C2C2C] hover:border-primary"
                  : "text-[#2C2C2C]"
              }`}
            >
              Crear una cabaña
            </button>
            <button
              onClick={() => {
                setSection("cabinManagement");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white ${
                section === "cabinManagement"
                  ? "border-[2px] border-[#2C2C2C] hover:border-primary"
                  : "text-[#2C2C2C]"
              }`}
            >
              Gestión de cabañas
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboardAppAdmin;
