/* import React from 'react';
import { CabinDetailProps } from "../types/cabinDetailTypes";
import Image from "next/image";


const ImageGallery: React.FC<CabinDetailProps> = ({ cabin, openModal }) => {
  return (
    <div>
        
              {cabin && cabin.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Galería</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {cabin.images.map((url, i) => (
                      <Image
                        key={i}
                        src={url}
                        width={300}
                        height={200}
                        alt={`Imagen ${i + 1} de ${cabin.name}`}
                        className="rounded-md h-40 object-cover cursor-pointer"
                        onClick={() => openModal && openModal(i + 1)} // Abre el modal con la imagen complementaria seleccionada
                      />
                    ))}
                  </div>
                </div>
              )}
    </div>
  )
}

export default ImageGallery; */




// Con zoom en las imágenes
import React from 'react';
import { CabinDetailProps } from "../types/cabinDetailTypes";
import Image from "next/image";

const ImageGallery: React.FC<CabinDetailProps> = ({ cabin, openModal }) => {
  return (
    <div>
      {/* Galería de Imágenes */}
      {cabin && cabin.images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Galería</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cabin.images.map((url, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-md cursor-pointer group"
                onClick={() => openModal && openModal(i + 1)}
              >
                <Image
                  src={url}
                  width={300}
                  height={200}
                  alt={`Imagen ${i + 1} de ${cabin.name}`}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
