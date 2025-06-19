// Componente `CabinInfo`
//
// Muestra información detallada de la cabaña: precio, capacidad, habitaciones, baños y servicios específicos
// como asador, cochera o pileta. También incluye una lista de comodidades adicionales si están disponibles.
// Este componente es parte del feature `cabins/cabinDetail` y se utiliza en la página de detalle de cabaña.

import React from "react";
import { CabinDetailProps } from "../types/cabinDetailTypes";

const CabinInfo: React.FC<CabinDetailProps> = ({ cabin }) => {
  return (
    <div>
      {cabin && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Precio por noche
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                ${cabin.pricePerNight.toLocaleString("es-AR")}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Capacidad
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                {cabin.maxGuests} huéspedes
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Habitaciones
              </p>
              <p className="text-gray-800 dark:text-gray-100">{cabin.rooms}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Baños
              </p>
              <p className="text-gray-800 dark:text-gray-100">{cabin.bathrooms}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Asador
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                {cabin.hasGrill ? "Sí" : "No"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Cochera
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                {cabin.hasGarage ? "Sí" : "No"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Pileta
              </p>
              <p className="text-gray-800 dark:text-gray-100">
                {cabin.hasSwimmingPool ? "Sí" : "No"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Comodidades
            </h3>
            {cabin.amenities.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {cabin.amenities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No se especificaron comodidades.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CabinInfo;
