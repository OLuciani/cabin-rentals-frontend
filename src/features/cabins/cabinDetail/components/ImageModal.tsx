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
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4 sm:px-6">
          <div className="relative bg-white p-5 sm:p-6 md:p-8 lg:p-12 rounded-2xl w-full max-w-4xl max-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-800 font-bold hover:text-red-500 z-50"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Botón anterior */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 z-50"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Imagen */}
            {typeof currentImageIndex === "number" && images?.[currentImageIndex] && (
              <div className="relative w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] h-[60vh] sm:h-[70vh] md:h-[80vh] rounded-xl overflow-hidden">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Imagen ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Botón siguiente */}
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 z-50"
              aria-label="Siguiente"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;

