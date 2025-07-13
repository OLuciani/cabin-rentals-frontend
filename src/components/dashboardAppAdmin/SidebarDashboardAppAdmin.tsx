"use client";

import React, {  useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuthStore } from "@/store/useAuthStore";

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
  //const { userName, isLoggedIn } = useContext(Context);
  //const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="">
      <div
        className={`w-full flex justify-between items-center pl-4 fixed bg-white top-[57] border-b-2 lg:border-b-0 z-10`}
      >
        <span className="lg:hidden text-2xl font-semibold">
          {user?.name}
        </span>
        
        <button
          className="lg:hidden py-4 pr-4"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            const mainElement = document.querySelector("main");
            if (mainElement) {
              mainElement.scrollTo(0, 0);
            }
            if(isSidebarOpen) {
              setReduceHeight(true)
            } else {
              setReduceHeight(false)
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
      className={`bg-secondary text-[#2C2C2C] font-bold w-full min-h-full lg:w-96 lg:h-screen 
      ${isSidebarOpen ? "block" : "hidden lg:block"} h-auto lg:sticky mb-3 lg:mb-0 lg:top-0 
      flex flex-col overflow-y-auto`}
    >
        <h1 className="text-2xl font-bold text-[#2C2C2C] text-center px-2 pt-4">
          {user?.name}
        </h1>

        <nav className="flex-grow p-4">
          <h2 className="text-lg text-center font-bold mt-6 mb-4">ADMINISTRACION DE LA APP:</h2>
          <div className="button-group flex flex-col gap-2">
            {" "}
            
            <button
              onClick={() => {
                setSection("createCabin");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Aquí debakp establezco el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left text p-2 rounded transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white ${section === "createCabin" ? "border-[2px] border-[#2C2C2C] hover:border-primary" : "text-[#2C2C2C]"}`}
            >
              Crear una cabaña
            </button>
            
             <button
              onClick={() => {
                setSection("cabinManagement");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white ${section === "cabinManagement" ? "border-[2px] border-[#2C2C2C] hover:border-primary" : "text-[#2C2C2C]"}`}
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