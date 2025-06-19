// Componente `CabinHeader`
//
// Muestra la imagen principal, el nombre, la ubicación y la descripción de una cabaña.
// Incluye un botón para reservar la cabaña y permite abrir un modal para visualizar la imagen en grande.
// Este componente es parte del feature `cabins/cabinDetail` y se usa en la página de detalle de cabaña.

import React from "react";
import Image from "next/image";
import { CabinDetailProps } from "../types/cabinDetailTypes";
import { Button } from "@mui/material";

const CabinHeader: React.FC<CabinDetailProps> = ({
  cabin,
  openModal,
  handleReserveClick,
}) => {
  return (
    <div className="space-y-6">
      {cabin && (
        <>
          {/* Imagen Principal */}
          <div className="flex justify-center">
            <div className="w-full sm:w-[70%] overflow-hidden rounded-lg cursor-pointer group">
              <Image
                src={cabin.mainImage}
                alt={cabin.name}
                width={800}
                height={500}
                priority
                className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105 object-cover"
                onClick={() => openModal && openModal(0)} // Abre el modal con la imagen principal
              />
            </div>
          </div>

          {/* Botón para iniciar la reserva de una cabaña */}
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleReserveClick}
              className="mt-4"
            >
              Reservar esta cabaña
            </Button>
          </div>

          {/* Detalles de la cabaña */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {cabin.name}
            </h1>
            <p className="text-gray-500 text-sm dark:text-gray-400">
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
