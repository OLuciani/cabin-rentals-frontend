"use client";

import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
//import { useAuthStore } from "@/store/useAuthStore";
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
  //const { user } = useAuthStore();
  const { isGeneralSidebarOpen } = useUIStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="">
      <div
        className={`${
          isGeneralSidebarOpen ? "relative z-0" : "fixed z-30"
        } left-0 right-0  border-t-secondary border-t-4 flex justify-between items-center pl-4 bg-secondary dark:bg-darkSecondary text-textPrimary lg:static lg:border-b-0`}
      >
        <span className="text-lg font-semibold lg:m-auto lg:pt-4">PANEL ADMINISTRACION</span>
        
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
            <AiOutlineClose size={20} aria-hidden="true" />
          ) : (
            <AiOutlineMenu size={20} aria-hidden="true" />
          )}
        </button>
      </div>
      <div
        className={`bg-secondary dark:bg-darkSecondary text-[#2C2C2C] font-bold w-full lg:w-96
        ${
          isSidebarOpen
            ? "fixed top-28 md:top-32  left-0 z-[60] h-auto"
            : "hidden lg:block"
        } 
        ${isGeneralSidebarOpen ? "hidden" : "block"}
        lg:static lg:min-h-screen flex flex-col overflow-y-auto`}
      >
        {/* <h1 className="hidden lg:block text-2xl font-bold text-[#2C2C2C] text-center px-2 pt-4">
          {user?.name}
        </h1> */}

        <nav className="flex-grow p-4">
          {/* <h2 className="text-lg text-center font-bold mb-4">
            PANEL ADMINISTRACION
          </h2> */}
          <div className="button-group flex flex-col gap-2">
            {" "}
            {/* Para que al seleccionar una sección desde un botón esta siempre se muestre desde el inicio lo
             configuro en cada componente de sección en un useEffect(tomar el componente de esta sección como
             ejemplo para ver como  lo hace:src/app/features/cabins/components/createCabin.tsx). 
            */}
            <button
              onClick={() => {
                setSection("cabinManagement");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 hover:bg-primary hover:text-white dark:hover:bg-darkPrimary ${
                section === "cabinManagement" || section === "cabinDetail" || section === "cabinCalendar" || section === "editCabin" || section === "createAdminBooking"
                  ? "border-[2px] border-primary dark:border-darkPrimary"
                  : "text-[#2C2C2C]"
              }`}
            >
              Gestión de cabañas
            </button>
            
            <button
              onClick={() => {
                setSection("createCabin");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 hover:bg-primary hover:text-white dark:hover:bg-darkPrimary ${
                section === "createCabin"
                  ? "border-[2px] border-primary dark:border-darkPrimary"
                  : "text-[#2C2C2C]"
              }`}
            >
              Crear una cabaña
            </button>
            
            <button
              onClick={() => {
                setSection("allBookings");
                setIsSidebarOpen(false);
                setReduceHeight(true);
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 hover:bg-primary hover:text-white dark:hover:bg-darkPrimary ${
                section === "allBookings" || section === "bookingDetail" || section === "editBooking"
                  ? "border-[2px] border-primary dark:border-darkPrimary"
                  : "text-[#2C2C2C]"
              }`}
            >
              Ver reservas
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboardAppAdmin;
