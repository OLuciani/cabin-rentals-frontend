// Galería de imágenes de una cabaña seleccionada.
//
// Este componente muestra una cuadrícula con las imágenes adicionales de una cabaña en particular.
// Al hacer clic en una imagen, se ejecuta la función `openModal` (recibida como prop)
// para abrir el visor modal con esa imagen ampliada.
// Si la cabaña no tiene imágenes secundarias, no se muestra nada.

import React from 'react';
import { CabinDetailProps } from "../types/cabinDetailTypes";
import Image from "next/image";

const ImageGallery: React.FC<CabinDetailProps> = ({ cabin, openModal }) => {
  if (!cabin) return null;

  console.log("Main image:", cabin.mainImage);
  console.log("Secondary images:", cabin.images);

  const allImages = [cabin.mainImage, ...(cabin.images || [])]; // <-- Incluye mainImage primero

  return (
    <div>
      {allImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Galería</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {allImages.map((url, i) => (
              <div
                key={i}
                className=""
                onClick={() => openModal && openModal(i)}
              >
                <Image
                  src={url}
                  alt={`Imagen ${i + 1} de ${cabin.name}`}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
