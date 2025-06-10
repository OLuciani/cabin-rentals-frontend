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
          {/* <div className="w-full flex flex-row flex-wrap justify-between gap-3 sm:gap-5"> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cabin.images.map((url, i) => (
              <div
                key={i}
                /* className="w-[130px] sm:w-[200px] overflow-hidden rounded-md cursor-pointer group" */
                className=""
                onClick={() => openModal && openModal(i + 1)}
              >
                <Image
                  src={url}
                  width={300}
                  height={200}
                  alt={`Imagen ${i + 1} de ${cabin.name}`}
                  className="w-auto h-auto object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg cursor-pointer"
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
