// Componente `CabinHeader`
//
// Muestra la imagen principal, el nombre, la ubicación y la descripción de una cabaña.
// Incluye un botón para reservar la cabaña y permite abrir un modal para visualizar la imagen en grande.
// Este componente es parte del feature `cabins/cabinDetail` y se usa en la página de detalle de cabaña.

import React from "react";
import Image from "next/image";
import { CabinDetailProps } from "../types/cabinDetailTypes";
import { Button } from "@mui/material";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

const CabinHeader: React.FC<CabinDetailProps> = ({
  cabin,
  openModal,
  handleReserveClick,
  onEditClick,
}) => {
  const { user } = useAuthStore();

  const pathname = usePathname();
  const isInDashboard = pathname.startsWith("/dashboardAppAdmin");

  return (
    <div className="space-y-6">
      {cabin && (
        <>
          <div className="flex justify-center">
            <div className="w-full sm:w-[70%] overflow-hidden rounded-lg cursor-pointer group">
              <Image
                src={cabin.mainImage}
                alt={cabin.name}
                width={1000}
                height={667}
                priority
                className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105 object-cover"
                onClick={() => openModal && openModal(0)} // Abre el modal con la imagen principal
              />
            </div>
          </div>

          {/*  <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-evenly ">
            
            <div className="">
              <Button
                variant="contained"
                color="primary"
                onClick={handleReserveClick}
                className="w-64 mt-4"
              >
                Reservar esta cabaña
              </Button>
            </div>
            
          </div> */}

          <div className="w-full flex flex-col justify-center items-center gap-4 md:flex-row md:flex-wrap md:justify-evenly">
            {/* <div className="">
              <Button
                variant="contained"
                color="primary"
                onClick={handleReserveClick}
                className="w-64 mt-4"
              >
                Reservar esta cabaña
              </Button>
            </div>  */}

            {!isInDashboard && (
              <div className="">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReserveClick}
                  className="w-64 mt-4"
                >
                  Reservar esta cabaña
                </Button>
              </div>
            )}

            {user?.role === "admin" && (
              <div className="">
                <Button
                  variant="contained"
                  color="success"
                  onClick={onEditClick}
                  className="w-64 mt-4"
                >
                  Editar esta cabaña
                </Button>
              </div>
            )}

            {user?.role === "admin" && (
              <div className="">
                <Button
                  variant="contained"
                  color="warning"
                  //onClick={}
                  className="w-64 mt-4"
                >
                  Eliminar esta cabaña
                </Button>
              </div>
            )}
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {cabin.name}
            </h1>
            <p className="text-gray-500 font-semibold text-base dark:text-gray-400">
              {cabin.location}
            </p>
          </div>
          <p className="text-center text-gray-700 leading-relaxed dark:text-gray-300">
            {cabin.description}
          </p>
        </>
      )}
    </div>
  );
};

export default CabinHeader;
