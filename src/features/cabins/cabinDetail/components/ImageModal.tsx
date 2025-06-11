import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CabinDetailProps } from "../types/cabinDetailTypes";

const ImageModal: React.FC<CabinDetailProps> = ({
  isModalOpen,
  closeModal,
  prevImage,
  images,
  currentImageIndex,
  nextImage,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-y-[-30px] inset-x-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-2 sm:px-6">
          <div className="relative bg-white p-6 sm:p-14 lg:p-12 rounded-2xl w-full max-w-[95vw] xxs:max-w-[65vw] lg:max-w-[75vw] xl:max-w-[75vw] flex items-center justify-center overflow-hidden">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute text-sm xs:text-base sm:text-lg top-2 sm:top-4 right-2 sm:right-4 text-gray-800 font-bold hover:text-red-500 z-50"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Botón anterior */}
            <button
              onClick={prevImage}
              className="absolute left-[-1px] sm:left-1 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full sm:p-2 z-50"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Imagen */}
            {typeof currentImageIndex === "number" && images?.[currentImageIndex] && (
              <div className="relative w-full max-w-[95vw] xxs:max-w-[85vw] xl:max-w-[65vw] max-h-[70vh] xl:max-h-[80vh] aspect-video rounded-xl overflow-hidden">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Imagen ${currentImageIndex + 1}`}
                  fill
                  sizes="full"
                  className="object-cover"
                />
              </div>
            )}

            {/* Botón siguiente */}
            <button
              onClick={nextImage}
              className="absolute right-[-1px] sm:right-1 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full  sm:p-2 z-50"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;

